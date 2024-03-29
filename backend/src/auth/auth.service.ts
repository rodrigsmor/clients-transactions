import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/utils/@types';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { CurrentUserDto } from './dto/current.user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: SignupDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const isTheEmailAlreadyInUse = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (isTheEmailAlreadyInUse)
      throw new BadRequestException('O e-mail já está em uso.');

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signin(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'Os dados providenciados não correspondem a nenhum usuário.',
      );

    const passwordMatched = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatched)
      throw new ForbiddenException('A senha providenciada não está correta');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt)
      throw new ForbiddenException(
        'the user you entered doesn’t seem to exist.',
      );

    try {
      await bcrypt.compare(rt, user.hashedRt);
    } catch (error) {
      throw new ForbiddenException('Token incorreto');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async getCurrentUser(jwt: JwtPayload): Promise<CurrentUserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: jwt.sub },
      });

      return new CurrentUserDto(user);
    } catch (error) {
      throw new BadRequestException('O usuário parece não existir!');
    }
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-scret',
          expiresIn: 60 * 80,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

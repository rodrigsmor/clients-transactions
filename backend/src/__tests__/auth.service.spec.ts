import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const hash = bcrypt.hashSync('senha123', 10);

  const mockUser: User = {
    id: 1,
    email: 'user@test.com',
    name: 'User test',
    hash,
    createdAt: new Date(),
    updatedAt: new Date(),
    hashedRt: '',
  };

  describe('signup', () => {
    beforeEach(() => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
    });

    it('should throw a BadRequest if email already in use', async () => {
      await expect(
        authService.signup({
          email: 'user@test.com',
          name: 'User test',
          password: 'test123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return the access and update tokens if the user has been successfully created', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      const newUser: User = {
        id: 1,
        email: dto.email,
        name: dto.name,
        hash: bcrypt.hashSync(dto.password, 10).toString(),
        updatedAt: new Date(),
        createdAt: new Date(),
        hashedRt: '',
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce(newUser);

      const tokens = await authService.signup(dto);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          name: dto.name,
          hash: expect.any(String),
        },
      });

      expect(tokens.access_token).toBeDefined();
      expect(tokens.refresh_token).toBeDefined();
    });
  });

  describe('signin', () => {
    beforeEach(() => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
    });

    it('should throw ForbiddenException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValueOnce(null);
      await expect(
        authService.signin({
          email: 'notexistent@test.com',
          password: 'senha123',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if password is incorrect', async () => {
      const wrongPassword = 'senha123';
      const hashedWrongPassword = await bcrypt.hash(wrongPassword, 10);

      mockPrismaService.user.findUnique.mockResolvedValueOnce({
        ...mockUser,
        hash: hashedWrongPassword,
      });

      await expect(
        authService.signin({
          email: 'user@test.com',
          password: 'senha1234',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return tokens if user exists and password is correct', async () => {
      const tokens = await authService.signin({
        email: 'user@test.com',
        password: 'senha123',
      });
      expect(tokens.access_token).toBeDefined();
      expect(tokens.refresh_token).toBeDefined();
    });
  });

  describe('logout', () => {
    it('should remove the refresh Token from user with given userId', async () => {
      const userId = 1;

      mockPrismaService.user.updateMany.mockResolvedValueOnce({ count: 2 });

      await authService.logout(userId);

      expect(mockPrismaService.user.updateMany).toHaveBeenCalledWith({
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
    });
  });

  describe('refreshTokens', () => {
    const userId = 1;
    const rt = 'old-refresht-token';

    it('should throw an error if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(authService.refreshTokens(userId, rt)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should throw an error if user has no refresh Token (hashedRt)', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce({ ...mockUser, id: userId, hashedRt: null });

      await expect(authService.refreshTokens(userId, rt)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should throw an error if the refresh token does not match the user hashedRt', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        id: userId,
        hashedRt: 'some-hashed-token',
        ...mockUser,
      });

      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce();

      await expect(authService.refreshTokens(userId, rt)).rejects.toThrowError(
        ForbiddenException,
      );
    });

    it('should generate new tokens and update the user hashedRt', async () => {
      const userId = 1;
      const rt = 'some-refresh-token';
      const email = 'test@test.com';
      const hashedRt = 'some-hashed-token';

      jest.mock('bcrypt', () => ({
        compare: jest.fn().mockResolvedValue(true),
      }));

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({
        ...mockUser,
        id: userId,
        email,
        hashedRt,
      });

      jest.spyOn(authService, 'getTokens').mockResolvedValueOnce({
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
      });
      jest.spyOn(authService, 'updateRtHash').mockResolvedValueOnce(null);

      const tokens = await authService.refreshTokens(userId, rt);

      expect(authService.getTokens).toHaveBeenCalledWith(userId, email);
      expect(authService.updateRtHash).toHaveBeenCalledWith(
        userId,
        'new-refresh-token',
      );
      expect(tokens.access_token).toBe('new-access-token');
      expect(tokens.refresh_token).toBe('new-refresh-token');
    });
  });
});

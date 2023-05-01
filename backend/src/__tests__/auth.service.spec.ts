import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

  describe('signin', () => {
    const hash = bcrypt.hashSync('senha123', 10);

    const mockUser = {
      id: 1,
      email: 'user@test.com',
      hash,
    };

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
});

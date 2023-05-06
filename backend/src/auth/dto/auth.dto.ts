import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    required: true,
    example: 'user@test.com',
    description: 'The e-mail of your user.',
  })
  @IsEmail(undefined, { message: 'o e-mail não é um e-mail válido' })
  @IsNotEmpty({ message: 'não foi providenciado nenhum e-mail' })
  @IsString({ message: 'o e-mail precisa ser uma string' })
  email: string;

  @ApiProperty({
    required: true,
    example: 'password123',
    description: 'The password of your account',
  })
  @IsNotEmpty({ message: 'a senha é obrigatória para realizar login' })
  @IsString({ message: 'a senha precisa ser uma string' })
  password: string;
}

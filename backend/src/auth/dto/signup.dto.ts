import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    required: true,
    example: 'user@test.com',
    description: 'The e-mail of your user.',
  })
  @IsNotEmpty({ message: 'e-mail não pode estar vazio' })
  @IsString({ message: 'o e-mail precisa ser uma string' })
  email: string;

  @ApiProperty({
    required: true,
    description: 'The password of your account',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'senha não pode estar vazio' })
  @IsString({ message: 'o e-email precisa ser uma string' })
  password: string;

  @ApiProperty({
    example: 'Admin User 1',
    required: true,
  })
  @IsNotEmpty({ message: 'o nome não pode estar vazio' })
  @IsString({ message: 'o nome precisa ser uma string' })
  name: string;
}

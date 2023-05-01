import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined, { message: 'o e-mail não é um e-mail válido' })
  @IsNotEmpty({ message: 'não foi providenciado nenhum e-mail' })
  @IsString({ message: 'o e-mail precisa ser uma string' })
  email: string;

  @IsNotEmpty({ message: 'a senha é obrigatória para realizar login' })
  @IsString({ message: 'a senha precisa ser uma string' })
  password: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined, { message: 'O e-mail não é um e-mail válido' })
  @IsNotEmpty({ message: 'Não foi providenciado nenhum e-mail' })
  @IsString({ message: 'O e-mail precisa ser uma string' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória para realizar login' })
  @IsString({ message: 'A senha precisa ser uma string' })
  password: string;
}

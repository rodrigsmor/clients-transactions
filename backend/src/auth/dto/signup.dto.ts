import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'e-mail não pode estar vazio' })
  @IsString({ message: 'o e-mail precisa ser uma string' })
  email: string;

  @IsNotEmpty({ message: 'senha não pode estar vazio' })
  @IsString({ message: 'o e-email precisa ser uma string' })
  password: string;

  @IsNotEmpty({ message: 'o nome não pode estar vazio' })
  @IsString({ message: 'o nome precisa ser uma string' })
  name: string;
}

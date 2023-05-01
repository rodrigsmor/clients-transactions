import { User } from '@prisma/client';

export class CurrentUserDto {
  name: string;
  email: string;
  profile_picture: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
  }
}

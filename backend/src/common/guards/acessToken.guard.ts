import { AuthGuard } from '@nestjs/passport';

export class AcessTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

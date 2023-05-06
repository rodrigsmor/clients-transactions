import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';
import { Tokens } from './types';
import { RefreshTokenGuard } from 'src/common/guards';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserDto } from './dto/current.user.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/utils/@types/authenticated.request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Creating your account and registering your data',
  })
  @ApiResponse({
    status: 201,
    type: Tokens,
    description:
      'It will return your tokens of access and recovery (refresh token)',
  })
  signup(@Body() dto: SignupDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    description: 'Log into your previously created account',
  })
  @ApiResponse({
    status: 202,
    type: Tokens,
    description:
      'It will return your tokens of access and recovery (refresh token)',
  })
  signin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'It will clear your access data and disable your current login credentials. To be able to access the application again, you will have to log in again.',
  })
  @ApiResponse({
    status: 200,
    description: '  Your current credentials have been deleted',
  })
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'It will regenerate you credentials to access the application, by authenticating with your refresh_token',
  })
  @ApiResponse({
    status: 200,
    type: Tokens,
    description:
      'It will return a response with your new access and refresh tokens',
  })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'It connects to your account and retrieves your account data, such as ID, name, email and profile picture',
  })
  @ApiResponse({
    status: 200,
    type: CurrentUserDto,
    description: 'It will returns your account data',
  })
  getCurrentUser(
    @Req() request: AuthenticatedRequest,
  ): Promise<CurrentUserDto> {
    return this.authService.getCurrentUser(request.user);
  }
}

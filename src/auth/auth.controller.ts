import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    console.log(authCredentialDto);
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/login')
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return await this.authService.validatorUserPassword(authCredentialDto);
  }
}

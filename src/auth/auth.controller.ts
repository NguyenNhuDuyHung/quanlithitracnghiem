import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { Public, Refresh } from './passport/decorator'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { RefreshTokenAuthGuard } from './passport/refresh-auth.guard'
import { GoogleOauthGuard } from './passport/google-oauth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('refresh')
  @Public()
  @Refresh()
  @UseGuards(RefreshTokenAuthGuard)
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user._id)
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = await this.authService.googleLogin(req.user)

    return res.json(tokens)

    // return res.redirect('http://localhost:3000')
  }
}

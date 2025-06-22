import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { Public, Refresh } from './passport/decorator'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { RefreshTokenAuthGuard } from './passport/refresh-auth.guard'

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
}

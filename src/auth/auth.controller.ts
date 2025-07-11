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
import { CheckAbilities, Public, Refresh } from './passport/decorator'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { RefreshTokenAuthGuard } from './passport/refresh-auth.guard'
import { GoogleOauthGuard } from './passport/google-oauth.guard'
import { UsersService } from '../users/services/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user
    )

    res.cookie('access_token', access_token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1h
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'strict',
    })

    res.cookie('refresh_token', refresh_token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      sameSite: 'strict',
    })

    return {
      access_token,
      refresh_token
    }
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

  @Get('me')
  @CheckAbilities({ action: 'read', subject: 'auth' })
  async me(@Request() req) {
    const { _id } = req.user
    return await this.usersService.findById(_id)
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/services/users.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private confService: ConfigService, private userService: UsersService) {
    super({
      clientID: confService.get('GOOGLE_CLIENT_ID'),
      clientSecret: confService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: confService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
     const { emails } = profile
    const user = await this.userService.validateUserOauth2(emails[0].value);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
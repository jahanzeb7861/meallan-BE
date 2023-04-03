import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigFactory, ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { UsersService } from "src/services/users.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private confService: ConfigService, private userService:UsersService) {
    super({
      clientID: confService.get('FB_CLIENT_ID'),
      clientSecret: confService.get('FB_CLIENT_SECRET'),
      callbackURL: confService.get('FB_CALLBACK_URL'),
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(accessToken: string,refreshToken: string, profile: Profile,done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    // const { name, emails } = profile;
    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    // };
    // const payload = {
    //   user,
    //   accessToken,
    // };

    // done(null, payload);
    const { emails } = profile
    const user = await this.userService.validateUserOauth2(emails[0].value);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
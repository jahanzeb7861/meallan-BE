import { ConfigService } from "@nestjs/config";
import { Profile } from "passport-facebook";
import { UsersService } from "src/services/users.service";
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private confService;
    private userService;
    constructor(confService: ConfigService, userService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};

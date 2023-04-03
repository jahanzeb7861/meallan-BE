import { UsersService } from 'src/services/users.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(email: string, password: string): Promise<any>;
}
export {};

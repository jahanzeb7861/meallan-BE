import { HttpStatus } from '@nestjs/common';
import { ChangePasswordDto } from 'src/dtos/passwords/change-password.dto';
import { ForgotPasswordDto } from 'src/dtos/passwords/forgot-password.dto';
import { createUserDto } from 'src/dtos/users/CreateUser.dto';
import { LoginUserDto } from 'src/dtos/users/Login-user.dto';
import { UpdateUserDto } from 'src/dtos/users/UpdateUser.dto';
import { UsersService } from 'src/services/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(createUserDto: createUserDto, profil: string): Promise<import("../entities/User.entity").User>;
    createCashier(createUserDto: createUserDto, restaurant: string): Promise<import("../entities/User.entity").User>;
    login(loginUserDto: LoginUserDto): Promise<string>;
    googleAuth(): Promise<HttpStatus>;
    googleAuthRedirect(req: any): Promise<string>;
    facebookAuth(): Promise<any>;
    facebookAuthRedirect(req: Request): Promise<any>;
    forgotPAssword(forgotPassword: ForgotPasswordDto): Promise<void>;
    changePassword(req: Request, changePasswordDto: ChangePasswordDto): Promise<boolean>;
    getUsers(): Promise<import("../entities/User.entity").User[]>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUserById(id: number): Promise<import("typeorm").DeleteResult>;
}

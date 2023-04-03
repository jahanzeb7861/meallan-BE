import { Controller,Get,Post,Body,Put,Param,Delete,ParseIntPipe, UseGuards, Request, Req, HttpStatus, Patch} from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { ClientRoleGuard } from 'src/auth/guards/client-role.guard';
import { FacebookAuthGuard } from 'src/auth/guards/facebook-auth.guard';
import { GoogleAuthGuard } from 'src/auth/guards/google-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { SuperAdminRoleGuard } from 'src/auth/guards/super-admin-role.guard';
import { ChangePasswordDto } from 'src/dtos/passwords/change-password.dto';
import { ForgotPasswordDto } from 'src/dtos/passwords/forgot-password.dto';
import { createUserDto } from 'src/dtos/users/CreateUser.dto';
import { LoginUserDto } from 'src/dtos/users/Login-user.dto';
import { UpdateUserDto } from 'src/dtos/users/UpdateUser.dto';
import { UsersService } from 'src/services/users.service';

@Controller()
export class UsersController {

    constructor(private userService: UsersService){}

    @Post('users/signup/:profile')
    async createUser(@Body() createUserDto: createUserDto, @Param('profile') profil:string){
        return this.userService.createUser(createUserDto,profil)
    }  

    @Post('users/createCashier/:restaurant')
    async createCashier(@Body() createUserDto: createUserDto, @Param('restaurant') restaurant:string){
        return this.userService.createCashier(createUserDto,restaurant)
    }  

    @UseGuards(LocalAuthGuard)
    @Post('users/signin')
    async login(@Body() loginUserDto: LoginUserDto){
         return this.userService.login(loginUserDto);
    }  

    @Get('google/signin')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {return HttpStatus.OK;}
  
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req) {
      return this.userService.loginOauth2(req)
    }

    @Get("/facebook/signin")
    @UseGuards(FacebookAuthGuard)
    async facebookAuth(): Promise<any> {
      return HttpStatus.OK;
    }

    
    @Get("/facebook/redirect")
    @UseGuards(FacebookAuthGuard)
    async facebookAuthRedirect(@Req() req: Request): Promise<any> {
        return this.userService.loginOauth2(req)
    }

    @Post('/users/forgotPassword')
    async forgotPAssword(@Body() forgotPassword:ForgotPasswordDto){
        this.userService.forgotPassword(forgotPassword)
    }  

    @Patch('/users/changePassword')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() req: Request,@Body() changePasswordDto: ChangePasswordDto){
        const token = req.headers['authorization']?.split(' ')[1] ;
        return this.userService.changePassword(token, changePasswordDto);
    }

    @Get('users')
    //@UseGuards(JwtAuthGuard,SuperAdminRoleGuard)
    getUsers(){
        return this.userService.findUsers();
    }

    @Put('users/:id')
   // @UseGuards(JwtAuthGuard,SuperAdminRoleGuard)
    updateUserById(@Param('id', ParseIntPipe ) id : number, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateUser(id,updateUserDto);
    }

    @Delete('users/:id')
    // @UseGuards(JwtAuthGuard,SuperAdminRoleGuard)
    deleteUserById(@Param('id', ParseIntPipe) id : number){
    return this.userService.deleteUser(id);
    }

}

import {  BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';
import { createUserDto } from 'src/dtos/users/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/users/UpdateUser.dto';
import { Profile } from 'src/entities/Profile.entity';
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from 'src/dtos/users/Login-user.dto';
import { ForgotPasswordDto } from 'src/dtos/passwords/forgot-password.dto';
import { ChangePasswordDto } from 'src/dtos/passwords/change-password.dto';
import { ConfigService } from '@nestjs/config';
import { MailsService } from './mails.service';
import { Restaurant } from 'src/entities/Restaurant.entity';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {

    private readonly appUrl: string;

    constructor(@InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    @InjectRepository(Restaurant) private restaurantRepository:Repository<Restaurant>,
    private jwtService:JwtService,
    private configService : ConfigService,
    private mailService : MailsService
    ){
        this.appUrl = this.configService.get<string>('APP_URL');
    }

    findUsers(){
        return this.userRepository.find();
    }

    async createUser(createUserDto: createUserDto,profile : string){
        const emailExists : boolean = await this.mailExists(createUserDto.email);
        if(emailExists === false){
            const passwordHash : string = await this.hashPasword(createUserDto.password);
            const prfl = await this.profileRepository.findOneBy({label:profile});
            const newUser = this.userRepository.create(createUserDto);
            newUser.profile = prfl;
            newUser.password = passwordHash;
            return this.userRepository.save(newUser);
        }
        else {
            throw new HttpException('Email already taken',HttpStatus.CONFLICT);
        }
    }

    async createCashier(createUserDto: createUserDto, restaurantId: string){
        const emailExists : boolean = await this.mailExists(createUserDto.email);
        if(emailExists === false){
            const passwordHash : string = await this.hashPasword(createUserDto.password);
            const prfl = await this.profileRepository.findOneBy({label:'CASHIER'});
            const newUser = this.userRepository.create(createUserDto);
            newUser.profile = prfl;
            newUser.password = passwordHash;
            const restaurant= await this.restaurantRepository.findOneBy({id : +restaurantId})
            newUser.restaurant = restaurant;
            return this.userRepository.save(newUser);
        }
        else {
            throw new HttpException('Email already taken',HttpStatus.CONFLICT);
        }
    }

    updateUser(id:number ,updateUserDto: UpdateUserDto){
        return this.userRepository.update({id},updateUserDto);
    }

    deleteUser(id:number ){
        return this.userRepository.delete({id});
    }

    async login(user : LoginUserDto){
        const foundUser : createUserDto = await this.findByEmail(user.email);
        if(foundUser){
            const passwordMatch : boolean = await this.comparePasswords(user.password,foundUser.password);
            if(passwordMatch ===true){
               const payload = await this.findOne(foundUser.id);
               return  this.generateJwt(payload);
            }
            else{
                throw new HttpException('Login was not succesful',HttpStatus.UNAUTHORIZED);
            }
        }
        else{
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        }
    }

    private async mailExists(email :string): Promise<boolean>{
        const user = await this.userRepository.findOne({where:{email}});
        return !!user;
    }

    private async findOne(id:number): Promise<createUserDto>{
        return this.userRepository.findOne({where:{id},relations:['profile']});
      
    }

     async findByEmail(email :string){
        return this.userRepository.findOne({
            where:{email},
            select:['id','email','password','profile']
        });
    }


    async hashPasword(password: string): Promise<string>{
        return bcrypt.hash(password,12);
    }

    async comparePasswords(password: string,storedPassword : string): Promise<boolean>{
        return bcrypt.compare(password,storedPassword);
    }

    async generateJwt(user: any): Promise<string>{
         return this.jwtService.sign({
             email : user.email,
             sub : user.id,
             profile: user.profile?.label
         });
     }

     async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async validateUserOauth2(email: string): Promise<any> {
        const user = await this.findByEmail(email);
        if (user) {
          return user;
        }
         const prfl = await this.profileRepository.findOneBy({label:'CLIENT'});
         const newUser = this.userRepository.create({email:email});
         newUser.profile = prfl;
         return this.userRepository.save(newUser);
      }

      async loginOauth2(req) {
        const foundUser : createUserDto = await this.findByEmail(req.user?.email);
        if(foundUser){           
               const payload = await this.findOne(foundUser.id);
               return  this.generateJwt(payload);
        }
        else{
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        }
      }

      async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const foundUser : createUserDto = await this.findByEmail(forgotPasswordDto.email);
        if(foundUser){         
            const payload = await this.findOne(foundUser.id);
            const token=  await this.generateJwt(payload);  
            const forgotLink = `${this.appUrl}/auth/forgotPassword?token=${token}`;
            await this.mailService.send({
                from: this.configService.get('SENDGRID_FROM'),
                to: foundUser.email,
                subject: 'Forgot Password',
                data : forgotLink
                
            });
        }
        else{
            throw new BadRequestException('Invalid Email');
        }
      }

      async changePassword(token: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const decodedToken= this.jwtService.decode(token);
        const password : string = await this.hashPasword(changePasswordDto.password);
        await this.userRepository.update(decodedToken.sub, {password});
        return true;
    }
}

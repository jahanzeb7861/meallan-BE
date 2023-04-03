import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users.controller';
import { Profile } from 'src/entities/Profile.entity';
import { User } from 'src/entities/User.entity';
import { UsersService } from 'src/services/users.service';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { FacebookStrategy } from 'src/auth/strategies/facebook.strategy';
import { MailsService } from 'src/services/mails.service';
import { Restaurant } from 'src/entities/Restaurant.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User,Profile,Restaurant]),
    PassportModule,
    JwtModule.registerAsync({
        imports: [ConfigModule] , 
        inject: [ConfigService], 
        useFactory: async(configService:ConfigService) => ({
            secret:configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn : '1h'
            }
        })
    })
],
    controllers: [UsersController],
    providers: [UsersService,LocalStrategy,JwtStrategy,GoogleStrategy,FacebookStrategy,MailsService]
})
export class UsersModule {}

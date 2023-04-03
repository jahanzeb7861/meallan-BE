import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UsersModule } from './modules/users.module';
import { RestaurantsModule } from './modules/restaurants.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailsModule } from './modules/mails.module';
import { FavoritesModule } from './modules/favorites.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
     UsersModule,
     RestaurantsModule, 
     TypeOrmModule.forRootAsync(typeOrmConfigAsync),
     MulterModule.register({dest:'./uploads'}),
     MailsModule,
     FavoritesModule,
     MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
       transport:{
        host: configService.get('SENDGRID_HOST'), 
        auth: {
          user: configService.get('SENDGRID_USERNAME'),
          pass: configService.get('SENDGRID_API_KEY')
        }
      },
      template:{
        dir: join(__dirname,'templates'),
        adapter: new HandlebarsAdapter()
      }
      }),
      inject: [ConfigService],
     })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

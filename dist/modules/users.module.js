"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_controller_1 = require("../controllers/users.controller");
const Profile_entity_1 = require("../entities/Profile.entity");
const User_entity_1 = require("../entities/User.entity");
const users_service_1 = require("../services/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("../auth/strategies/local.strategy");
const jwt_strategy_1 = require("../auth/strategies/jwt.strategy");
const google_strategy_1 = require("../auth/strategies/google.strategy");
const facebook_strategy_1 = require("../auth/strategies/facebook.strategy");
const mails_service_1 = require("../services/mails.service");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_entity_1.User, Profile_entity_1.Profile, Restaurant_entity_1.Restaurant]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '1h'
                    }
                })
            })
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, facebook_strategy_1.FacebookStrategy, mails_service_1.MailsService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map
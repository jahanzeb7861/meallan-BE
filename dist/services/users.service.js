"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../entities/User.entity");
const Profile_entity_1 = require("../entities/Profile.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mails_service_1 = require("./mails.service");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
const bcrypt = require('bcrypt');
let UsersService = class UsersService {
    constructor(userRepository, profileRepository, restaurantRepository, jwtService, configService, mailService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.restaurantRepository = restaurantRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.appUrl = this.configService.get('APP_URL');
    }
    findUsers() {
        return this.userRepository.find();
    }
    async createUser(createUserDto, profile) {
        const emailExists = await this.mailExists(createUserDto.email);
        if (emailExists === false) {
            const passwordHash = await this.hashPasword(createUserDto.password);
            const prfl = await this.profileRepository.findOneBy({ label: profile });
            const newUser = this.userRepository.create(createUserDto);
            newUser.profile = prfl;
            newUser.password = passwordHash;
            return this.userRepository.save(newUser);
        }
        else {
            throw new common_1.HttpException('Email already taken', common_1.HttpStatus.CONFLICT);
        }
    }
    async createCashier(createUserDto, restaurantId) {
        const emailExists = await this.mailExists(createUserDto.email);
        if (emailExists === false) {
            const passwordHash = await this.hashPasword(createUserDto.password);
            const prfl = await this.profileRepository.findOneBy({ label: 'CASHIER' });
            const newUser = this.userRepository.create(createUserDto);
            newUser.profile = prfl;
            newUser.password = passwordHash;
            const restaurant = await this.restaurantRepository.findOneBy({ id: +restaurantId });
            newUser.restaurant = restaurant;
            return this.userRepository.save(newUser);
        }
        else {
            throw new common_1.HttpException('Email already taken', common_1.HttpStatus.CONFLICT);
        }
    }
    updateUser(id, updateUserDto) {
        return this.userRepository.update({ id }, updateUserDto);
    }
    deleteUser(id) {
        return this.userRepository.delete({ id });
    }
    async login(user) {
        const foundUser = await this.findByEmail(user.email);
        if (foundUser) {
            const passwordMatch = await this.comparePasswords(user.password, foundUser.password);
            if (passwordMatch === true) {
                const payload = await this.findOne(foundUser.id);
                return this.generateJwt(payload);
            }
            else {
                throw new common_1.HttpException('Login was not succesful', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async mailExists(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user;
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'profile']
        });
    }
    async hashPasword(password) {
        return bcrypt.hash(password, 12);
    }
    async comparePasswords(password, storedPassword) {
        return bcrypt.compare(password, storedPassword);
    }
    async generateJwt(user) {
        var _a;
        return this.jwtService.sign({
            email: user.email,
            sub: user.id,
            profile: (_a = user.profile) === null || _a === void 0 ? void 0 : _a.label
        });
    }
    async validateUser(email, pass) {
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async validateUserOauth2(email) {
        const user = await this.findByEmail(email);
        if (user) {
            return user;
        }
        const prfl = await this.profileRepository.findOneBy({ label: 'CLIENT' });
        const newUser = this.userRepository.create({ email: email });
        newUser.profile = prfl;
        return this.userRepository.save(newUser);
    }
    async loginOauth2(req) {
        var _a;
        const foundUser = await this.findByEmail((_a = req.user) === null || _a === void 0 ? void 0 : _a.email);
        if (foundUser) {
            const payload = await this.findOne(foundUser.id);
            return this.generateJwt(payload);
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async forgotPassword(forgotPasswordDto) {
        const foundUser = await this.findByEmail(forgotPasswordDto.email);
        if (foundUser) {
            const payload = await this.findOne(foundUser.id);
            const token = await this.generateJwt(payload);
            const forgotLink = `${this.appUrl}/auth/forgotPassword?token=${token}`;
            await this.mailService.send({
                from: this.configService.get('SENDGRID_FROM'),
                to: foundUser.email,
                subject: 'Forgot Password',
                data: forgotLink
            });
        }
        else {
            throw new common_1.BadRequestException('Invalid Email');
        }
    }
    async changePassword(token, changePasswordDto) {
        const decodedToken = this.jwtService.decode(token);
        const password = await this.hashPasword(changePasswordDto.password);
        await this.userRepository.update(decodedToken.sub, { password });
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Profile_entity_1.Profile)),
    __param(2, (0, typeorm_1.InjectRepository)(Restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        mails_service_1.MailsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
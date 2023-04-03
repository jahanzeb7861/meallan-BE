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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const facebook_auth_guard_1 = require("../auth/guards/facebook-auth.guard");
const google_auth_guard_1 = require("../auth/guards/google-auth.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const local_auth_guard_1 = require("../auth/guards/local-auth.guard");
const change_password_dto_1 = require("../dtos/passwords/change-password.dto");
const forgot_password_dto_1 = require("../dtos/passwords/forgot-password.dto");
const CreateUser_dto_1 = require("../dtos/users/CreateUser.dto");
const Login_user_dto_1 = require("../dtos/users/Login-user.dto");
const UpdateUser_dto_1 = require("../dtos/users/UpdateUser.dto");
const users_service_1 = require("../services/users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserDto, profil) {
        return this.userService.createUser(createUserDto, profil);
    }
    async createCashier(createUserDto, restaurant) {
        return this.userService.createCashier(createUserDto, restaurant);
    }
    async login(loginUserDto) {
        return this.userService.login(loginUserDto);
    }
    async googleAuth() { return common_1.HttpStatus.OK; }
    googleAuthRedirect(req) {
        return this.userService.loginOauth2(req);
    }
    async facebookAuth() {
        return common_1.HttpStatus.OK;
    }
    async facebookAuthRedirect(req) {
        return this.userService.loginOauth2(req);
    }
    async forgotPAssword(forgotPassword) {
        this.userService.forgotPassword(forgotPassword);
    }
    async changePassword(req, changePasswordDto) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        return this.userService.changePassword(token, changePasswordDto);
    }
    getUsers() {
        return this.userService.findUsers();
    }
    updateUserById(id, updateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }
    deleteUserById(id) {
        return this.userService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Post)('users/signup/:profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('profile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.createUserDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('users/createCashier/:restaurant'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('restaurant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.createUserDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCashier", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('users/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google/signin'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)("/facebook/signin"),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)("/facebook/redirect"),
    (0, common_1.UseGuards)(facebook_auth_guard_1.FacebookAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "facebookAuthRedirect", null);
__decorate([
    (0, common_1.Post)('/users/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forgotPAssword", null);
__decorate([
    (0, common_1.Patch)('/users/changePassword'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserById", null);
UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
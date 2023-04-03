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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Membership_entity_1 = require("./Membership.entity");
const Order_entity_1 = require("./Order.entity");
const Profile_entity_1 = require("./Profile.entity");
const Restaurant_entity_1 = require("./Restaurant.entity");
let User = class User {
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Profile_entity_1.Profile, (profile) => profile.users),
    __metadata("design:type", Profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Restaurant_entity_1.Restaurant, (restaurant) => restaurant.owner),
    __metadata("design:type", Array)
], User.prototype, "restaurants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Membership_entity_1.Membership, (membership) => membership.user),
    __metadata("design:type", Array)
], User.prototype, "memberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_entity_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "emailToLowerCase", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_entity_1.Restaurant, (restaurant) => restaurant.cashiers),
    __metadata("design:type", Restaurant_entity_1.Restaurant)
], User.prototype, "restaurant", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map
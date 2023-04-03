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
exports.Membership = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_entity_1 = require("./Restaurant.entity");
const User_entity_1 = require("./User.entity");
let Membership = class Membership {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Membership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Membership.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Membership.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.memberships),
    __metadata("design:type", User_entity_1.User)
], Membership.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_entity_1.Restaurant, (restaurant) => restaurant.memberships),
    __metadata("design:type", Restaurant_entity_1.Restaurant)
], Membership.prototype, "restaurant", void 0);
Membership = __decorate([
    (0, typeorm_1.Entity)({ name: 'memberships' })
], Membership);
exports.Membership = Membership;
//# sourceMappingURL=Membership.entity.js.map
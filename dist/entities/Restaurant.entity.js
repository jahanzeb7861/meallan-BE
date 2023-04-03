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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const Currency_entity_1 = require("./Currency.entity");
const Deal_entity_1 = require("./Deal.entity");
const Favorites_entity_1 = require("./Favorites.entity");
const Membership_entity_1 = require("./Membership.entity");
const Menu_entity_1 = require("./Menu.entity");
const Order_entity_1 = require("./Order.entity");
const User_entity_1 = require("./User.entity");
let Restaurant = class Restaurant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Restaurant.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Menu_entity_1.Menu),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Menu_entity_1.Menu)
], Restaurant.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.restaurants),
    __metadata("design:type", User_entity_1.User)
], Restaurant.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Membership_entity_1.Membership, (membership) => membership.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "memberships", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Currency_entity_1.Currency, (currency) => currency.restaurants),
    __metadata("design:type", Currency_entity_1.Currency)
], Restaurant.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_entity_1.Order, (order) => order.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Favorites_entity_1.Favorite, (favorite) => favorite.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Deal_entity_1.Deal, (deal) => deal.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "deals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_entity_1.User, (user) => user.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "cashiers", void 0);
Restaurant = __decorate([
    (0, typeorm_1.Entity)({ name: 'restaurants' })
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=Restaurant.entity.js.map
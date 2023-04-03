"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurants_controller_1 = require("../controllers/restaurants.controller");
const Deal_entity_1 = require("../entities/Deal.entity");
const Meal_entity_1 = require("../entities/Meal.entity");
const Membership_entity_1 = require("../entities/Membership.entity");
const MenuGroup_entity_1 = require("../entities/MenuGroup.entity");
const Order_entity_1 = require("../entities/Order.entity");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
const User_entity_1 = require("../entities/User.entity");
const restaurants_service_1 = require("../services/restaurants.service");
let RestaurantsModule = class RestaurantsModule {
};
RestaurantsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Restaurant_entity_1.Restaurant, User_entity_1.User, Membership_entity_1.Membership, Order_entity_1.Order, Meal_entity_1.Meal, Deal_entity_1.Deal, MenuGroup_entity_1.MenuGroup])],
        controllers: [restaurants_controller_1.RestaurantsController],
        providers: [restaurants_service_1.RestaurantsService]
    })
], RestaurantsModule);
exports.RestaurantsModule = RestaurantsModule;
//# sourceMappingURL=restaurants.module.js.map
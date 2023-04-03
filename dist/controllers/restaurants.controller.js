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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const Deal_dto_1 = require("../dtos/deals/Deal.dto");
const Group_dto_1 = require("../dtos/groups/Group.dto");
const Meal_dto_1 = require("../dtos/menus/Meal.dto");
const Order_dto_1 = require("../dtos/orders/Order.dto");
const CreateRestaurant_dto_1 = require("../dtos/restaurants/CreateRestaurant.dto");
const restaurants_service_1 = require("../services/restaurants.service");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    getRestaurants(latitude, longitude, query) {
        return this.restaurantService.findRestaurants(latitude, longitude, query === null || query === void 0 ? void 0 : query.distance);
    }
    getRestaurantsByCriteria(criteria) {
        return this.restaurantService.findRestaurantByCiteria(criteria);
    }
    createRestaurant(createRestaurantDto) {
        return this.restaurantService.createRestaurant(createRestaurantDto);
    }
    getRestaurantById(id, userId) {
        return this.restaurantService.findRestaurantById(id, userId);
    }
    getRestaurantByOwner(id) {
        return this.restaurantService.findRestaurantsByOwner(id);
    }
    updateRestaurant(id, createRestaurantDto) {
        return this.restaurantService.updateRestaurant(id, createRestaurantDto);
    }
    subscribeUser(userId, restaurantId) {
        return this.restaurantService.subscribeUser(userId, restaurantId);
    }
    getMealById(id) {
        return this.restaurantService.findMealById(id);
    }
    getDeals(restaurantId) {
        return this.restaurantService.findDeals(restaurantId);
    }
    addDeal(restaurantId, dealDto) {
        return this.restaurantService.addDeal(restaurantId, dealDto.label);
    }
    deleteDeal(restaurantId) {
        return this.restaurantService.deleteDeal(restaurantId);
    }
    updateDeal(id, dealDto) {
        return this.restaurantService.updateDeal(id, dealDto);
    }
    createOrder(orderDto) {
        return this.restaurantService.createOrder(orderDto);
    }
    getCashiersByOwner(ownerid, restaurantid) {
        return this.restaurantService.findCashiersByOwner(ownerid, restaurantid);
    }
    getRestaurantGroups(restaurantId) {
        return this.restaurantService.findRestaurantGroups(restaurantId);
    }
    addRestaurantGroup(restaurantId, groupDto) {
        return this.restaurantService.addRestaurantGroup(restaurantId, groupDto);
    }
    updateRestaurantGroup(groupId, groupDto) {
        return this.restaurantService.updateRestaurantGroup(groupId, groupDto);
    }
    deleteGroup(groupId) {
        return this.restaurantService.deleteGroup(groupId);
    }
    getRestaurantMeals(restaurantId) {
        return this.restaurantService.findRestaurantMeals(restaurantId);
    }
    addRestaurantMeal(groupId, mealDto) {
        return this.restaurantService.addRestaurantMeal(groupId, mealDto);
    }
    updateRestaurantMeal(mealId, mealDto) {
        return this.restaurantService.updateRestaurantMeal(mealId, mealDto);
    }
    deleteMeal(mealId) {
        return this.restaurantService.deleteMeal(mealId);
    }
    getRestaurantMenu(restaurantId) {
        return this.restaurantService.findRestaurantMeals(restaurantId);
    }
};
__decorate([
    (0, common_1.Get)('restaurants/:latitude/:longitude'),
    __param(0, (0, common_1.Param)('latitude')),
    __param(1, (0, common_1.Param)('longitude')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurants", null);
__decorate([
    (0, common_1.Get)('restaurants/:criteria'),
    __param(0, (0, common_1.Param)('criteria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantsByCriteria", null);
__decorate([
    (0, common_1.Post)('restaurants/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRestaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "createRestaurant", null);
__decorate([
    (0, common_1.Get)('restaurant/:id/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantById", null);
__decorate([
    (0, common_1.Get)('restaurantsByOwner/:ownerid'),
    __param(0, (0, common_1.Param)('ownerid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantByOwner", null);
__decorate([
    (0, common_1.Put)('restaurant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateRestaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateRestaurant", null);
__decorate([
    (0, common_1.Post)('restaurant/subscribe/:userId/:restaurantId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "subscribeUser", null);
__decorate([
    (0, common_1.Get)('meal/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getMealById", null);
__decorate([
    (0, common_1.Get)('deals/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getDeals", null);
__decorate([
    (0, common_1.Post)('deals/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Deal_dto_1.DealDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "addDeal", null);
__decorate([
    (0, common_1.Delete)('deals/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "deleteDeal", null);
__decorate([
    (0, common_1.Put)('deals/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Deal_dto_1.DealDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateDeal", null);
__decorate([
    (0, common_1.Post)('order/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order_dto_1.OrderDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('cashiersByOwner/:ownerid/:restaurantid'),
    __param(0, (0, common_1.Param)('ownerid')),
    __param(1, (0, common_1.Param)('restaurantid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getCashiersByOwner", null);
__decorate([
    (0, common_1.Get)('groups/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantGroups", null);
__decorate([
    (0, common_1.Post)('groups/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Group_dto_1.GroupDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "addRestaurantGroup", null);
__decorate([
    (0, common_1.Put)('groups/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Group_dto_1.GroupDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateRestaurantGroup", null);
__decorate([
    (0, common_1.Delete)('groups/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Get)('meals/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantMeals", null);
__decorate([
    (0, common_1.Post)('meals/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "addRestaurantMeal", null);
__decorate([
    (0, common_1.Put)('meals/:mealId'),
    __param(0, (0, common_1.Param)('mealId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Meal_dto_1.MealDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateRestaurantMeal", null);
__decorate([
    (0, common_1.Delete)('meeals/:mealId'),
    __param(0, (0, common_1.Param)('mealId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "deleteMeal", null);
__decorate([
    (0, common_1.Get)('menu/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getRestaurantMenu", null);
RestaurantsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map
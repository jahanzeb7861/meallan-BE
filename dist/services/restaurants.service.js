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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
const fs_1 = require("fs");
const path_1 = require("path");
const User_entity_1 = require("../entities/User.entity");
const Membership_entity_1 = require("../entities/Membership.entity");
const Membership_dto_1 = require("../dtos/memberships/Membership.dto");
const RestaurantData_dto_1 = require("../dtos/restaurants/RestaurantData.dto");
const Order_entity_1 = require("../entities/Order.entity");
const Meal_entity_1 = require("../entities/Meal.entity");
const Deal_entity_1 = require("../entities/Deal.entity");
const MenuGroup_entity_1 = require("../entities/MenuGroup.entity");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantRepository, userRepository, memberRepository, orderRepository, mealRepository, dealRepository, groupRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.orderRepository = orderRepository;
        this.mealRepository = mealRepository;
        this.dealRepository = dealRepository;
        this.groupRepository = groupRepository;
    }
    async findRestaurants(latitude, longitude, distance) {
        const restaurants = await this.restaurantRepository
            .query('SELECT title,address,picture,(getDistanceFromLatLonInKm(?,?,restaurants.latitude,restaurants.longitude)*1.15) AS distance FROM restaurants WHERE (getDistanceFromLatLonInKm(?,?,restaurants.latitude,restaurants.longitude)*1.15) <= ? ', [latitude, longitude, latitude, longitude, distance]);
        var createRestaurantResponseDto = new Array();
        for (let i = 0; i < restaurants.length; i++) {
            const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), restaurants[i].picture));
            createRestaurantResponseDto.push({ title: restaurants[i].title, address: restaurants[i].address, picture: new common_1.StreamableFile(file), distance: restaurants[i].distance });
        }
        return createRestaurantResponseDto;
    }
    async createRestaurant(createrRestaurantDto) {
        const newRestaurant = this.restaurantRepository.create(createrRestaurantDto);
        return this.restaurantRepository.save(newRestaurant);
    }
    async findRestaurantByCiteria(title) {
        return this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.menu", "menu")
            .leftJoinAndSelect("menu.menuGroups", "menuGroups")
            .leftJoinAndSelect("menuGroups.meals", "meals")
            .where("restaurant.title like :criteria", { criteria: `${title}%` })
            .orWhere("meals.label like :criteria", { criteria: `${title}%` })
            .getMany();
    }
    async findRestaurantById(restaurantId, userId) {
        let membershipDto = new Membership_dto_1.MembershipDto();
        let restaurant = new RestaurantData_dto_1.RestaurantDataDto();
        if (userId) {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (user) {
                const membership = await this.memberRepository.createQueryBuilder("membership")
                    .leftJoinAndSelect("membership.user", "user")
                    .leftJoinAndSelect("membership.restaurant", "restaurant")
                    .where("user.id = :id", { id: userId })
                    .andWhere("restaurant.id = :idRest", { idRest: restaurantId })
                    .getOne();
                if (membership) {
                    membershipDto.id = membership.id;
                    membershipDto.points = membership.points;
                    membershipDto.user = membership.user.id;
                    membershipDto.restaurant = membership.restaurant.id;
                }
            }
        }
        restaurant.membership = membershipDto;
        restaurant.restaurant = await this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.menu", "menu")
            .leftJoinAndSelect("menu.menuGroups", "menuGroups")
            .leftJoinAndSelect("menuGroups.meals", "meals")
            .leftJoinAndSelect("restaurant.deals", "deals")
            .where("restaurant.id = :id", { id: restaurantId })
            .getOne();
        return restaurant;
    }
    async findRestaurantsByOwner(ownerID) {
        return this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.owner", "owner")
            .leftJoinAndSelect("restaurant.deals", "deals")
            .where("owner.id = :id", { id: ownerID })
            .getMany();
    }
    async findMealById(id) {
        return this.mealRepository.findOneBy({ id: id });
    }
    async findDeals(restaurantId) {
        return this.dealRepository.createQueryBuilder("deal")
            .leftJoin("deal.restaurant", "restaurant")
            .where("restaurant.id = :id", { id: restaurantId })
            .getMany();
    }
    async addDeal(restaurantId, label) {
        const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
        const deal = this.dealRepository.create({ label: label });
        deal.restaurant = restaurant;
        const savedDeal = await this.dealRepository.save(deal);
        savedDeal.picture = savedDeal.id + '_' + 'deal.jpg';
        return this.dealRepository.save(savedDeal);
    }
    deleteDeal(id) {
        return this.dealRepository.delete({ id });
    }
    updateDeal(id, dealDto) {
        return this.dealRepository.save({
            id: id,
            label: dealDto.label,
            picture: dealDto.picture
        });
    }
    async subscribeUser(userId, restaurantId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
        if (!restaurant) {
            throw new common_1.HttpException('Restaurant not found', common_1.HttpStatus.NOT_FOUND);
        }
        const member = await this.memberRepository.createQueryBuilder("member")
            .leftJoin("member.user", "user")
            .leftJoin("member.restaurant", "restaurant")
            .where("user.id = :userId", { userId: userId })
            .andWhere("restaurant.id = :restaurantId", { restaurantId: restaurantId })
            .getOne();
        if (member) {
            throw new common_1.HttpException('Membership already exists', common_1.HttpStatus.CONFLICT);
        }
        const memberShip = new Membership_entity_1.Membership();
        memberShip.user = user;
        memberShip.restaurant = restaurant;
        memberShip.points = 0;
        return this.memberRepository.save(memberShip);
    }
    async createOrder(orderDto) {
        const user = await this.userRepository.findOneBy({ id: orderDto.userId });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const restaurant = await this.restaurantRepository.findOneBy({ id: orderDto.restaurantId });
        if (!restaurant) {
            throw new common_1.HttpException('Restaurant not found', common_1.HttpStatus.NOT_FOUND);
        }
        const order = new Order_entity_1.Order();
        order.user = user;
        order.restaurant = restaurant;
        order.realPrice = orderDto.realPrice;
        order.discountedPrice = orderDto.discountedPrice;
        const member = await this.memberRepository.createQueryBuilder("member")
            .leftJoin("member.user", "user")
            .leftJoin("member.restaurant", "restaurant")
            .where("user.id = :userId", { userId: orderDto.userId })
            .andWhere("restaurant.id = :restaurantId", { restaurantId: orderDto.restaurantId })
            .getOne();
        member.points = member.points + Math.floor(orderDto.realPrice);
        await this.orderRepository.save(order);
        await this.memberRepository.save(member);
    }
    updateRestaurant(id, createRestaurantDto) {
        return this.restaurantRepository.save({
            id: id,
            address: createRestaurantDto.address,
            title: createRestaurantDto.title,
            picture: createRestaurantDto.picture ? createRestaurantDto.picture : null,
            latitude: createRestaurantDto.latitude,
            longitude: createRestaurantDto.longitude
        });
    }
    async findCashiersByOwner(ownerID, restaurantId) {
        return this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoin("restaurant.owner", "owner")
            .leftJoinAndSelect("restaurant.cashiers", "cashiers")
            .where("owner.id = :id", { id: ownerID })
            .andWhere("restaurant.id = :idRest", { idRest: restaurantId })
            .getOne();
    }
    async findRestaurantGroups(restaurantId) {
        return this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.menu", "menu")
            .leftJoinAndSelect("menu.menuGroups", "menuGroups")
            .where("restaurant.id = :id", { id: restaurantId })
            .getMany();
    }
    async addRestaurantGroup(restaurantId, groupDto) {
        let restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId }, relations: ['menu'], });
        let menuGroup = new MenuGroup_entity_1.MenuGroup();
        menuGroup.label = groupDto.label;
        menuGroup.menu = restaurant.menu;
        menuGroup.meals = [];
        return this.groupRepository.save(menuGroup);
    }
    async updateRestaurantGroup(groupId, groupDto) {
        let group = await this.groupRepository.findOne({ where: { id: groupId } });
        group.label = groupDto.label;
        return this.groupRepository.save(group);
    }
    deleteGroup(id) {
        return this.groupRepository.delete({ id });
    }
    async findRestaurantMeals(restaurantId) {
        return this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.menu", "menu")
            .leftJoinAndSelect("menu.menuGroups", "menuGroups")
            .leftJoinAndSelect("menuGroups.meals", "meals")
            .where("restaurant.id = :id", { id: restaurantId })
            .getMany();
    }
    async addRestaurantMeal(groupId, mealDto) {
        let group = await this.groupRepository.findOne({ where: { id: groupId } });
        let meals = [];
        for (let i = 0; i < mealDto.length; i++) {
            let meal = new Meal_entity_1.Meal();
            meal.label = mealDto[i].label;
            meal.price = mealDto[i].price;
            meal.pointsToBuy = mealDto[i].pointsToBuy;
            meal.menuGroup = group;
            meals.push(meal);
        }
        const savedMeals = await this.mealRepository.save(meals);
        for (let i = 0; i < savedMeals.length; i++) {
            savedMeals[i].picture = savedMeals[i].id + '_' + 'meal.jpg';
        }
        return this.mealRepository.save(savedMeals);
    }
    async updateRestaurantMeal(mealId, mealDto) {
        let meal = await this.mealRepository.findOne({ where: { id: mealId } });
        meal.label = mealDto.label;
        meal.price = mealDto.price;
        meal.pointsToBuy = mealDto.pointsToBuy;
        return this.mealRepository.save(meal);
    }
    deleteMeal(id) {
        return this.mealRepository.delete({ id });
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Membership_entity_1.Membership)),
    __param(3, (0, typeorm_1.InjectRepository)(Order_entity_1.Order)),
    __param(4, (0, typeorm_1.InjectRepository)(Meal_entity_1.Meal)),
    __param(5, (0, typeorm_1.InjectRepository)(Deal_entity_1.Deal)),
    __param(6, (0, typeorm_1.InjectRepository)(MenuGroup_entity_1.MenuGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map
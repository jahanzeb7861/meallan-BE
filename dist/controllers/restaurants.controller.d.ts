import { DealDto } from 'src/dtos/deals/Deal.dto';
import { GroupDto } from 'src/dtos/groups/Group.dto';
import { MealDto } from 'src/dtos/menus/Meal.dto';
import { OrderDto } from 'src/dtos/orders/Order.dto';
import { CreateRestaurantDto } from 'src/dtos/restaurants/CreateRestaurant.dto';
import { RestaurantsService } from 'src/services/restaurants.service';
export declare class RestaurantsController {
    private restaurantService;
    constructor(restaurantService: RestaurantsService);
    getRestaurants(latitude: string, longitude: string, query: any): Promise<import("../dtos/restaurants/CreateRestaurantResponse.dto").CreateRestaurantResponseDto[]>;
    getRestaurantsByCriteria(criteria: string): Promise<import("../entities/Restaurant.entity").Restaurant[]>;
    createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<import("../entities/Restaurant.entity").Restaurant>;
    getRestaurantById(id: number, userId: number): Promise<import("../dtos/restaurants/RestaurantData.dto").RestaurantDataDto>;
    getRestaurantByOwner(id: number): Promise<import("../entities/Restaurant.entity").Restaurant[]>;
    updateRestaurant(id: number, createRestaurantDto: CreateRestaurantDto): Promise<{
        id: number;
        address: string;
        title: string;
        picture: string;
        latitude: number;
        longitude: number;
    } & import("../entities/Restaurant.entity").Restaurant>;
    subscribeUser(userId: number, restaurantId: number): Promise<import("../entities/Membership.entity").Membership>;
    getMealById(id: number): Promise<import("../entities/Meal.entity").Meal>;
    getDeals(restaurantId: number): Promise<import("../entities/Deal.entity").Deal[]>;
    addDeal(restaurantId: number, dealDto: DealDto): Promise<import("../entities/Deal.entity").Deal>;
    deleteDeal(restaurantId: number): Promise<import("typeorm").DeleteResult>;
    updateDeal(id: number, dealDto: DealDto): Promise<{
        id: number;
        label: string;
        picture: string;
    } & import("../entities/Deal.entity").Deal>;
    createOrder(orderDto: OrderDto): Promise<void>;
    getCashiersByOwner(ownerid: number, restaurantid: number): Promise<import("../entities/Restaurant.entity").Restaurant>;
    getRestaurantGroups(restaurantId: number): Promise<import("../entities/Restaurant.entity").Restaurant[]>;
    addRestaurantGroup(restaurantId: number, groupDto: GroupDto): Promise<import("../entities/MenuGroup.entity").MenuGroup>;
    updateRestaurantGroup(groupId: number, groupDto: GroupDto): Promise<import("../entities/MenuGroup.entity").MenuGroup>;
    deleteGroup(groupId: number): Promise<import("typeorm").DeleteResult>;
    getRestaurantMeals(restaurantId: number): Promise<import("../entities/Restaurant.entity").Restaurant[]>;
    addRestaurantMeal(groupId: number, mealDto: MealDto[]): Promise<import("../entities/Meal.entity").Meal[]>;
    updateRestaurantMeal(mealId: number, mealDto: MealDto): Promise<import("../entities/Meal.entity").Meal>;
    deleteMeal(mealId: number): Promise<import("typeorm").DeleteResult>;
    getRestaurantMenu(restaurantId: number): Promise<import("../entities/Restaurant.entity").Restaurant[]>;
}

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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
const User_entity_1 = require("../entities/User.entity");
const Favorites_entity_1 = require("../entities/Favorites.entity");
let FavoritesService = class FavoritesService {
    constructor(restaurantRepository, userRepository, favoriteRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
        this.favoriteRepository = favoriteRepository;
    }
    async addToFavorite(addFavoriteDto) {
        const user = await this.userRepository.findOneBy({ id: addFavoriteDto.userId });
        const restaurant = await this.restaurantRepository.findOneBy({ id: addFavoriteDto.restaurantId });
        if (user && restaurant) {
            const favorite = new Favorites_entity_1.Favorite();
            favorite.user = user;
            favorite.restaurant = restaurant;
            return this.favoriteRepository.save(favorite);
        }
        else {
            throw new common_1.HttpException('User or Restaurant not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findByUser(userId) {
        return this.favoriteRepository.createQueryBuilder("favorite")
            .leftJoinAndSelect("favorite.user", "user")
            .leftJoinAndSelect("favorite.restaurant", "restaurant")
            .where("user.id = :id", { id: userId })
            .getMany();
    }
    async delete(id) {
        return this.favoriteRepository.delete(id);
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Favorites_entity_1.Favorite)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map
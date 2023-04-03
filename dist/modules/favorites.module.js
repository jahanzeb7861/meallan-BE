"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const favorites_controller_1 = require("../controllers/favorites.controller");
const Favorites_entity_1 = require("../entities/Favorites.entity");
const Restaurant_entity_1 = require("../entities/Restaurant.entity");
const User_entity_1 = require("../entities/User.entity");
const favorites_service_1 = require("../services/favorites.service");
let FavoritesModule = class FavoritesModule {
};
FavoritesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Favorites_entity_1.Favorite, User_entity_1.User, Restaurant_entity_1.Restaurant])],
        controllers: [favorites_controller_1.FavoritesController],
        providers: [favorites_service_1.FavoritesService]
    })
], FavoritesModule);
exports.FavoritesModule = FavoritesModule;
//# sourceMappingURL=favorites.module.js.map
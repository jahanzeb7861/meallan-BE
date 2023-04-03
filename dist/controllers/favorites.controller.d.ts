import { AddFavoriteDto } from 'src/dtos/favorites/AddFavorite.dto';
import { FavoritesService } from 'src/services/favorites.service';
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    getUsersFavorites(userId: number): Promise<import("../entities/Favorites.entity").Favorite[]>;
    addToFavorites(addFavoriteDto: AddFavoriteDto): Promise<import("../entities/Favorites.entity").Favorite>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}

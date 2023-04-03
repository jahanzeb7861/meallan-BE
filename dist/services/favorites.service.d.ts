import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/Restaurant.entity';
import { AddFavoriteDto } from 'src/dtos/favorites/AddFavorite.dto';
import { User } from 'src/entities/User.entity';
import { Favorite } from 'src/entities/Favorites.entity';
export declare class FavoritesService {
    private restaurantRepository;
    private userRepository;
    private favoriteRepository;
    constructor(restaurantRepository: Repository<Restaurant>, userRepository: Repository<User>, favoriteRepository: Repository<Favorite>);
    addToFavorite(addFavoriteDto: AddFavoriteDto): Promise<Favorite>;
    findByUser(userId: number): Promise<Favorite[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}

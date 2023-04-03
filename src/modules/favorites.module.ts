import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesController } from 'src/controllers/favorites.controller';
import { RestaurantsController } from 'src/controllers/restaurants.controller';
import { Favorite } from 'src/entities/Favorites.entity';
import { Restaurant } from 'src/entities/Restaurant.entity';
import { User } from 'src/entities/User.entity';
import { FavoritesService } from 'src/services/favorites.service';

@Module({
    imports:[TypeOrmModule.forFeature([Favorite,User,Restaurant])],
    controllers: [FavoritesController],
    providers: [FavoritesService]
})
export class FavoritesModule {

}

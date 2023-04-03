import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from 'src/controllers/restaurants.controller';
import { Deal } from 'src/entities/Deal.entity';
import { Meal } from 'src/entities/Meal.entity';
import { Membership } from 'src/entities/Membership.entity';
import { MenuGroup } from 'src/entities/MenuGroup.entity';
import { Order } from 'src/entities/Order.entity';
import { Restaurant } from 'src/entities/Restaurant.entity';
import { User } from 'src/entities/User.entity';
import { RestaurantsService } from 'src/services/restaurants.service';

@Module({
    imports:[TypeOrmModule.forFeature([Restaurant,User,Membership,Order,Meal,Deal,MenuGroup])],
    controllers: [RestaurantsController],
    providers: [RestaurantsService]
})
export class RestaurantsModule {

}

import { Restaurant } from './Restaurant.entity';
import { User } from './User.entity';
export declare class Order {
    id: number;
    realPrice: number;
    discountedPrice: number;
    createdAt: Date;
    user: User;
    restaurant: Restaurant;
}

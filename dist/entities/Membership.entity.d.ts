import { Restaurant } from './Restaurant.entity';
import { User } from './User.entity';
export declare class Membership {
    id: number;
    points: number;
    createdAt: Date;
    user: User;
    restaurant: Restaurant;
}

import { Membership } from './Membership.entity';
import { Order } from './Order.entity';
import { Profile } from './Profile.entity';
import { Restaurant } from './Restaurant.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    profile: Profile;
    restaurants: Restaurant[];
    memberships: Membership[];
    orders: Order[];
    emailToLowerCase(): void;
    restaurant: Restaurant;
}

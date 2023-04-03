import { Currency } from './Currency.entity';
import { Deal } from './Deal.entity';
import { Favorite } from './Favorites.entity';
import { Membership } from './Membership.entity';
import { Menu } from './Menu.entity';
import { Order } from './Order.entity';
import { User } from './User.entity';
export declare class Restaurant {
    id: number;
    title: string;
    address: string;
    picture: string;
    longitude: number;
    latitude: number;
    menu: Menu;
    owner: User;
    memberships: Membership[];
    currency: Currency;
    orders: Order[];
    favorites: Favorite[];
    deals: Deal[];
    cashiers: User[];
}

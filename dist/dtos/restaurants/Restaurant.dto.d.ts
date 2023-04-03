import { DealDto } from "../deals/Deal.dto";
import { MenuDto } from "../menus/Menu.dto";
export declare class RestaurantDto {
    id: number;
    title: string;
    address: string;
    picture: string;
    longitude: number;
    latitude: number;
    menu: MenuDto;
    deals: DealDto[];
}

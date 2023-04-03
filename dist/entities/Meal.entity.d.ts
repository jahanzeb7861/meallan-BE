import { MenuGroup } from './MenuGroup.entity';
export declare class Meal {
    id: number;
    label: string;
    price: number;
    picture: string;
    pointsToBuy: number;
    menuGroup: MenuGroup;
}

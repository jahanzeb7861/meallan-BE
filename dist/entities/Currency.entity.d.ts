import { Restaurant } from './Restaurant.entity';
export declare class Currency {
    id: number;
    label: string;
    code: string;
    restaurants: Restaurant[];
}

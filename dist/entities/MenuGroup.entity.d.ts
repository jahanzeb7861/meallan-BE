import { Meal } from './Meal.entity';
import { Menu } from './Menu.entity';
export declare class MenuGroup {
    id: number;
    label: string;
    picture: string;
    menu: Menu;
    meals: Meal[];
}

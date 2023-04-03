import { MealDto } from "./Meal.dto";

export class MenuGroupDto{

    id: number;
    label: string;
    picture: string;
    meals: MealDto[];

}
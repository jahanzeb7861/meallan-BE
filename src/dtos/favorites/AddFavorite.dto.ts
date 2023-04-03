import { IsNotEmpty} from "class-validator";

export class AddFavoriteDto{

   @IsNotEmpty()
   userId: number;

   @IsNotEmpty()
   restaurantId: number;
   

}
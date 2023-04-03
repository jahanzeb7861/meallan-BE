import { StreamableFile } from "@nestjs/common";

export class CreateRestaurantResponseDto{

   title: string;

   address: string;

   picture : StreamableFile;

   distance?: string; 

}
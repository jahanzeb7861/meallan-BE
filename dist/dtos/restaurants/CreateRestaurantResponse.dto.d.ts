import { StreamableFile } from "@nestjs/common";
export declare class CreateRestaurantResponseDto {
    title: string;
    address: string;
    picture: StreamableFile;
    distance?: string;
}

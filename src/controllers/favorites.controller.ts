import { Controller,Post,Body,Get, Param, Delete} from '@nestjs/common';
import { AddFavoriteDto } from 'src/dtos/favorites/AddFavorite.dto';
import { FavoritesService } from 'src/services/favorites.service';

@Controller('favorites')
export class FavoritesController {

    constructor(private favoritesService: FavoritesService){}


@Get('/:userId')
getUsersFavorites(@Param('userId') userId:number) {
  return this.favoritesService.findByUser(userId);
 }
    
@Post('/add')
addToFavorites(@Body() addFavoriteDto: AddFavoriteDto){
   return this.favoritesService.addToFavorite(addFavoriteDto);
}

@Delete('/:id')
delete(@Param('id') id:number){
   return this.favoritesService.delete(id);
}

}

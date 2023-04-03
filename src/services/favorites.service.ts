import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/Restaurant.entity';

import { AddFavoriteDto } from 'src/dtos/favorites/AddFavorite.dto';
import { User } from 'src/entities/User.entity';
import { Favorite } from 'src/entities/Favorites.entity';


@Injectable()
export class FavoritesService {

    constructor(@InjectRepository(Restaurant) private restaurantRepository:Repository<Restaurant>,
    @InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Favorite) private favoriteRepository:Repository<Favorite>,
    ){}

   async addToFavorite(addFavoriteDto:AddFavoriteDto ){
    const user= await  this.userRepository.findOneBy({id :addFavoriteDto.userId});
    const restaurant= await  this.restaurantRepository.findOneBy({id :addFavoriteDto.restaurantId});
    if(user && restaurant){ 
        const favorite : Favorite = new Favorite();
        favorite.user = user;
        favorite.restaurant= restaurant;
        return this.favoriteRepository.save(favorite);
    }
    else{
        throw new HttpException('User or Restaurant not found',HttpStatus.NOT_FOUND);
    }
   }

  async findByUser(userId:number){
    return this.favoriteRepository.createQueryBuilder("favorite")
    .leftJoinAndSelect("favorite.user", "user")
    .leftJoinAndSelect("favorite.restaurant", "restaurant")
    .where("user.id = :id", { id: userId })
    .getMany()
  }

  async delete(id:number){
   return this.favoriteRepository.delete(id);
  }


 
}

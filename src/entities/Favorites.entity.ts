import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,ManyToOne} from 'typeorm' ;

import { Restaurant } from './Restaurant.entity';
import { User } from './User.entity';

@Entity({name: 'favorites'})
export class Favorite {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @OneToOne(()=>User)
    @JoinColumn()
    user: User;

    @ManyToOne(()=> Restaurant , (restaurant) => restaurant.favorites)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;




}
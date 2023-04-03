import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,ManyToOne} from 'typeorm' ;
import { Restaurant } from './Restaurant.entity';
import { User } from './User.entity';

@Entity({name: 'orders'})
export class Order {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({name : 'real_price'})
    realPrice: number;

    @Column({name : 'discounted_price'})
    discountedPrice: number;

    @CreateDateColumn()
    createdAt: Date ;

    @ManyToOne(()=> User , (user) => user.orders)
    user: User;
    
    @ManyToOne(()=> Restaurant , (restaurant) => restaurant.orders)
    restaurant: Restaurant;


}
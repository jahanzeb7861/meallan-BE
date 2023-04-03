import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn} from 'typeorm' ;
import { Restaurant } from './Restaurant.entity';
import { User } from './User.entity';

@Entity({name: 'memberships'})
export class Membership {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    points: number;

    @CreateDateColumn()
    createdAt: Date ;

    @ManyToOne(()=> User , (user) => user.memberships)
    user: User;
    
    @ManyToOne(()=> Restaurant , (restaurant) => restaurant.memberships)
    restaurant: Restaurant;


}
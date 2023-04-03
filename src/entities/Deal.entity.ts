import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn} from 'typeorm' ;
import { MenuGroup } from './MenuGroup.entity';
import { Restaurant } from './Restaurant.entity';

@Entity({name: 'deals'})
export class Deal {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    label: string;

    @Column({nullable : true})
    picture: string;

    @ManyToOne(()=> Restaurant , (restaurant) => restaurant.deals)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;



}
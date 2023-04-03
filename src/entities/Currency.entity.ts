import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm' ;
import { Restaurant } from './Restaurant.entity';

@Entity({name: 'currencies'})
export class Currency {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    label: string;

    @Column()
    code: string;

    @OneToMany(() => Restaurant , (restaurant)=> restaurant.currency)
    restaurants: Restaurant[];

}
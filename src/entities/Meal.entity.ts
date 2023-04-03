import {Entity,PrimaryGeneratedColumn,Column,ManyToOne} from 'typeorm' ;
import { MenuGroup } from './MenuGroup.entity';

@Entity({name: 'meals'})
export class Meal {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    label: string;

    @Column()
    price: number;

    @Column({nullable : true})
    picture: string;

    @Column({name : 'points_to_buy', nullable : true})
    pointsToBuy: number;

    @ManyToOne(()=> MenuGroup , (menuGroup) => menuGroup.meals)
    menuGroup: MenuGroup;

}
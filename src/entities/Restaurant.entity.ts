import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,ManyToOne,OneToMany} from 'typeorm' ;
import { Currency } from './Currency.entity';
import { Deal } from './Deal.entity';
import { Favorite } from './Favorites.entity';
import { Membership } from './Membership.entity';
import { Menu } from './Menu.entity';
import { Order } from './Order.entity';
import { User } from './User.entity';

@Entity({name: 'restaurants'})
export class Restaurant {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    title: string;

    @Column()
    address: string;

    @Column({nullable:true})
    picture: string;

    @Column({type:'double'})
    longitude: number;

    @Column({type:'double'})
    latitude: number;

    @OneToOne(()=>Menu)
    @JoinColumn()
    menu: Menu;

    @ManyToOne(()=> User , (user) => user.restaurants)
    owner: User;

    @OneToMany(() => Membership , (membership)=> membership.restaurant)
    memberships: Membership[];

    @ManyToOne(()=> Currency , (currency) => currency.restaurants)
    currency: Currency;

    @OneToMany(() => Order , (order)=> order.restaurant)
    orders: Order[];

    @OneToMany(() => Favorite , (favorite)=> favorite.restaurant)
    favorites: Favorite[];

    @OneToMany(() => Deal , (deal)=> deal.restaurant)
    deals: Deal[];

    @OneToMany(() => User , (user)=> user.restaurant)
    cashiers: User[];
    
    



}
import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,BeforeInsert,BeforeUpdate} from 'typeorm' ;
import { Membership } from './Membership.entity';
import { Order } from './Order.entity';
import { Profile } from './Profile.entity';
import { Restaurant } from './Restaurant.entity';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({unique:true})
    email: string ;

    @Column({select:false,nullable:true})
    password: string;

    @Column({nullable:true})
    firstname: string;

    @Column({nullable:true})
    lastname: string;

    @Column({nullable:true})
    phone: string;

    @ManyToOne(()=> Profile , (profile) => profile.users)
    profile: Profile

    @OneToMany(() => Restaurant , (restaurant)=> restaurant.owner)
    restaurants: Restaurant[];

    @OneToMany(() => Membership , (membership)=> membership.user)
    memberships: Membership[];

    @OneToMany(() => Order , (order)=> order.user)
    orders: Order[];

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }

    //In case of cashier 
    @ManyToOne(()=> Restaurant , (restaurant) => restaurant.cashiers)
    restaurant: Restaurant
}
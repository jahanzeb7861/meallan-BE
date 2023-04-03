import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm' ;
import { User } from './User.entity';

@Entity({name: 'profiles'})
export class Profile {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    label: string;

    @OneToMany(() => User , (user)=> user.profile)
    users: User[];

}
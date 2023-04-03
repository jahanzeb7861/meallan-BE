import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany} from 'typeorm' ;
import { Meal } from './Meal.entity';
import { Menu } from './Menu.entity';

@Entity({name: 'menus_groups'})
export class MenuGroup {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    label: string;

    @Column({nullable : true})
    picture: string;

    @ManyToOne(()=> Menu , (menu) => menu.menuGroups)
    menu: Menu;

    @OneToMany(() => Meal , (meal)=> meal.menuGroup)
    meals: Meal[];

}
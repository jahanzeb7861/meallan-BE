import {Entity,PrimaryGeneratedColumn,OneToMany,Column} from 'typeorm' ;
import { MenuGroup } from './MenuGroup.entity';

@Entity({name: 'menus'})
export class Menu {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable : true})
    label: string;

    @OneToMany(() => MenuGroup , (menuGroup)=> menuGroup.menu)
    menuGroups: MenuGroup[];

}
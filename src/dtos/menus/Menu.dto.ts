import { MenuGroupDto } from "./MenuGroup.dto";

export class MenuDto{

    id: number;
    label: string;
    menuGroups: MenuGroupDto[];

}
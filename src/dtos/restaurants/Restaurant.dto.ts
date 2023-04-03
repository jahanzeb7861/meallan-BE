import { IsOptional } from "class-validator";
import { DealDto } from "../deals/Deal.dto";
import { MembershipDto } from "../memberships/Membership.dto";
import { MenuDto } from "../menus/Menu.dto";

export class RestaurantDto{

   id: number;
   title: string;
   address: string;
   picture: string;
   longitude: number;
   latitude: number;
   menu: MenuDto;
  // currency: Currency;
   deals: DealDto[];
   
}
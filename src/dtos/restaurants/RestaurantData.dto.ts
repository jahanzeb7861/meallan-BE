import { IsOptional } from "class-validator";
import { DealDto } from "../deals/Deal.dto";
import { MembershipDto } from "../memberships/Membership.dto";
import { MenuDto } from "../menus/Menu.dto";
import { RestaurantDto } from "./Restaurant.dto";

export class RestaurantDataDto{

 restaurant : RestaurantDto;
 membership: MembershipDto;
}
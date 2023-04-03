import { LoginUserDto } from "./Login-user.dto";

export class createUserDto extends LoginUserDto{
 
   id?: number ;
   
   firstanme?: string;

   lastname?: string;

   phone?: string;

   //In case of Cashier
  // restaurant?: string;
}
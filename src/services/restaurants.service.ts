import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,Like} from 'typeorm';
import { Restaurant } from 'src/entities/Restaurant.entity';
import { CreateRestaurantDto } from 'src/dtos/restaurants/CreateRestaurant.dto';
import { CreateRestaurantResponseDto } from 'src/dtos/restaurants/CreateRestaurantResponse.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { User } from 'src/entities/User.entity';
import { Membership } from 'src/entities/Membership.entity';
import { MembershipDto } from 'src/dtos/memberships/Membership.dto';
import { RestaurantDataDto } from 'src/dtos/restaurants/RestaurantData.dto';
import { Order } from 'src/entities/Order.entity';
import { OrderDto } from 'src/dtos/orders/Order.dto';
import { Meal } from 'src/entities/Meal.entity';
import { Deal } from 'src/entities/Deal.entity';
import { DealDto } from 'src/dtos/deals/Deal.dto';
import { GroupDto } from 'src/dtos/groups/Group.dto';
import { MenuGroup } from 'src/entities/MenuGroup.entity';
import { MealDto } from 'src/dtos/menus/Meal.dto';


@Injectable()
export class RestaurantsService {

    constructor(@InjectRepository(Restaurant) private restaurantRepository:Repository<Restaurant>,
    @InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Membership) private memberRepository:Repository<Membership>,
    @InjectRepository(Order) private orderRepository:Repository<Order>,
    @InjectRepository(Meal) private mealRepository:Repository<Meal>,
    @InjectRepository(Deal) private dealRepository:Repository<Deal>,
    @InjectRepository(MenuGroup) private groupRepository:Repository<MenuGroup>,
    ){}

   async findRestaurants(latitude:string,longitude:string,distance:string):Promise<CreateRestaurantResponseDto[]>{
        const restaurants = await this.restaurantRepository
          .query('SELECT title,address,picture,(getDistanceFromLatLonInKm(?,?,restaurants.latitude,restaurants.longitude)*1.15) AS distance FROM restaurants WHERE (getDistanceFromLatLonInKm(?,?,restaurants.latitude,restaurants.longitude)*1.15) <= ? ',[latitude,longitude,latitude,longitude,distance])
        var createRestaurantResponseDto: CreateRestaurantResponseDto[] = new Array();
        for (let i = 0; i < restaurants.length; i++) {
            const file = createReadStream(join(process.cwd(), restaurants[i].picture));
            createRestaurantResponseDto.push({title:restaurants[i].title,address:restaurants[i].address,picture:new StreamableFile(file),distance:restaurants[i].distance})
          }
        return createRestaurantResponseDto;
    }

    async createRestaurant(createrRestaurantDto: CreateRestaurantDto){
        const newRestaurant= this.restaurantRepository.create(createrRestaurantDto);
       // newRestaurant.picture=picturePath; 
        return this.restaurantRepository.save(newRestaurant);
    }

    async findRestaurantByCiteria(title: String){
        return this.restaurantRepository.createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.menu", "menu")
        .leftJoinAndSelect("menu.menuGroups", "menuGroups")
        .leftJoinAndSelect("menuGroups.meals", "meals")
        .where("restaurant.title like :criteria", { criteria: `${title}%` })
        .orWhere("meals.label like :criteria", { criteria: `${title}%` })
        .getMany()
    }

    
    async findRestaurantById(restaurantId: number,userId: number):Promise<RestaurantDataDto>{

        let membershipDto : MembershipDto = new MembershipDto();
        let restaurant : RestaurantDataDto = new RestaurantDataDto();
        if(userId){
            const user= await  this.userRepository.findOneBy({id :userId});
            if(user){
                const membership = await this.memberRepository.createQueryBuilder("membership")
                .leftJoinAndSelect("membership.user", "user")
                .leftJoinAndSelect("membership.restaurant", "restaurant")
                .where("user.id = :id", { id: userId })
                .andWhere("restaurant.id = :idRest", { idRest: restaurantId })
                .getOne();
                if(membership){
                    membershipDto.id = membership.id;
                    membershipDto.points = membership.points;
                    membershipDto.user = membership.user.id;
                    membershipDto.restaurant = membership.restaurant.id;
                }
            }
        }
        restaurant.membership = membershipDto;
        restaurant.restaurant = await this.restaurantRepository.createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.menu", "menu")
        .leftJoinAndSelect("menu.menuGroups", "menuGroups")
        .leftJoinAndSelect("menuGroups.meals", "meals")
        .leftJoinAndSelect("restaurant.deals", "deals")
        .where("restaurant.id = :id", { id: restaurantId })
        .getOne();       
        return restaurant;
    }

     
    async findRestaurantsByOwner(ownerID: number){
         return this.restaurantRepository.createQueryBuilder("restaurant")
        .leftJoinAndSelect("restaurant.owner", "owner")
        .leftJoinAndSelect("restaurant.deals", "deals")
        .where("owner.id = :id", { id: ownerID })
        .getMany();      
    }


    async findMealById(id: number){
        return this.mealRepository.findOneBy({id:id});
    }

    // async findMeals(restaurantId: number){
    //    return this.restaurantRepository.createQueryBuilder("restaurant")
    //    .leftJoin("restaurant.menu", "menu")
    //    .leftJoin("menu.menuGroups", "menuGroup")
    //    .leftJoinAndSelect("menuGroups.meals", "meals")
    //    .where("restaurant.id = :id", { id: restaurantId })
    //    .getMany();
    // }

    async findDeals(restaurantId: number){
        return this.dealRepository.createQueryBuilder("deal")
             .leftJoin("deal.restaurant", "restaurant")
             .where("restaurant.id = :id", { id: restaurantId })
             .getMany();
    }

    async addDeal(restaurantId: number,label : string){
        const restaurant= await  this.restaurantRepository.findOneBy({id :restaurantId});
        const deal= this.dealRepository.create({label : label});
        deal.restaurant = restaurant ;
        const savedDeal = await this.dealRepository.save(deal)
        savedDeal.picture = savedDeal.id+'_'+'deal.jpg';
        return this.dealRepository.save(savedDeal);
    }

    deleteDeal(id:number ){
        return this.dealRepository.delete({id});
    }

    updateDeal(id:number, dealDto:DealDto){
        return this.dealRepository.save({
            id : id,
            label : dealDto.label,
            picture : dealDto.picture
        });
    }



    async subscribeUser(userId: number,restaurantId: number){
        const user= await  this.userRepository.findOneBy({id :userId});
        if(!user){
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        }
        const restaurant= await  this.restaurantRepository.findOneBy({id :restaurantId});
        if(!restaurant){
            throw new HttpException('Restaurant not found',HttpStatus.NOT_FOUND);
        }
        const member = await this.memberRepository.createQueryBuilder("member")
        .leftJoin("member.user", "user")
        .leftJoin("member.restaurant", "restaurant")
        .where("user.id = :userId", { userId: userId })
        .andWhere("restaurant.id = :restaurantId", { restaurantId: restaurantId })
        .getOne();
        if(member){
            throw new HttpException('Membership already exists',HttpStatus.CONFLICT);
        }
        const memberShip : Membership = new Membership();
        memberShip.user = user;
        memberShip.restaurant = restaurant;
        memberShip.points = 0;
     return this.memberRepository.save(memberShip)
       
    }

    async createOrder(orderDto: OrderDto){
        const user= await  this.userRepository.findOneBy({id : orderDto.userId});
        if(!user){
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        }
        const restaurant= await  this.restaurantRepository.findOneBy({id : orderDto.restaurantId});
        if(!restaurant){
            throw new HttpException('Restaurant not found',HttpStatus.NOT_FOUND);
        }
        const order : Order = new Order();
         order.user = user;
         order.restaurant = restaurant;
         order.realPrice = orderDto.realPrice;
         order.discountedPrice = orderDto.discountedPrice;
         const member = await this.memberRepository.createQueryBuilder("member")
         .leftJoin("member.user", "user")
         .leftJoin("member.restaurant", "restaurant")
         .where("user.id = :userId", { userId: orderDto.userId })
         .andWhere("restaurant.id = :restaurantId", { restaurantId: orderDto.restaurantId })
         .getOne();
         member.points = member.points+ Math.floor(orderDto.realPrice);
         await this.orderRepository.save(order); 
         await this.memberRepository.save(member);
    }
    updateRestaurant(id:number,  createRestaurantDto:CreateRestaurantDto){
        // if(createRestaurantDto.picture!==''){
        //     createRestaurantDto.picture=id+'_restaurant.jpg';
        // }
       // return this.restaurantRepository.update({id},createRestaurantDto);
        return this.restaurantRepository.save({
            id : id,
            address : createRestaurantDto.address,
            title: createRestaurantDto.title,
            picture: createRestaurantDto.picture ? createRestaurantDto.picture : null,
            latitude: createRestaurantDto.latitude,
            longitude: createRestaurantDto.longitude
        });
    }

    async findCashiersByOwner(ownerID: number,restaurantId: number){
          return this.restaurantRepository.createQueryBuilder("restaurant")
       .leftJoin("restaurant.owner", "owner")
       .leftJoinAndSelect("restaurant.cashiers", "cashiers")
       .where("owner.id = :id", { id: ownerID })
       .andWhere("restaurant.id = :idRest", {idRest : restaurantId})
       .getOne();       
   }
 

   async findRestaurantGroups(restaurantId: number){
    return this.restaurantRepository.createQueryBuilder("restaurant")
     .leftJoinAndSelect("restaurant.menu", "menu")
     .leftJoinAndSelect("menu.menuGroups", "menuGroups")
     .where("restaurant.id = :id", { id: restaurantId })
     .getMany();   
}
   
    async addRestaurantGroup(restaurantId: number, groupDto:GroupDto){
    let restaurant = await this.restaurantRepository.findOne({where: {id :restaurantId},relations: ['menu'],});
     let menuGroup = new MenuGroup() ; 
     menuGroup.label = groupDto.label ; 
     menuGroup.menu = restaurant.menu ; 
     menuGroup.meals = [] ; 
    //  const savedGroup = await this.groupRepository.save(menuGroup)
    //  savedGroup.picture = savedGroup.id+'_'+'group.jpg';
     return this.groupRepository.save(menuGroup);
    }

    async updateRestaurantGroup(groupId: number, groupDto:GroupDto){
    let group = await this.groupRepository.findOne({where: {id :groupId}});
     group.label = groupDto.label ; 
     return this.groupRepository.save(group);
    }

    deleteGroup(id:number ){
        return this.groupRepository.delete({id});
    }


    async findRestaurantMeals(restaurantId: number){
        return this.restaurantRepository.createQueryBuilder("restaurant")
         .leftJoinAndSelect("restaurant.menu", "menu")
         .leftJoinAndSelect("menu.menuGroups", "menuGroups")
         .leftJoinAndSelect("menuGroups.meals", "meals")
         .where("restaurant.id = :id", { id: restaurantId })
         .getMany();   
    }
       
     async addRestaurantMeal(groupId: number, mealDto:MealDto[]){
         let group = await this.groupRepository.findOne({where: {id :groupId}});
         let meals : Meal[] = []; 
         for(let i=0; i<mealDto.length; i++){
            let meal = new Meal();
            meal.label = mealDto[i].label;
            meal.price = mealDto[i].price;
            meal.pointsToBuy = mealDto[i].pointsToBuy;
            meal.menuGroup = group;
            meals.push(meal);
        }
         const savedMeals = await this.mealRepository.save(meals);
         for(let i=0; i<savedMeals.length; i++){
            savedMeals[i].picture = savedMeals[i].id+'_'+'meal.jpg';
         }
         return this.mealRepository.save(savedMeals);
        }
    
        async updateRestaurantMeal(mealId: number, mealDto:MealDto){
        let meal = await this.mealRepository.findOne({where: {id :mealId}});
        meal.label = mealDto.label;
        meal.price = mealDto.price;
        meal.pointsToBuy = mealDto.pointsToBuy;
         return this.mealRepository.save(meal);
        }
    
        deleteMeal(id:number){
            return this.mealRepository.delete({id});
        }


       

}

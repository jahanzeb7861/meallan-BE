import { Controller,Post,Body,Get, Query, Param, Put, Delete} from '@nestjs/common';
import { DealDto } from 'src/dtos/deals/Deal.dto';
import { GroupDto } from 'src/dtos/groups/Group.dto';
import { MealDto } from 'src/dtos/menus/Meal.dto';
import { OrderDto } from 'src/dtos/orders/Order.dto';
import { CreateRestaurantDto } from 'src/dtos/restaurants/CreateRestaurant.dto';
import { RestaurantsService } from 'src/services/restaurants.service';

@Controller()
export class RestaurantsController {

constructor(private restaurantService: RestaurantsService){}

   
@Get('restaurants/:latitude/:longitude')
  getRestaurants(@Param('latitude') latitude:string,@Param('longitude') longitude:string,@Query() query) {
  return this.restaurantService.findRestaurants(latitude,longitude,query?.distance);
 }

@Get('restaurants/:criteria')
 getRestaurantsByCriteria(@Param('criteria') criteria:string) {
  return this.restaurantService.findRestaurantByCiteria(criteria);
 }

@Post('restaurants/create')
createRestaurant( @Body() createRestaurantDto:CreateRestaurantDto){
  return this.restaurantService.createRestaurant(createRestaurantDto);
}

@Get('restaurant/:id/:userId')
getRestaurantById(@Param('id') id:number,@Param('userId') userId:number) {
  return this.restaurantService.findRestaurantById(id,userId);
 }

@Get('restaurantsByOwner/:ownerid')
 getRestaurantByOwner(@Param('ownerid') id:number) {
  return this.restaurantService.findRestaurantsByOwner(id);
 }

 
 @Put('restaurant/:id')
 updateRestaurant(@Param('id') id:number,  @Body() createRestaurantDto:CreateRestaurantDto) {
  return this.restaurantService.updateRestaurant(id,createRestaurantDto);
 }

@Post('restaurant/subscribe/:userId/:restaurantId')
subscribeUser(@Param('userId') userId:number,@Param('restaurantId') restaurantId:number) {
   return this.restaurantService.subscribeUser(userId,restaurantId);
  }     
    
@Get('meal/:id')
getMealById(@Param('id') id:number) {
   return this.restaurantService.findMealById(id);
  }


//   @Get('meals/:restaurantId')
// getMeals(@Param('restaurantId') restaurantId:number) {
//    return this.restaurantService.findMeals(restaurantId);
//   }


@Get('deals/:restaurantId')
getDeals(@Param('restaurantId') restaurantId:number) {
   return this.restaurantService.findDeals(restaurantId);
  }

@Post('deals/:restaurantId')
addDeal(@Param('restaurantId') restaurantId:number, @Body() dealDto : DealDto) {
  return this.restaurantService.addDeal(restaurantId,dealDto.label);
  }

@Delete('deals/:restaurantId')
deleteDeal(@Param('restaurantId') restaurantId:number) {
  return this.restaurantService.deleteDeal(restaurantId);
  }

  @Put('deals/:id')
  updateDeal(@Param('id') id:number,  @Body() @Body() dealDto : DealDto) {
   return this.restaurantService.updateDeal(id,dealDto);
  }

@Post('order/create')
createOrder(@Body() orderDto:OrderDto){
  return this.restaurantService.createOrder(orderDto);
}

@Get('cashiersByOwner/:ownerid/:restaurantid')
 getCashiersByOwner(@Param('ownerid') ownerid:number, @Param('restaurantid') restaurantid:number) {
  return this.restaurantService.findCashiersByOwner(ownerid,restaurantid);
 }


 @Get('groups/:restaurantId')
 getRestaurantGroups(@Param('restaurantId') restaurantId:number) {
  return this.restaurantService.findRestaurantGroups(restaurantId);
 }

 @Post('groups/:restaurantId')
 addRestaurantGroup(@Param('restaurantId') restaurantId:number, @Body() groupDto:GroupDto) {
  return this.restaurantService.addRestaurantGroup(restaurantId,groupDto);
 }

 @Put('groups/:groupId')
 updateRestaurantGroup(@Param('groupId') groupId:number, @Body() groupDto:GroupDto) {
   return this.restaurantService.updateRestaurantGroup(groupId,groupDto);
 }


 @Delete('groups/:groupId')
deleteGroup(@Param('groupId') groupId:number) {
     return this.restaurantService.deleteGroup(groupId);
  }


 @Get('meals/:restaurantId')
 getRestaurantMeals(@Param('restaurantId') restaurantId:number) {
  return this.restaurantService.findRestaurantMeals(restaurantId);
 }

 @Post('meals/:groupId')
 addRestaurantMeal(@Param('groupId') groupId:number, @Body() mealDto:MealDto[]) {
  return this.restaurantService.addRestaurantMeal(groupId,mealDto);
 }

 @Put('meals/:mealId')
 updateRestaurantMeal(@Param('mealId') mealId:number, @Body() mealDto:MealDto) {
  return this.restaurantService.updateRestaurantMeal(mealId,mealDto);
 }


 @Delete('meeals/:mealId')
deleteMeal(@Param('mealId') mealId:number) {
  return this.restaurantService.deleteMeal(mealId);
  }


  @Get('menu/:restaurantId')
  getRestaurantMenu(@Param('restaurantId') restaurantId:number) {
   return this.restaurantService.findRestaurantMeals(restaurantId);
  }




// @Post('restaurants/create')
// @UseInterceptors(FileInterceptor('file',{
//     storage : diskStorage({
//         destination : './uploads/restaurants',
//         filename: (req, file, callback) => { 
          
//             //const extension: string = extname(file.originalname);
//             //  const filename: string = `${file.originalname}${extension}`;
//             callback(null,`${file.originalname}`)
//         }
//     })
// }))
// createRestaurant(@UploadedFile() file , @Body() createRestaurantDto:CreateRestaurantDto){
//    return this.restaurantService.createRestaurant(createRestaurantDto,file.path);
// }

}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class CashierRoleGuard implements CanActivate{
    constructor(){}
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.user?.profile ==='SUPER_ADMIN' || request.user?.profile ==='CASHIER';
    }
    
}
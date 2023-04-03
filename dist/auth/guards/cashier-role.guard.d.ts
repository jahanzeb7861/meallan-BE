import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class CashierRoleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}

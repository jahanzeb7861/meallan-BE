import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AdminRoleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}

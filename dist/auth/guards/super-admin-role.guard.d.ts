import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class SuperAdminRoleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}

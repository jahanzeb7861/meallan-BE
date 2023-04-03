import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class ClientRoleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): boolean;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashierRoleGuard = void 0;
const common_1 = require("@nestjs/common");
let CashierRoleGuard = class CashierRoleGuard {
    constructor() { }
    canActivate(context) {
        var _a, _b;
        const request = context.switchToHttp().getRequest();
        return ((_a = request.user) === null || _a === void 0 ? void 0 : _a.profile) === 'SUPER_ADMIN' || ((_b = request.user) === null || _b === void 0 ? void 0 : _b.profile) === 'CASHIER';
    }
};
CashierRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CashierRoleGuard);
exports.CashierRoleGuard = CashierRoleGuard;
//# sourceMappingURL=cashier-role.guard.js.map
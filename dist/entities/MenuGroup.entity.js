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
exports.MenuGroup = void 0;
const typeorm_1 = require("typeorm");
const Meal_entity_1 = require("./Meal.entity");
const Menu_entity_1 = require("./Menu.entity");
let MenuGroup = class MenuGroup {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], MenuGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MenuGroup.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuGroup.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_entity_1.Menu, (menu) => menu.menuGroups),
    __metadata("design:type", Menu_entity_1.Menu)
], MenuGroup.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Meal_entity_1.Meal, (meal) => meal.menuGroup),
    __metadata("design:type", Array)
], MenuGroup.prototype, "meals", void 0);
MenuGroup = __decorate([
    (0, typeorm_1.Entity)({ name: 'menus_groups' })
], MenuGroup);
exports.MenuGroup = MenuGroup;
//# sourceMappingURL=MenuGroup.entity.js.map
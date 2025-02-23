import { BaseEntity } from "../base/BaseEntity";

export default interface IBaseService<T extends BaseEntity>{
    GetAll(): T[];
    GetById(id: string): T | undefined;
    Create(entity: T): T;
}
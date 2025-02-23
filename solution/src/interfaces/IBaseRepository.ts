import { BaseEntity } from "../base/BaseEntity";

export interface IBaseRepository<T extends BaseEntity> {
    GetAll(): T[];
    GetById(id: string): T | undefined;
    Create(entity: T): T;
    Save(entity: T): T;  
}
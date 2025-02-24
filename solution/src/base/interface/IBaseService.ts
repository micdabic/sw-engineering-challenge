import { BaseEntity } from "../BaseEntity";

export default interface IBaseService<T extends BaseEntity>{
    GetAll(): T[];
    GetById(id: string): T | undefined;
}
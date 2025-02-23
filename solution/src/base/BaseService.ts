import { IBaseRepository } from "../interfaces/IBaseRepository";
import IBaseService from "../interfaces/IBaseService";
import { BaseEntity } from "./BaseEntity";

export default class BaseService<T extends BaseEntity> implements IBaseService<T>{
    repository: IBaseRepository<T>;

    constructor(repository: IBaseRepository<T>){
        this.repository = repository;
    }

    GetAll(): T [] {
        return this.repository.GetAll();
    }

    GetById(id: string): T | undefined {
       return this.repository.GetById(id);
    }

    Create(entity: T): T {
       return this.repository.Create(entity);
    }
    
}
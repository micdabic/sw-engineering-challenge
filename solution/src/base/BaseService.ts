import { IBaseRepository } from "./interface/IBaseRepository";
import { BaseEntity } from "./BaseEntity";

export default class BaseService<T extends BaseEntity>{
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
}
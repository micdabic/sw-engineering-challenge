import { IBaseRepository } from "../interfaces/IBaseRepository";
import { BaseEntity } from "./BaseEntity";

export default abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T>{
    entities: T[];

    constructor(bootsrapEntities: T[]){
        this.entities = bootsrapEntities;
    }

    GetAll(): T[] {
       return this.entities;
    }

    GetById(id: string): T | undefined {
        return this.entities.find(e => e.id === id);
    }

    Create(entity: T): T {
        this.entities.push(entity);
        return entity;
    }

    Save(entity: T): T {
        const index = this.entities.findIndex(e => e.id === entity.id);
        
        if (index !== -1) {
            this.entities[index] = entity; 
        } else {
            this.entities.push(entity); 
        }
        return entity;
    }
}
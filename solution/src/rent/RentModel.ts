import { BaseEntity } from "../base/BaseEntity";

export enum RentStatus {
    CREATED,
    WAITING_DROPOFF,
    WAITING_PICKUP,
    DELIVERED,
}
  
export enum RentSize {
    XS,
    S,
    M,
    L,
    XL,
}

export class RentModel extends BaseEntity {
    lockerId: string | null;
    weight: number;
    size: RentSize;
    status: RentStatus;

    constructor(id: string, lockerId: string | null, weight: number, size: RentSize, status: RentStatus){
        super(id);
        this.lockerId = lockerId;
        this.weight = weight;
        this.size = size;
        this.status = status;
    }
}
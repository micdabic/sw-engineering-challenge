import { BaseEntity } from "../base/BaseEntity";
import CreateState from "./rentState/CreatedState";
import RentState from "./rentState/RentState";
import WaitingDropOffState from "./rentState/WaitingDropOffState";

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

const stateMap: Record<RentStatus, new () => RentState> = {
    [RentStatus.CREATED]: CreateState,
    [RentStatus.WAITING_DROPOFF]: WaitingDropOffState,
    [RentStatus.WAITING_PICKUP]: CreateState,
    [RentStatus.DELIVERED]: CreateState
  };

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
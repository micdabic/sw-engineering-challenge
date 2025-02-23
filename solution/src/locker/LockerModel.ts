import { BaseEntity } from "../base/BaseEntity";

export enum LockerStatus {
    OPEN,
    CLOSED
}

export class LockerModel extends BaseEntity{
    bloqId: String;
    status: LockerStatus;
    isOccupied: boolean;

    constructor(id: string, bloqId: String, status: LockerStatus, isOccupied: boolean){
        super(id);
        this.bloqId = bloqId;
        this.status = status;
        this.isOccupied = isOccupied;
    }
}
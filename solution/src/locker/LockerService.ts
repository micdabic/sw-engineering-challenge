import BaseService from "../base/BaseService";
import {LockerModel, LockerStatus} from "./LockerModel";
import ILockerRepository from "./interface/ILockerRepository";
import ILockerService from "./interface/ILockerService";

export default class LockerService extends BaseService<LockerModel> implements ILockerService{
    LockerRepository: ILockerRepository;

    constructor(LockerRepository: ILockerRepository){
        super(LockerRepository);
        this.LockerRepository = LockerRepository;
    }

    CreateLocker(bloqId: string): LockerModel {
        var newLocker = new LockerModel(
            crypto.randomUUID(),
            bloqId,
            LockerStatus.OPEN,
            false
        )

        return this.LockerRepository.Create(newLocker);
    }
}
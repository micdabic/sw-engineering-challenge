import LockerRepository from "./LockerRepository";
import BaseService from "../base/BaseService";
import {LockerModel} from "./LockerModel";

export default class LockerService extends BaseService<LockerModel> {
    LockerRepository: LockerRepository;

    constructor(LockerRepository: LockerRepository){
        super(LockerRepository);
        this.LockerRepository = LockerRepository;
    }
}
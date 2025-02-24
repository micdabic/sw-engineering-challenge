import IBaseService from "../../base/interface/IBaseService";
import { LockerModel } from "../LockerModel";

export default interface ILockerService extends IBaseService<LockerModel>{
    CreateLocker(bloqId: string): LockerModel;
}
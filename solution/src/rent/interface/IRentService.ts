import IBaseService from "../../base/interface/IBaseService";
import { Result } from "../../types/Result";
import { RentModel } from "../RentModel";
import { CreateRentDTO } from "../dto/CreateRentDTO";

export default interface IRentService extends IBaseService<RentModel>{
    CreateRent(createRentDto: CreateRentDTO): Result<RentModel>;
    AssignLocker(rentId: string, lockerId: string): Result<RentModel>;
    DropOff(rentId: string): Result<RentModel>;
    PickUp(rentId: string): Result<RentModel>;
}
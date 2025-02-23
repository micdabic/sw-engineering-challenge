import RentRepository from "./RentRepository";
import BaseService from "../base/BaseService";
import {RentModel, RentSize, RentStatus} from "./RentModel";
import WaitingDropOffState from "./rentState/WaitingDropOffState";
import WaitingPickUpState from "./rentState/WaitingPickUpState";
import DeliveredState from "./rentState/DeliveredState";
import RentStateContext from "./rentState/RentStateContext";

type CreateRentDTO = {
    lockerId: string,
    weight: number,
    size: RentSize        
}

export default class RentService extends BaseService<RentModel> {
    RentRepository: RentRepository;

    constructor(RentRepository: RentRepository){
        super(RentRepository);
        this.RentRepository = RentRepository;
    }
    
    
    CreateRent(createRentDTO: CreateRentDTO): RentModel {
        const newRent = new RentModel(
            crypto.randomUUID(),
            null,
            createRentDTO.weight,
            createRentDTO.size,
            RentStatus.CREATED
        );
        
        var rentContext = new RentStateContext(newRent);
        rentContext.state.Notify();
        return this.repository.Create(newRent);
    }

    AssignLocker(rentId: string, lockerId: string): RentModel | null{
        var rent = this.GetById(rentId);

        if(rent != undefined){
            rent.lockerId = lockerId;
            var rentContext = new RentStateContext(rent);
            rentContext.ChangeState(new WaitingDropOffState());
            return this.repository.Save(rent);
        }

        return null;
       
    }

    DropOff(rentId: string): boolean {
        var rent = this.GetById(rentId);
        
        if(rent != undefined && rent.status == RentStatus.WAITING_DROPOFF){
            var rentContext = new RentStateContext(rent);
            rentContext.ChangeState(new WaitingPickUpState());
            return true;
        }

        return false;
    }

    PickUp(rentId: string): boolean {
        var rent = this.GetById(rentId);

        if(rent != undefined && rent.status == RentStatus.WAITING_PICKUP){
            var rentContext = new RentStateContext(rent);
            rentContext.ChangeState(new DeliveredState());
            return true;
        }

        return false;
    }
}
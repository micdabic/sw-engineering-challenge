import BaseService from "../base/BaseService";
import {RentModel, RentStatus} from "./RentModel";
import WaitingDropOffState from "./rentState/WaitingDropOffState";
import WaitingPickUpState from "./rentState/WaitingPickUpState";
import DeliveredState from "./rentState/DeliveredState";
import RentStateContext from "./rentState/RentStateContext";
import { CreateRentDTO } from "./dto/CreateRentDTO";
import IRentService from "./interface/IRentService";
import IRentRepository from "./interface/IRentRepository";
import { Result } from "../types/Result";
import { RENT_ERROR } from "./RentErrors";

export default class RentService extends BaseService<RentModel> implements IRentService {
    RentRepository: IRentRepository;

    constructor(RentRepository: IRentRepository){
        super(RentRepository);
        this.RentRepository = RentRepository;
    }
    
    CreateRent(createRentDTO: CreateRentDTO): Result<RentModel> {
        const newRent = new RentModel(
            crypto.randomUUID(),
            null,
            createRentDTO.weight,
            createRentDTO.size,
            RentStatus.CREATED
        );
        
        var rentContext = new RentStateContext(newRent);
        rentContext.state.Notify();

        var createdRent = this.repository.Create(newRent);
        
        return { success: true, data: createdRent };

    }

    //Possibly delegate this responsability to scheduler
    AssignLocker(rentId: string, lockerId: string): Result<RentModel> {
        var rent = this.GetById(rentId);
        
        if (!rent) {
            return { success: false, error: RENT_ERROR.RENT_NOT_FOUND };
        }

        rent.lockerId = lockerId;
        var rentContext = new RentStateContext(rent);
        rentContext.ChangeState(new WaitingDropOffState());
        this.repository.Save(rent);
        
        return { success: true, data: rent };
       
    }

    DropOff(rentId: string): Result<RentModel> {
        const rent = this.GetById(rentId);

        if (!rent) {
            return { success: false, error: RENT_ERROR.RENT_NOT_FOUND };
        }
    
        if (rent.status !== RentStatus.WAITING_DROPOFF) {
            return { success: false, error: RENT_ERROR.INVALID_RENT_STATE };
        }
    
        const rentContext = new RentStateContext(rent);
        rentContext.ChangeState(new WaitingPickUpState());
        this.repository.Save(rent);
    
        return { success: true, data: rent };
    }

    PickUp(rentId: string): Result<RentModel> {
        const rent = this.GetById(rentId);

        if (!rent) {
            return { success: false, error: RENT_ERROR.RENT_NOT_FOUND };
        }
    
        if (rent.status !== RentStatus.WAITING_PICKUP) {
            return { success: false, error: RENT_ERROR.INVALID_RENT_STATE };
        }
    
        const rentContext = new RentStateContext(rent);
        rentContext.ChangeState(new DeliveredState());
        this.repository.Save(rent);

        return { success: true, data: rent };
    }
}
import { RentModel, RentStatus } from "../RentModel";
import CreateState from "./CreatedState";
import DeliveredState from "./DeliveredState";
import RentState from "./RentState";
import WaitingDropOffState from "./WaitingDropOffState";
import WaitingPickUpState from "./WaitingPickUpState";

const stateMap: Record<RentStatus, new () => RentState> = {
    [RentStatus.CREATED]: CreateState,
    [RentStatus.WAITING_DROPOFF]: WaitingDropOffState,
    [RentStatus.WAITING_PICKUP]: WaitingPickUpState,
    [RentStatus.DELIVERED]: DeliveredState
  };
  
export default class RentStateContext {
    state: RentState;
    rent: RentModel;

    constructor(rent: RentModel){
        this.rent = rent;

        const StateClass = stateMap[this.rent.status as RentStatus];
        this.state = new StateClass();
    }

    ChangeState(rentState: RentState){
        this.state = rentState;
        this.state.Notify();
        this.rent.status = this.state.GetStatus();
    }
}
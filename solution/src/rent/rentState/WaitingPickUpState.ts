import { RentModel, RentStatus } from "../RentModel";
import DeliveredState from "./DeliveredState";
import RentState from "./RentState"

export default class WaitingPickUpState extends RentState {

    GetStatus(): RentStatus {
       return RentStatus.WAITING_PICKUP;
    }

    Notify(): void {
        console.log("Rent state updated to Waiting Pick Up.")
    }
}
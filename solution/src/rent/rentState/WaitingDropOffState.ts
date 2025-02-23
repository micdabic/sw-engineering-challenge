import { RentModel, RentStatus } from "../RentModel";
import RentState from "./RentState";
import WaitingPickUpState from "./WaitingPickUpState";

export default class WaitingDropOffState extends RentState {

    GetStatus(): RentStatus {
        return RentStatus.WAITING_DROPOFF;
    }

    Notify(): void {
        console.log("Rent state updated to Waiting Drop Off.")
    }
}
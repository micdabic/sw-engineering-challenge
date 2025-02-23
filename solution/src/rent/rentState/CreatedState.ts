import { RentModel, RentStatus } from "../RentModel";
import RentState from "./RentState";
import WaitingDropOffState from "./WaitingDropOffState";

export default class CreateState extends RentState {
    GetStatus(): RentStatus {
        return RentStatus.CREATED;
    }

    Notify(): void {
        console.log("Rent has been created.")
    }
}
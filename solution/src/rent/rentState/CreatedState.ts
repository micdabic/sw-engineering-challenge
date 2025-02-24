import { RentStatus } from "../RentModel";
import RentState from "./RentState";

export default class CreateState extends RentState {
    
    GetStatus(): RentStatus {
        return RentStatus.CREATED;
    }

    Notify(): void {
        console.log("Rent has been created.")
    }
}
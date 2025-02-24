import { RentStatus } from "../RentModel";
import RentState from "./RentState";

export default class DeliveredState extends RentState {

    GetStatus(): RentStatus {
       return RentStatus.DELIVERED;
    }

    Notify(): void {
        console.log("Rent state updated to Delivered.")
    }
}
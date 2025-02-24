import { RentStatus } from "../RentModel";

export default abstract class RentState {
    abstract GetStatus(): RentStatus;
    abstract Notify(): void;
}
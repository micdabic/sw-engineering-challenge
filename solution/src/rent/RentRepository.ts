import BaseRepository from "../base/BaseRepository";
import {RentModel, RentStatus, RentSize} from "./RentModel";
import IRentRepository from "./interface/IRentRepository";

export default class RentRepository extends BaseRepository<RentModel> implements IRentRepository {
    
    constructor(){
        var rents = [
            {
              "id": "50be06a8-1dec-4b18-a23c-e98588207752",
              "lockerId": null,
              "weight": 5,
              "size": "M",
              "status": "CREATED"
            },
            {
              "id": "40efc6fd-f10c-4561-88bf-be916613377c",
              "lockerId": "1b8d1e89-2514-4d91-b813-044bf0ce8d20",
              "weight": 7,
              "size": "L",
              "status": "WAITING_PICKUP"
            },
            {
              "id": "84ba232e-ce23-4d8f-ae26-68616600df48",
              "lockerId": "6b33b2d1-af38-4b60-a3c5-53a69f70a351",
              "weight": 10,
              "size": "XL",
              "status": "WAITING_DROPOFF"
            },
            {
              "id": "feb72a9a-258d-49c9-92de-f90b1f11984d",
              "lockerId": "6b33b2d1-af38-4b60-a3c5-53a69f70a351",
              "weight": 30,
              "size": "XL",
              "status": "DELIVERED"
            }
          ];          
        
        var rentEntities: RentModel[] = [];

        rents.forEach(element => {
            rentEntities.push(new RentModel(
                element.id,
                element.lockerId,
                element.weight,
                RentSize[element.size as keyof typeof RentSize],
                RentStatus[element.status as keyof typeof RentStatus]))
            });

        super(rentEntities);         
    }
}
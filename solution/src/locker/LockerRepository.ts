import BaseRepository from "../base/BaseRepository";
import {LockerModel, LockerStatus} from "./LockerModel";
import ILockerRepository from "./interface/ILockerRepository";

export default class LockerRepository extends BaseRepository<LockerModel> implements ILockerRepository {
    
    constructor(){
        var lockers = [
            {
              "id": "1b8d1e89-2514-4d91-b813-044bf0ce8d20",
              "bloqId": "c3ee858c-f3d8-45a3-803d-e080649bbb6f",
              "status": "CLOSED",
              "isOccupied": true
            },
            {
              "id": "8b4b59ae-8de5-4322-a426-79c29315a9f1",
              "bloqId": "c3ee858c-f3d8-45a3-803d-e080649bbb6f",
              "status": "OPEN",
              "isOccupied": false
            },
            {
              "id": "2191e1b5-99c7-45df-8302-998be394be48",
              "bloqId": "c3ee858c-f3d8-45a3-803d-e080649bbb6f",
              "status": "CLOSED",
              "isOccupied": true
            },
            {
              "id": "6b33b2d1-af38-4b60-a3c5-53a69f70a351",
              "bloqId": "484e01be-1570-4ac1-a2a9-02aad3acc54e",
              "status": "CLOSED",
              "isOccupied": true
            },
            {
              "id": "ea6db2f6-2da7-42ed-9619-d40d718b7bec",
              "bloqId": "484e01be-1570-4ac1-a2a9-02aad3acc54e",
              "status": "CLOSED",
              "isOccupied": false
            },
            {
              "id": "3c881050-54bb-48bb-9d2c-f221d10f876b",
              "bloqId": "484e01be-1570-4ac1-a2a9-02aad3acc54e",
              "status": "OPEN",
              "isOccupied": false
            },
            {
              "id": "3139e8ce-ff98-4cb4-9e00-7f9d8b20e732",
              "bloqId": "22ffa3c5-3a3d-4f71-81f1-cac18ffbc510",
              "status": "OPEN",
              "isOccupied": false
            },
            {
              "id": "75f03ea9-c825-4e76-9484-f8b7f0a1d125",
              "bloqId": "22ffa3c5-3a3d-4f71-81f1-cac18ffbc510",
              "status": "OPEN",
              "isOccupied": false
            },
            {
              "id": "c4705b02-45be-4fd7-8d82-d336df1fa493",
              "bloqId": "22ffa3c5-3a3d-4f71-81f1-cac18ffbc510",
              "status": "CLOSED",
              "isOccupied": false
            }
          ]
          
        
        var lockerEntities: LockerModel[] = [];

        lockers.forEach(element => {
            lockerEntities.push(new LockerModel(element.id,
                element.bloqId,
                LockerStatus[element.status as keyof typeof LockerStatus],
                element.isOccupied))
        });

        super(lockerEntities);         
    }
}
import BaseRepository from "../base/BaseRepository";
import BloqModel from "./BloqModel";
import IBloqRepository from "./interface/IBloqRepository";

export default class BloqRepository extends BaseRepository<BloqModel> implements IBloqRepository {
    
    constructor(){
        var bloqs = [
            {
              "id": "c3ee858c-f3d8-45a3-803d-e080649bbb6f",
              "title": "Luitton Vouis Champs Elysées",
              "address": "101 Av. des Champs-Élysées, 75008 Paris, France"
            },
            {
              "id": "484e01be-1570-4ac1-a2a9-02aad3acc54e",
              "title": "Riod Eixample",
              "address": "Pg. de Gràcia, 74, L'Eixample, 08008 Barcelona, Spain"
            },
            {
              "id": "22ffa3c5-3a3d-4f71-81f1-cac18ffbc510",
              "title": "Bluberry Regent Street",
              "address": "121 Regent St, Mayfair, London W1B 4TB, United Kingdom"
            }
          ];
        
        var bloqEntities: BloqModel[] = [];

        bloqs.forEach(element => {
            bloqEntities.push(new BloqModel(element.id, element.address, element.title))
        });

        super(bloqEntities);         
    }
}
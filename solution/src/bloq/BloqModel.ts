import { BaseEntity } from "../base/BaseEntity";

export default class BloqModel extends BaseEntity{
    title: string;
    address: string;

    constructor(id: string, title: string, address: string){
        super(id);
        this.title = title;
        this.address = address;
    }
}
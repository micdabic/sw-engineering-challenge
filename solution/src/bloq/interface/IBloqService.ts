import BloqModel from "../BloqModel";
import { CreateBloqDTO } from "../dto/CreateBloqDTO";
import IBaseService from "../../base/interface/IBaseService";

export default interface IBloqService extends IBaseService<BloqModel> {
    CreateBloq(createBloqDTO: CreateBloqDTO): BloqModel;
}
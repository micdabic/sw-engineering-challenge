import BloqRepository from "./BloqRepository";
import BaseService from "../base/BaseService";
import BloqModel from "./BloqModel";

class BloqService extends BaseService<BloqModel> {
    bloqRepository: BloqRepository;

    constructor(bloqRepository: BloqRepository){
        super(bloqRepository);
        this.bloqRepository = bloqRepository;
    }
}

export default BloqService;
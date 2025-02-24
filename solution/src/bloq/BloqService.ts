import BaseService from "../base/BaseService";
import BloqModel from "./BloqModel";
import IBloqService from "./interface/IBloqService";
import { CreateBloqDTO } from "./dto/CreateBloqDTO";
import IBloqRepository from "./interface/IBloqRepository";

class BloqService extends BaseService<BloqModel> implements IBloqService {
    bloqRepository: IBloqRepository;

    constructor(bloqRepository: IBloqRepository){
        super(bloqRepository);
        this.bloqRepository = bloqRepository;
    }

    CreateBloq(createBloqDTO: CreateBloqDTO): BloqModel {
        var newBloq = new BloqModel(
            crypto.randomUUID(),
            createBloqDTO.title,
            createBloqDTO.address
        )

        return this.bloqRepository.Create(newBloq);
    }
}

export default BloqService;
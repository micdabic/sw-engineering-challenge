import { Router, Request, Response} from "express";
import BloqService from "./BloqService";
import BloqModel from "./BloqModel";

class BloqRoutes {
    router = Router();
    bloqService : BloqService;

    constructor(bloqService: BloqService) {
        this.bloqService = bloqService;
        
        this.router.get("/", async (req: Request, res: Response) => {
            var bloqs : BloqModel[] = await this.bloqService.GetAll();

            res.send(bloqs);
        });

        
    }
}

export default BloqRoutes;
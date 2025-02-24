import { Router, Request, Response, NextFunction} from "express";
import BloqModel from "./BloqModel";
import IBloqService from "./interface/IBloqService";

class BloqRoutes {
    router = Router();
    bloqService : IBloqService;

    constructor(bloqService: IBloqService) {
        this.bloqService = bloqService;
        
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                var bloqs : BloqModel[] = await this.bloqService.GetAll();
                res.status(200).json(bloqs);
            } catch(err) {
                next(err);
            }
        });

        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const bloqId = req.params.id;
        
                if (!bloqId) {
                    res.status(400).json({ message: "Invalid BloqId" });
                }

                const bloq: BloqModel | undefined = await this.bloqService.GetById(bloqId);

                if (!bloq) {
                    res.status(404).json({ message: "bloc not found" });
                }

                res.json(bloq);
            } catch(err) {
                next(err)
            }
        });

        this.router.post("/create", async (req: Request, res: Response, next: any) => {
            try {
                const { title, address } = req.body;

                if (!title || !address) {
                    res.status(400).json({ message: "Invalid body" });
                }
                
                var createBloqDto = {
                    title,
                    address
                }

                const createdBloq = await this.bloqService.CreateBloq(createBloqDto);
                res.status(201).json(createdBloq);
            } catch(err) {
                next(err);
            }
        });
    }
}

export default BloqRoutes;
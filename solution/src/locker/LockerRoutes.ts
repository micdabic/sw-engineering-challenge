import { Router, Request, Response} from "express";
import LockerService from "./LockerService";
import { LockerModel, LockerStatus } from "./LockerModel";

export default class LockerRoutes {
    router = Router();
    lockerService : LockerService;

    constructor(LockerService: LockerService) {
        this.lockerService = LockerService;
        
        this.router.get("/", async (req: Request, res: Response) => {
            var lockers : LockerModel[] = await this.lockerService.GetAll();

            res.send(lockers);
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            const lockerId = req.params.id;
        
            if (!lockerId) {
                res.status(400).json({ message: "Locker ID is required" });
            }

            const locker: LockerModel | undefined = await this.lockerService.GetById(lockerId);

            if (!locker) {
                res.status(404).json({ message: "Locker not found" });
            }

            res.json(locker);
        });

        this.router.post("/create", async (req: Request, res: Response) => {
            try {
                console.log(req.body)
                const { bloqId } = req.body;

                //TODO: hand this responsability to the service
                const newLocker = new LockerModel(
                    crypto.randomUUID(),
                    bloqId,
                    LockerStatus.OPEN,
                    false
                );

                const createdLocker = await this.lockerService.Create(newLocker);

                res.status(201).json(createdLocker);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });
    }
}
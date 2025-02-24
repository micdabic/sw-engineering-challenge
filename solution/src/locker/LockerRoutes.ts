import { Router, Request, Response, NextFunction} from "express";
import { LockerModel } from "./LockerModel";
import ILockerService from "./interface/ILockerService";

export default class LockerRoutes {
    router = Router();
    lockerService : ILockerService;

    constructor(LockerService: ILockerService) {
        this.lockerService = LockerService;
        
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                var lockers : LockerModel[] = await this.lockerService.GetAll();
                res.send(lockers);
            } catch(err) {
                next(err);
            }
        });

        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const lockerId = req.params.id;
        
                if (!lockerId) {
                    res.status(400).json({ message: "Invalid LockerId" });
                }
    
                const locker: LockerModel | undefined = await this.lockerService.GetById(lockerId);
    
                if (!locker) {
                    res.status(404).json({ message: "Locker not found" });
                }
    
                res.status(200).json(locker);
            } catch(err) {
                next(err);
            }
        });

        this.router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { bloqId } = req.body;

                if (!bloqId) {
                    res.status(400).json({ message: "Invalid BloqId" });
                }

                const createdLocker = await this.lockerService.CreateLocker(bloqId);

                res.status(201).json(createdLocker);
            } catch (err) {
                next(err);
            }
        });
    }
}
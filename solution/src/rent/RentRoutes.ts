import { Router, Request, Response} from "express";
import RentService from "./RentService";
import { RentModel, RentStatus } from "./RentModel";

export default class RentRoutes {
    router = Router();
    rentService : RentService;

    constructor(rentService: RentService) {
        this.rentService = rentService;
        
        this.router.get("/", async (req: Request, res: Response) => {
            var rents : RentModel[] = await this.rentService.GetAll();

            res.send(rents);
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            const rentId = req.params.id;
        
            if (!rentId) {
                res.status(400).json({ message: "Rent ID is required" });
            }

            const rent: RentModel | undefined = await this.rentService.GetById(rentId);

            if (!rent) {
                res.status(404).json({ message: "Rent not found" });
            }

            res.json(rent);
        });

        this.router.post("/create", async (req: Request, res: Response) => {
            try {
                console.log(req.body)
                const { lockerId, weight, size } = req.body;
                
                var createLockerDTO = {
                    lockerId: lockerId,
                    weight: weight,
                    size: size
                }

                const createdRent = await this.rentService.CreateRent(createLockerDTO);

                res.status(201).json(createdRent);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });

        this.router.post("/assignLocker", async (req: Request, res: Response) => {
            try {
                const { rentId, lockerId } = req.body;
                const assignedRent = this.rentService.AssignLocker(rentId, lockerId);
                
                res.status(200).json(assignedRent);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });

        this.router.post("/dropoff/:rentId", async (req: Request, res: Response) => {
            try {
                var bool = this.rentService.DropOff(req.params.rentId);
                res.status(200).json(bool);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });

        this.router.post("/pickup/:rentId", async (req: Request, res: Response) => {
            try {
                var bool = this.rentService.PickUp(req.params.rentId);
                res.status(200).json(bool);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });
    }
}
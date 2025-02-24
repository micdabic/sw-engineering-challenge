import { Router, Request, Response, NextFunction} from "express";
import { RentModel } from "./RentModel";
import IRentService from "./interface/IRentService";
import { RENT_ERROR } from "./RentErrors";

export default class RentRoutes {
    router = Router();
    rentService : IRentService;

    constructor(rentService: IRentService) {
        this.rentService = rentService;
        
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                var rents : RentModel[] = await this.rentService.GetAll();
                res.json(rents);
            } catch(err) {
                next(err)
            }
        });

        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const rentId = req.params.id;
        
                if (!rentId) {
                    res.status(400).json({ message: "Invalid RentID" });
                }
    
                const rent: RentModel | undefined = await this.rentService.GetById(rentId);
    
                if (!rent) {
                    res.status(404).json({ message: "Rent not found" });
                }
    
                res.json(rent);
            } catch(err) {
                next(err);
            }
        });

        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { weight, size } = req.body;

                if (!weight || !size) {
                    res.status(400).json("Invalid body")
                }

                var createRentDTO = {
                    weight: weight,
                    size: size
                }

                const result = await this.rentService.CreateRent(createRentDTO);

                res.status(201).json(result.data);
            } catch (err) {
                next(err);
            }
        });

        this.router.post("/assignLocker", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { rentId, lockerId } = req.body;

                if (!lockerId || !rentId) {
                    res.status(400).json("Invalid body")
                    return
                }

                const result = this.rentService.AssignLocker(rentId, lockerId);
                
                if (!result.success && result.error == RENT_ERROR.RENT_NOT_FOUND) {
                    res.status(404).json({ message: result.error });
                    return
                }
                
                res.status(200).json(result.data);
            } catch (err) {
                next(err);
            }
        });

        this.router.post("/dropoff", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { rentId } = req.body;

                if (!rentId) {
                    res.status(400).json({ message: "Invalid RentID" });
                }

                const result = this.rentService.DropOff(rentId);

                if (!result.success) {
                    switch (result.error) {
                        case RENT_ERROR.RENT_NOT_FOUND:
                            res.status(404).json({ message: result.error });

                        case RENT_ERROR.INVALID_RENT_STATE:
                            res.status(400).json({ message: result.error });

                        default:
                            break;
                    }
                }

                res.status(200).json(result.data);
            } catch (err) {
               next(err);
            }
        });

        this.router.post("/pickup/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { rentId } = req.body;

                if (!rentId) {
                    res.status(400).json({ message: "Invalid RentID" });
                }
                
                const result = this.rentService.PickUp(rentId);

                if (!result.success) {
                    switch (result.error) {
                        case RENT_ERROR.RENT_NOT_FOUND:
                            res.status(404).json({ message: result.error });

                        case RENT_ERROR.INVALID_RENT_STATE:
                            res.status(400).json({ message: result.error });

                        default:
                            break;
                    }
                }

                res.status(200).json(result.data);
            } catch (err) {
               next(err);
            }
        });
    }
}
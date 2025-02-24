import express, { Express } from "express";
import BloqRoutes from "./bloq/BloqRoutes";
import BloqService from "./bloq/BloqService";
import BloqRepository from "./bloq/BloqRepository";
import RentRepository from "./rent/RentRepository";
import RentService from "./rent/RentService";
import RentRoutes from "./rent/RentRoutes";
import LockerRepository from "./locker/LockerRepository";
import LockerService from "./locker/LockerService";
import LockerRoutes from "./locker/LockerRoutes";
import errorHandler from "./middleware/ErrorMiddleware";

const app: Express = express();
app.use(express.json());

//Bloq
var bloqRepository = new BloqRepository();
var bloqService = new BloqService(bloqRepository);
var bloqRoutes = new BloqRoutes(bloqService);
app.use("/api/bloq", bloqRoutes.router);

//Locker
var lockerRepository = new LockerRepository();
var lockerService = new LockerService(lockerRepository);
var lockerRoutes = new LockerRoutes(lockerService);
app.use("/api/locker", lockerRoutes.router);

//Rent
var rentRepository = new RentRepository();
var rentService = new RentService(rentRepository);
var rentRoutes = new RentRoutes(rentService);
app.use("/api/rent", rentRoutes.router)

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});

export default app;
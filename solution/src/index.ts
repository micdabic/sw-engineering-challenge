import express, { Express, Request, Response } from "express";
import BloqRoutes from "./bloq/BloqRoutes";
import BloqService from "./bloq/BloqService";
import BloqRepository from "./bloq/BloqRepository";
import { LockerRepository, LockerService, LockerRoutes } from "./locker";
import RentRepository from "./rent/RentRepository";
import RentService from "./rent/RentService";
import RentRoutes from "./rent/RentRoutes";

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

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



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
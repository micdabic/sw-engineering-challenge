import request from "supertest";
import express, { Express } from "express";
import RentRoutes from "../RentRoutes";
import IRentService from "../interface/IRentService";
import { RentModel, RentSize, RentStatus } from "../RentModel";
import { RENT_ERROR } from "../RentErrors";
import { Result } from "../../types/Result";

const mockRentService: jest.Mocked<IRentService> = {
    GetAll: jest.fn(),
    GetById: jest.fn(),
    CreateRent: jest.fn(),
    AssignLocker: jest.fn(),
    DropOff: jest.fn(),
    PickUp: jest.fn(),
};

const app: Express = express();
app.use(express.json()); 
app.use("/rent", new RentRoutes(mockRentService).router);

describe('Rent Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /rent should return a list of rents', async () => {
    const mockRents: RentModel[] = [
        { id: "1", lockerId: "L1", status: RentStatus.WAITING_DROPOFF, weight: 2, size: RentSize.L },
        { id: "2", lockerId: "L2", status: RentStatus.WAITING_PICKUP, weight: 3, size: RentSize.M }
    ];
    (mockRentService.GetAll as jest.Mock).mockResolvedValue(mockRents);

    const res = await request(app).get("/rent/");
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRents);
    expect(mockRentService.GetAll).toHaveBeenCalled();
  });

  test("GET /rent/:id should return a single rent", async () => {
    const mockRent: RentModel = { id: "1", lockerId: "L1", status: RentStatus.WAITING_DROPOFF, weight: 2, size: RentSize.L };
    (mockRentService.GetById as jest.Mock).mockResolvedValue(mockRent);

    const res = await request(app).get("/rent/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRent);
    expect(mockRentService.GetById).toHaveBeenCalledWith("1");
  });

  test("GET /rent/:id should return 404 if rent not found", async () => {
    (mockRentService.GetById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get("/rent/99");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Rent not found");
  });

  test("POST /rent/ should return a created rent", async () => {
    const mockRent: RentModel = { id: "1", lockerId: null, status: RentStatus.CREATED, weight: 2, size: RentSize.L };
    const result: Result<RentModel> = { success: true, data: mockRent};
    (mockRentService.CreateRent as jest.Mock).mockResolvedValue(result);

    const res = await request(app)
              .post("/rent/")
              .send({weight: 2, size: RentSize.L});

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockRent);
    expect(mockRentService.CreateRent).toHaveBeenCalledWith({ weight: 2, size: RentSize.L });
  });

  test("POST /rent/ should return 400", async () => {
    const res = await request(app)
              .post("/rent/")
              .send({size: RentSize.L});

    expect(res.status).toBe(400);
    expect(res.body).toEqual("Invalid body");
  });

  test("POST /rent/assignLocker should return an updated rent", async () => {
    const mockRent: RentModel = { id: "1", lockerId: "L1", status: RentStatus.WAITING_DROPOFF, weight: 2, size: RentSize.L };
    const result: Result<RentModel> = { success: true, data: mockRent};
    (mockRentService.AssignLocker as jest.Mock).mockResolvedValue(result);

    const res = await request(app)
              .post("/rent/assignLocker")
              .send({rentId: "1", lockerId: "L1"});

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRent);
    expect(mockRentService.AssignLocker).toHaveBeenCalledWith({rentId: "1", lockerId: "L1"});
  });

  test("POST /rent/assignLocker should return 400", async () => {
    const res = await request(app)
              .post("/rent/assignLocker")
              .send({lockerId: "L1"});

    expect(res.status).toBe(400);
    expect(res.body).toEqual("Invalid body");
  });

  test("POST /rent/assignLocker should return an rent not found", async () => {
    const result: Result<RentModel> = { success: false, error: RENT_ERROR.RENT_NOT_FOUND};
    (mockRentService.AssignLocker as jest.Mock).mockResolvedValue(result);

    const res = await request(app)
              .post("/rent/assignLocker")
              .send({rentId: "1", lockerId: "L1"});

    expect(res.status).toBe(404);
    expect(res.body).toEqual(RENT_ERROR.RENT_NOT_FOUND);
    expect(mockRentService.AssignLocker).toHaveBeenCalledWith({rentId: "1", lockerId: "L1"});
  });
});
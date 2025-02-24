import RentService from "../RentService";
import { RentModel, RentSize, RentStatus } from "../RentModel";
import { CreateRentDTO } from "../dto/CreateRentDTO";
import IRentRepository from "../interface/IRentRepository";
import { RENT_ERROR } from "../RentErrors";

describe("RentService", () => {
    let rentRepository: jest.Mocked<IRentRepository>;
    let rentService: RentService;

    beforeEach(() => {
        rentRepository = {
            Create: jest.fn(),
            GetById: jest.fn(),
            GetAll: jest.fn(),
            Save: jest.fn(),
        } as jest.Mocked<IRentRepository>;

        rentService = new RentService(rentRepository);
    });

    test("CreateRent: should create a rent", () => {
        const createRentDTO: CreateRentDTO = { weight: 5, size: RentSize.L };
        const mockRent: RentModel = {
            id: "1",
            lockerId: null,
            weight: createRentDTO.weight,
            size: createRentDTO.size,
            status: RentStatus.CREATED,
        };

        rentRepository.Create.mockReturnValue(mockRent);

        const result = rentService.CreateRent(createRentDTO);

        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockRent);
        expect(rentRepository.Create).toHaveBeenCalledWith(expect.any(RentModel));
    });

    test("AssignLocker: should return an error if rent is not found when assigning a locker", () => {
        rentRepository.GetById.mockReturnValue(undefined);

        const result = rentService.AssignLocker("1", "L1");

        expect(result.success).toBe(false);
        expect(result.error).toBe(RENT_ERROR.RENT_NOT_FOUND);
    });

    test("AssignLocker: should assign locker and update state", () => {
        const rent: RentModel = { id: "1", lockerId: null, weight: 2, size: RentSize.M, status: RentStatus.CREATED };
        rentRepository.GetById.mockReturnValue(rent);
        rentRepository.Save.mockReturnValue(rent);

        const result = rentService.AssignLocker("1", "L1");

        expect(result.success).toBe(true);
        expect(result.data).toBe(rent);
        expect(rent.status).toBe(RentStatus.WAITING_DROPOFF);
        expect(rentRepository.Save).toHaveBeenCalledWith(rent);
    });

    test("DropOff: should return an error if rent is not found when dropping off", () => {
        rentRepository.GetById.mockReturnValue(undefined);

        const result = rentService.DropOff("1");

        expect(result.success).toBe(false);
        expect(result.error).toBe(RENT_ERROR.RENT_NOT_FOUND);
    });

    test("DropOff: should return an error if rent is not in WAITING_DROPOFF state", () => {
        const rent: RentModel = { id: "1", lockerId: "L1", weight: 2, size: RentSize.M, status: RentStatus.CREATED };
        rentRepository.GetById.mockReturnValue(rent);

        const result = rentService.DropOff("1");

        expect(result.success).toBe(false);
        expect(result.error).toBe(RENT_ERROR.INVALID_RENT_STATE);
    });

    test("DropOff: should change rent state to WAITING_PICKUP on drop off", () => {
        const rent: RentModel = { id: "1", lockerId: "L1", weight: 2, size: RentSize.M, status: RentStatus.WAITING_DROPOFF };
        rentRepository.GetById.mockReturnValue(rent);
        rentRepository.Save.mockReturnValue(rent);

        const result = rentService.DropOff("1");

        expect(result.success).toBe(true);
        expect(rent.status).toBe(RentStatus.WAITING_PICKUP);
        expect(rentRepository.Save).toHaveBeenCalledWith(rent);
    });

    test("PickUp: should return an error if rent is not found when picking up", () => {
        rentRepository.GetById.mockReturnValue(undefined);

        const result = rentService.PickUp("1");

        expect(result.success).toBe(false);
        expect(result.error).toBe(RENT_ERROR.RENT_NOT_FOUND);
    });

    test("PickUp: should return an error if rent is not in WAITING_PICKUP state", () => {
        const rent: RentModel = { id: "1", lockerId: "L1", weight: 2, size: RentSize.M, status: RentStatus.CREATED };
        rentRepository.GetById.mockReturnValue(rent);

        const result = rentService.PickUp("1");

        expect(result.success).toBe(false);
        expect(result.error).toBe(RENT_ERROR.INVALID_RENT_STATE);
    });

    test("PickUp: should change rent state to DELIVERED on pickup", () => {
        const rent: RentModel = { id: "1", lockerId: "L1", weight: 2, size: RentSize.M, status: RentStatus.WAITING_PICKUP };
        rentRepository.GetById.mockReturnValue(rent);
        rentRepository.Save.mockReturnValue(rent);

        const result = rentService.PickUp("1");

        expect(result.success).toBe(true);
        expect(rent.status).toBe(RentStatus.DELIVERED);
        expect(rentRepository.Save).toHaveBeenCalledWith(rent);
    });
});

import { DeviceModel } from "./device.model";
import { PersonModel } from "./person.model"
import { RequestTypeModel } from "./request-type.model"

export interface LoanModel {
    idLoan?: number;
    description: string;
    address: string;
    idPerson: number;
    idRequestType: number;
    idDevice: number;
}

export interface LoanDataGridModel {
    idLoan?: number;
    description: string;
    address: string;
    requestType: RequestTypeModel;
    device: DeviceModel;
}
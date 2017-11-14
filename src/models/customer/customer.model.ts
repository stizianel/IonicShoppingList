import { Visit } from "../visit/visit.model";

export interface Customer {
    key?: string;
    name: string;
    address: string;
    city: string;
    visit?: Visit[];
}

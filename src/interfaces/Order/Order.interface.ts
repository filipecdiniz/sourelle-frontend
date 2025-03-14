import { ProductInterface } from "../Product.interface";
import ClientInterface from "./Client.interface";
import ClientAddressInterface from "./ClientAddress.interface";

export default interface OrderInterface {
    id: number;
    status: string;
    orderDate: Date;
    address: ClientAddressInterface;
    client: ClientInterface;
    products: ProductInterface[];
    delivered: boolean;
    // product: 
}
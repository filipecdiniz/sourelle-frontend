import ClientInterface from "./Client.interface";
import ClientAddressInterface from "./ClientAddress.interface";

export default interface OrderInterface {
    address: ClientAddressInterface;
    client: ClientInterface;
    // product: 
}
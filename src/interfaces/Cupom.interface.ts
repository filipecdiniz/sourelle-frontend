export default interface CupomInterface {
    id: number;
    cupom: string;
    percentage: number;
    expires: Date;
    shipping: boolean;
    created_at: Date;
    updated_at: Date;
}
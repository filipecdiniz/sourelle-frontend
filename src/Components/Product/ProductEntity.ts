export default class ProductEntity {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    url: string;

    constructor(id: number, categoryId: number, name: string, price: number, url: string) {
        this.id = id
        this.categoryId = categoryId
        this.name = name
        this.price = price
        this.url = url
    }
}
export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "available" | "out_of_stock" | "discontinued";
}

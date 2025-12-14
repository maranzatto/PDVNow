export interface Supplier {
    id: number;
    name: string;
    cnpj: string;
    contact: string;
    email: string;
    city: string;
    state: string;
    rating: number;
    status: "active" | "inactive";
}

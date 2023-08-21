export interface User {
    id?: number;
    email: string;
    company: Company;
    deleted: boolean;
}

export interface Company {
    id: number;
    name: string;
}
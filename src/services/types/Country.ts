export interface CountryAPI {
    id: number;
    attributes: {
        name: string;
        createdAt: Date | string;
        updatedAt: Date | string;
    }
}
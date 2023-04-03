export interface CustomerAPI {
    id: number;
    attributes: {
        name: string;
        middleName: string | null;
        lastName: string | null;
        shortName: string | null;
        mappingId: string | null;
        createdAt: Date | string;
        updatedAt: Date | string;
    }
}
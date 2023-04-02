import { Country } from '~/types';
import { Group, Manager, LicenseType } from '~/modules/customers/types';
export interface Customer {
    id: number;
    name: string;
    middleName: string;
    lastName: string;
    shortName: string;
    countryId: number;
    country: Country;
    groupId: number;
    group: Group;
    managerRelationshipId: number;
    managerRelationship: Manager;
    licenseTypeId: number;
    licenseType: LicenseType;
    mappingId: string;
    status: string;
}

export interface NewCustomer {
    name?: string;
    middleName?: string;
    lastName: string;
    shortName?: string;
    countryId: number;
    groupId: number;
    managerRelationshipId: number;
    licenseTypeId: number;
    mappingId: string;
}

export interface EditCustomer {
    id: number;
    name: string;
}
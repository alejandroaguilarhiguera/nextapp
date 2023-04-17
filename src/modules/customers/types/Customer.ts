import { Country } from 'types';
import { Group, LicenseType, Manager } from '~/modules/customers/types';

export interface Customer {
  id: number;
  name: string;
  middleName: string | null;
  lastName: string | null;
  shortName: string | null;
  countryId?: number | null;
  country?: Country;
  groupId: number;
  group: Group;
  managerRelationshipId: number;
  managerRelationship: Manager;
  licenseTypeId: number;
  licenseType: LicenseType;
  mappingId: string | null;
  status: string;
}

export interface NewCustomer {
  name?: string;
  countryId?: number;
  middleName?: string;
  lastName: string;
  shortName?: string;
  groupId: number;
  managerRelationshipId: number;
  licenseTypeId: number;
  mappingId: string;
}

export interface EditCustomer {
  id: number;
  name: string;
  countryId?: number | null;
}

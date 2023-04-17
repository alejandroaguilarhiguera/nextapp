import { CountryAPI } from '~/services/types';

export interface CustomerAPI {
  id: number;
  attributes: {
    name: string;
    middleName: string | null;
    lastName: string | null;
    shortName: string | null;
    mappingId: string | null;
    countryId: number;
    country: { data: CountryAPI };
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

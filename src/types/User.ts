import { Role } from 'types';

export interface User {
  id: number;
  name: string;
  lastname: string;
  username: string | null;
  email: string;
  provider: 'local';
  confirmed: true;
  blocked: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  role?: Role;
}

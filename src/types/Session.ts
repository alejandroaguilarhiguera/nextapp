import { User } from 'types';

export interface Session {
  jwt: string;
  user: User;
}

export interface Session {
  jwt: string;
  user: {
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
  };
}

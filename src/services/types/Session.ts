export interface SessionAPI {
  jwt: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    blocked: boolean;
    provider: 'local';
    confirmed: true;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}

export interface PayloadError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: { [key: string]: string | number | boolean };
  };
}

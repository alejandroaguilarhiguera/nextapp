export interface ValidationError {
  message: string;
  field: string;
  value: string;
}
export interface ErrorRequest {
  message: string;
  status?: number;
  validationErrors?: ValidationError[];
}

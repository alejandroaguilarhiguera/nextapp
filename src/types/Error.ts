export interface ValidationError {
    message: string;
    field: string;
    value: string;
}
export interface ErrorRequest {
  message: string;
  validationCode?: 422;
  validationErrors?: ValidationError[];
}
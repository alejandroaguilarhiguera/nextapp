export interface Payload<T> {
  data: T;
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

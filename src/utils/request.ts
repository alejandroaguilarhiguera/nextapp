import { AxiosRequestConfig } from 'axios';

import axios from '~/utils/axios';

export default async function request<Type>(options: AxiosRequestConfig): Promise<Type> {
  const { data } = await axios<Type>(options);
  return data;
}

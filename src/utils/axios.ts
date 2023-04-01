import axios from 'axios';

// export let store: RootStore;

// export const injectStore = (_store: RootStore): void => {
//   store = _store;
// };

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
axiosInstance.interceptors.request.use(
  async (config) => {
    // const { auth } = store.getState();
    // TODO: add configuration accessToken
    // if (auth.accessToken !== null) {
    //   config.headers = {
    //     Authorization: `Bearer ${auth.accessToken}`
    //   };
    // } else {
    //   delete config?.headers?.Authorization;
    // }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;

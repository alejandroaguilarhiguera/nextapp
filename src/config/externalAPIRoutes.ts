export const EXTERNAL_API_AUTH_LOGIN = {
  path: '/auth/local',
  method: 'post',
};

export const EXTERNAL_API_ME = {
  path: '/users/me?populate=role',
  method: 'get',
};

export const API_REQUEST_GET_CUSTOMERS = {
  path: '/customers',
  method: 'get',
};

export const API_REQUEST_SHOW_CUSTOMERS = {
  path: '/customers/:id',
  method: 'get',
};

export const API_REQUEST_ADD_CUSTOMERS = {
  path: '/customers',
  method: 'post',
};

export const API_REQUEST_EDIT_CUSTOMERS = {
  path: '/customers/:id',
  method: 'put',
};

export const API_REQUEST_DELETE_CUSTOMERS = {
  path: '/customers/:id',
  method: 'delete',
};

import { useEffect } from 'react';
import { mutate } from 'swr';

import setSession from '~/utils/setSession';

export const useSession = () => {
  function logout() {
    mutate('session', null, false);
    setSession(null);
  }
  return {
    logout,
  };
};

export default useSession;

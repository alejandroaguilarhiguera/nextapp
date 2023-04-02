import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import getSession from '~/utils/getSession';

export const useAsyncCache = () => {
    const { mutate }  = useSWRConfig();
    useEffect(() => {
      if (!window) return;
      const session = getSession();
      mutate('session', session, false);
      
    }, [mutate]);
    return {}
}

export default useAsyncCache;
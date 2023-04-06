import { Session } from '~/types';

export default function setSession(session: Session | null): void {
  const sessionString = session === null ? '{}' : JSON.stringify(session);
  localStorage.setItem('session', sessionString);
}

import { Session } from '~/types';

export default function getSession(): Session {
    return JSON.parse(localStorage.getItem('session') ?? '{}') as Session;
}
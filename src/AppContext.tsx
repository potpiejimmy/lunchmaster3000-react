import { createContext } from 'react';
import LmApi from './api/LmApi';

interface AppContextType {
    api: LmApi,
    loading: boolean, setLoading: any,
    agreeTerms: boolean, setAgreeTerms: any,
    agreePrivacy: boolean, setAgreePrivacy: any,
    community: any, setCommunity: any
    name: string, setName: any
}

const AppContext = createContext<AppContextType|null>(null);

export default AppContext;

import { createContext } from 'react';
import LmApi from './api/LmApi';

interface AppContextType {
    api: LmApi,
    loading: boolean, setLoading: any,
    title: string, setTitle: any
    agreeTerms: boolean, setAgreeTerms: any,
    agreePrivacy: boolean, setAgreePrivacy: any
}

const AppContext = createContext<AppContextType|null>(null);

export default AppContext;

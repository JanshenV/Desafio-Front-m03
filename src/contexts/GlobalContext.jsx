import { createContext } from 'react';
import useGlobalProvider from '../hooks/useGlobalProvider';

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const globalProvider = useGlobalProvider();
    return (
        <GlobalContext.Provider value={globalProvider}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContext;
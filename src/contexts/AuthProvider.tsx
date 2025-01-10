import { useContext, createContext, useState } from "react";
import { redirect } from 'next/navigation'
import { useAppKit } from "@reown/appkit/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(true)
    const { close } = useAppKit();

    const createNewUserSession = (walletData) => {
        setUser(walletData.address);
        setIsLogged(true)
        close();
        redirect('/home')
    }

    return <AuthContext.Provider value={{user, createNewUserSession, isLogged}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
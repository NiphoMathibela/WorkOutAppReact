import { useRouter } from "expo-router";
import { createContext, useState } from "react";

//Create Auth Context
export const AuthContext = createContext();

//Create Auth Provider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    //Define expo router
    const router = useRouter();

    const login = (email, password) => {
        //Implement login logic here
        setIsLoggedIn(true);
        router.replace('/');

    };

    const logout = () => {
        //Implement logout logic here
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
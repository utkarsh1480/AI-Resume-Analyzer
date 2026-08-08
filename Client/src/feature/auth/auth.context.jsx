import { createContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{

    const [user, Setuser] = useState(null);
    const [isLoading, SetisLoading] = useState(true);
     
    return (
        <AuthContext.Provider value={{user, Setuser, isLoading, SetisLoading} }>
            {children}
        </AuthContext.Provider>
    )
}

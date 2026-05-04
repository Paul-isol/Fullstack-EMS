import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const refreshSession = async () => {
        try {
            setLoading(true);
            // We don't need to send the token! Axios sends the cookie automatically.
            const response = await api.get("/auth/session");
            if(!response){
                setUser(null);
                setLoading(false);
                return;
            }
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshSession();
    }, []);

    const login = async (email, password, role_type) => {
        const {data} = await api.post("/auth/login",{email,password,role_type});
        setUser(data.user);
        return data.user.role_type;
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
        refreshSession
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};
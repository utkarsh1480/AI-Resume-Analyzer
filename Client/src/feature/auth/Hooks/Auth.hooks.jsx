import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    const { user, Setuser, isLoading, SetisLoading } = context;

    async function handlelogin({ email, password }) {
        SetisLoading(true);

        try {
            const data = await login({ email, password });

            if (data?.success && data?.user) {
                Setuser(data.user);
                return data;
            }
            throw new Error(data?.message || "Login failed");
        } catch (error) {
            console.error(error);
            Setuser(null);
            throw error;
        } finally {
            SetisLoading(false);
        }
    }

    async function handleregister({
        Username,
        email,
        password,
    }) {
        SetisLoading(true);

        try {
            const data = await register({
                Username,
                email,
                password,
            });

            if (data?.success && data?.user) {
                Setuser(data.user);
                return data;
            }

            throw new Error(data?.message || "Registration failed");
        } catch (err) {
            console.error(err);
            Setuser(null);
            throw err;
        } finally {
            SetisLoading(false);
        }
    }

    async function handlelogout() {
        SetisLoading(true);

        try {
            await logout();
            Setuser(null);
        } catch (err) {
            console.log(err);
        } finally {
            SetisLoading(false);
        }
    }
   
    useEffect(() => {
        let isMounted = true;

        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                if (isMounted) {
                    Setuser(data?.user ?? null);
                }
            } catch (error) {
                if (isMounted) {
                    Setuser(null);
                }
            } finally {
                if (isMounted) {
                    SetisLoading(false);
                }
            }
        };

        getAndSetUser();

        return () => {
            isMounted = false;
        };
    }, [SetisLoading, Setuser]);

    return {
        user,
        isLoading,
        handlelogin,
        handleregister,
        handlelogout,
    };
};
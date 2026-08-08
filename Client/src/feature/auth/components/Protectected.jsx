import { useEffect } from "react";
import { useAuth } from "../Hooks/auth.hooks.jsx";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login', { replace: true });
        }
    }, [isLoading, user, navigate]);

    if (isLoading) {
        return (
            <div><h1>Loading.........</h1></div>
        );
    }

    if (!user) {
        return null;
    }

    return children;
};

export default Protected;

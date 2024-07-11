import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";

export const PrivateRoutes = (props) => {
    const user = useUser(); // Assuming user authentication logic goes here

    if (!user) return <Navigate to="/login" />

    return <Outlet {...props} />;

};
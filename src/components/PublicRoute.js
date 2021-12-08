import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
	const { currentuser } = useAuth();
	return !currentuser ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;

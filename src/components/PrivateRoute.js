import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
	const { currentuser } = useAuth();

	return currentuser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

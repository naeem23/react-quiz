import React from "react";
import classes from "../styles/Account.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Account = () => {
	const { currentuser, logout } = useAuth();
	return (
		<div className={classes.account}>
			{currentuser ? (
				<>
					<span className="material-icons-outlined" title="Account">
						account_circle
					</span>
					<span>{currentuser.displayName}</span>
					<span
						className="material-icons-outlined"
						title="Logout"
						onClick={logout}
					>
						{" "}
						logout{" "}
					</span>
				</>
			) : (
				<>
					<Link to="/signup">Signup</Link>
					<Link to="/Login">Login</Link>
				</>
			)}
		</div>
	);
};

export default Account;

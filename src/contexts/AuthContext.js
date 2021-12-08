import React, { useContext, useState, useEffect } from "react";
import "../firebase";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [loading, setloading] = useState(true);
	const [currentuser, setcurrentuser] = useState();

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setcurrentuser(user);
			setloading(false);
		});
		return unsubscribe;
	}, []);

	// singup function
	async function signup(email, password, username) {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password);

		// update userprofile
		await updateProfile(auth.currentUser, {
			displayName: username,
		});
		const user = auth.currentUser;
		setcurrentuser({
			...user,
		});
	}

	// login function
	function login(email, password) {
		const auth = getAuth();
		return signInWithEmailAndPassword(auth, email, password);
	}

	// logout function
	function logout() {
		const auth = getAuth();
		return signOut(auth);
	}

	const value = {
		currentuser,
		signup,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

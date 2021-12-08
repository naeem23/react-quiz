import React, { useState } from "react";
import Illustration from "../Illustration";
import Form from "../Form";
import TextInput from "../TextInput";
import CheckBox from "../CheckBox";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agree, setAgree] = useState("");

	const [error, setError] = useState();
	const [loading, setLoading] = useState();
	const { signup } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		if (password !== confirmPassword) {
			return setError("Password don't match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(email, password, username);
			navigate("/");
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError("Falid to create account!");
		}
	}

	return (
		<>
			<h1>Create an account</h1>
			<div className="column">
				<Illustration />
				<Form style={{ height: "500px" }} onSubmit={handleSubmit}>
					<TextInput
						type="text"
						placeholder="Enter name"
						icon="person"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<TextInput
						type="text"
						placeholder="Enter email"
						icon="alternate_email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextInput
						type="password"
						placeholder="Enter password"
						required
						icon="lock"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<TextInput
						type="password"
						placeholder="Confirm password"
						required
						icon="lock_clock"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<CheckBox
						label="I agree to the Terms &amp; Conditions"
						value={agree}
						onChange={(e) => setAgree(e.target.value)}
						required
					/>

					<Button type="submit" disabled={loading}>
						<span>Submit now</span>
					</Button>

					{error && <p className="error">{error}</p>}

					<div className="info">
						Already have an account? <Link to="/login">Login</Link>{" "}
						instead.
					</div>
				</Form>
			</div>
		</>
	);
};

export default Signup;

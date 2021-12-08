import React, { useState } from "react";
import Illustration from "../Illustration";
import Form from "../Form";
import TextInput from "../TextInput";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState();
	const [loading, setLoading] = useState();

	const { login } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate("/");
		} catch (error) {
			console.log(error);
			setError("Failed to login!");
			setLoading(false);
		}
	}

	return (
		<>
			<h1>Login to your account</h1>
			<div className="column">
				<Illustration />
				<Form style={{ height: "330px" }} onSubmit={handleSubmit}>
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
						icon="lock"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button type="submit" disabled={loading}>
						<span>Submit Now</span>
					</Button>

					{error && <p className="error">{error}</p>}

					<div className="info">
						Don't have an account? <Link to="/signup">Signup</Link>{" "}
						instead.
					</div>
				</Form>
			</div>
		</>
	);
};

export default Login;

import React, { useState } from "react";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const handleLogin = async () => {
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: username.trim(), password }),
			});

			const result = await response.json();

			if (result.success) {
				localStorage.setItem("username", result.username);
				window.location.href = "parking.html"; // or use navigate if using React Router
			} else {
				setErrorMsg(result.message || "Login failed");
			}
		} catch (err) {
			setErrorMsg("An error occurred. Please try again.");
		}
	};

	return (
		<div style={styles.body}>
			<div style={styles.loginBox}>
				<h2>Login</h2>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					style={styles.input}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={styles.input}
				/>
				<button onClick={handleLogin} style={styles.button}>
					Login
				</button>
				{errorMsg && <div style={styles.error}>{errorMsg}</div>}
			</div>
		</div>
	);
};

const styles = {
	body: {
		background: "#2c3e50",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		fontFamily: "Arial, sans-serif",
	},
	loginBox: {
		background: "white",
		padding: "30px",
		borderRadius: "10px",
		width: "300px",
		boxShadow: "0 0 10px rgba(0,0,0,0.3)",
	},
	input: {
		width: "100%",
		padding: "10px",
		margin: "10px 0",
		boxSizing: "border-box",
	},
	button: {
		width: "100%",
		padding: "10px",
		background: "#3498db",
		color: "white",
		border: "none",
		cursor: "pointer",
	},
	error: {
		color: "red",
		textAlign: "center",
		marginTop: "10px",
	},
};

export default LoginPage;

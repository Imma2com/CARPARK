import React, { useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Paper,
	TextField,
	Typography,
	Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const validate = () => {
		const newErrors = {};
		if (!formData.email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Invalid email address";

		if (!formData.password) newErrors.password = "Password is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validate()) return;

		// Simple admin check
		if (formData.email === "admin@demo.com" && formData.password === "admin") {
			navigate("/Home");
		} else {
			setErrors({ password: "Invalid username or password" });
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#001e3c",
				p: 2,
			}}>
			<Paper
				elevation={3}
				sx={{
					maxWidth: 400,
					width: "100%",
					p: 4,
					borderRadius: 2,
					backgroundColor: "#f9f9f9",
					boxShadow: "none",
				}}>
				<Typography
					variant="h4"
					textAlign="center"
					mb={3}
					sx={{ color: "#003366" }}>
					Login
				</Typography>

				<form onSubmit={handleSubmit} noValidate>
					<TextField
						fullWidth
						label="Username"
						name="email"
						type="text"
						margin="normal"
						value={formData.email}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
						required
					/>
					<TextField
						fullWidth
						label="Password"
						name="password"
						type="password"
						margin="normal"
						value={formData.password}
						onChange={handleChange}
						error={!!errors.password}
						helperText={errors.password}
						required
					/>

					<FormControlLabel
						control={
							<Checkbox
								name="remember"
								checked={formData.remember}
								onChange={handleChange}
								sx={{ color: "#003366" }}
							/>
						}
						label="Remember Me"
					/>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mt: 2,
							mb: 1,
						}}>
						<Link
							href="#"
							underline="hover"
							sx={{ fontSize: 14, color: "#003366" }}>
							Forgot Password?
						</Link>

						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: "#003366",
								"&:hover": { backgroundColor: "#002244" },
							}}>
							Login
						</Button>
					</Box>
				</form>
			</Paper>
		</Box>
	);
}

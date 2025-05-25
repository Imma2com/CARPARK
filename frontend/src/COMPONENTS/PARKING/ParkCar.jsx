import React, { useState, useEffect } from "react";
import {
	Box,
	Grid,
	TextField,
	Button,
	Typography,
	Paper,
	MenuItem,
	CircularProgress,
} from "@mui/material";

export default function ParkCar() {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(true);

	const [formData, setFormData] = useState({
		vehicleType: "",
		plateNumber: "",
		ownerName: "",
		contact: "",
		description: "",
	});

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/vehicles");
				const data = await res.json();
				setVehicles(data);
			} catch (err) {
				console.error("Error fetching vehicles:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "plateNumber") {
			// Auto-fill fields based on selected plate number
			const selected = vehicles.find((v) => v.vehicleNumber === value);
			if (selected) {
				setFormData({
					vehicleType: selected.vehicleType || "",
					plateNumber: selected.vehicleNumber || "",
					ownerName: selected.ownerName || "",
					contact: selected.contact || "",
					description: selected.description || "",
				});
			} else {
				// If vehicle not found (maybe deselected), reset
				setFormData((prev) => ({
					...prev,
					plateNumber: value,
				}));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleClear = () => {
		setFormData({
			vehicleType: "",
			plateNumber: "",
			ownerName: "",
			contact: "",
			description: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:5000/api/parking/park", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (res.ok) {
				alert("Your succefull parked car");
				handleClear();
			} else {
				console.error("Failed to park car:", data.message || data.error);
			}
		} catch (err) {
			console.error("Network/server error:", err);
		}
	};

	return (
		<Box sx={{ width: "100%", p: 3 }}>
			<Typography variant="h5" mb={3} sx={{ color: "#003366" }}>
				Park a Car
			</Typography>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
					<CircularProgress sx={{ color: "#003366" }} />
				</Box>
			) : (
				<Paper
					component="form"
					onSubmit={handleSubmit}
					sx={{
						p: 3,
						border: "1px solid #ccc",
						borderRadius: 2,
						boxShadow: "none",
						backgroundColor: "#f9f9f9",
					}}>
					<Grid container spacing={2} mb={2}>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								select
								fullWidth
								label="Plate Number"
								name="plateNumber"
								value={formData.plateNumber}
								onChange={handleChange}
								required>
								{vehicles.map((v) => (
									<MenuItem key={v._id} value={v.vehicleNumber}>
										{v.vehicleNumber}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								fullWidth
								label="Vehicle Type"
								name="vehicleType"
								value={formData.vehicleType}
								onChange={handleChange}
								required
								disabled
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								fullWidth
								label="Owner Name"
								name="ownerName"
								value={formData.ownerName}
								onChange={handleChange}
								required
								disabled
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								fullWidth
								label="Contact"
								name="contact"
								value={formData.contact}
								onChange={handleChange}
								required
								disabled
							/>
						</Grid>
					</Grid>

					<Box mb={3}>
						<TextField
							fullWidth
							multiline
							rows={4}
							label="Description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							disabled
						/>
					</Box>

					<Grid container justifyContent="space-between">
						<Grid item>
							<Button
								variant="outlined"
								onClick={handleClear}
								sx={{ color: "#003366", borderColor: "#003366" }}>
								Clear
							</Button>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								variant="contained"
								sx={{
									backgroundColor: "#003366",
									"&:hover": { backgroundColor: "#002244" },
								}}>
								Park Car
							</Button>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Box>
	);
}

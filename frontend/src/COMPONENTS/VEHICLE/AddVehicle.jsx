import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography, Paper } from "@mui/material";

export default function AddVehicle() {
	const [formData, setFormData] = useState({
		vehicleNumber: "",
		vehicleType: "",
		ownerName: "",
		contact: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClear = () => {
		setFormData({
			vehicleNumber: "",
			vehicleType: "",
			ownerName: "",
			contact: "",
			description: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:5000/api/vehicles", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				handleClear();
				alert("Vehicle added successfully!");
			} else {
				const err = await res.json();
				alert("Failed to add vehicle: " + err.message);
			}
		} catch (error) {
			console.error("Error submitting vehicle:", error);
			alert("Error submitting vehicle");
		}
	};

	return (
		<Box sx={{ width: "100%", p: 3 }}>
			<Typography variant="h5" mb={3} color="primary">
				Add Vehicle
			</Typography>

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
				{/* Top row: 4 columns */}
				<Grid container spacing={2} mb={2}>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							fullWidth
							label="Vehicle Number"
							name="vehicleNumber"
							value={formData.vehicleNumber}
							onChange={handleChange}
							required
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<TextField
							fullWidth
							label="Vehicle Type"
							name="vehicleType"
							value={formData.vehicleType}
							onChange={handleChange}
							required
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
						/>
					</Grid>
				</Grid>

				{/* Description full width */}
				<Box mb={3}>
					<TextField
						fullWidth
						multiline
						rows={4}
						label="Description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</Box>

				{/* Buttons aligned left and right */}
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
							Save
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

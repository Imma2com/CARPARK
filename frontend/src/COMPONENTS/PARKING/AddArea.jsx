// import React, { useState } from "react";
// import { Box, Grid, TextField, Button, Typography, Paper } from "@mui/material";

// export default function AddArea() {
// 	const [formData, setFormData] = useState({
// 		areaName: "",
// 		capacity: "",
// 		description: "",
// 	});

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleClear = () => {
// 		setFormData({ areaName: "", capacity: "", description: "" });
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log("Submitted:", formData);
// 		// Submit logic here
// 	};

// 	return (
// 		<Box sx={{ width: "100%", p: 3 }}>
// 			<Typography variant="h5" mb={3}>
// 				Add Parking Area
// 			</Typography>

// 			<Paper
// 				component="form"
// 				onSubmit={handleSubmit}
// 				sx={{
// 					p: 3,
// 					border: "1px solid #ccc",
// 					borderRadius: 2,
// 					boxShadow: "none",
// 					backgroundColor: "#f9f9f9",
// 				}}>
// 				{/* Top two fields in two columns */}
// 				<Grid container spacing={2} mb={2}>
// 					<Grid item xs={12} md={6}>
// 						<TextField
// 							fullWidth
// 							label="Area Name"
// 							name="areaName"
// 							value={formData.areaName}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</Grid>
// 					<Grid item xs={12} md={6}>
// 						<TextField
// 							fullWidth
// 							label="Capacity"
// 							name="capacity"
// 							type="number"
// 							value={formData.capacity}
// 							onChange={handleChange}
// 							required
// 						/>
// 					</Grid>
// 				</Grid>

// 				{/* Description field full-width */}
// 				<Box mb={3}>
// 					<TextField
// 						fullWidth
// 						multiline
// 						rows={4}
// 						label="Description"
// 						name="description"
// 						value={formData.description}
// 						onChange={handleChange}
// 					/>
// 				</Box>

// 				{/* Buttons aligned left and right */}
// 				<Grid container justifyContent="space-between">
// 					<Grid item>
// 						<Button
// 							variant="outlined"
// 							onClick={handleClear}
// 							sx={{ color: "#003366", borderColor: "#003366" }}>
// 							Clear
// 						</Button>
// 					</Grid>
// 					<Grid item>
// 						<Button
// 							type="submit"
// 							variant="contained"
// 							sx={{
// 								backgroundColor: "#003366",
// 								"&:hover": {
// 									backgroundColor: "#002244",
// 								},
// 							}}>
// 							Save
// 						</Button>
// 					</Grid>
// 				</Grid>
// 			</Paper>
// 		</Box>
// 	);
// }

import React, { useState } from "react";
import {
	Box,
	Grid,
	TextField,
	Button,
	Typography,
	Paper,
	Snackbar,
	Alert,
} from "@mui/material";

export default function AddArea() {
	const [formData, setFormData] = useState({
		areaName: "",
		capacity: "",
		description: "",
	});

	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClear = () => {
		setFormData({ areaName: "", capacity: "", description: "" });
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("http://localhost:5000/api/park-areas", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to save parking area");
			}

			const data = await response.json();
			setSnackbar({
				open: true,
				message: "Parking area saved successfully!",
				severity: "success",
			});
			handleClear();
		} catch (error) {
			setSnackbar({ open: true, message: error.message, severity: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ width: "100%", p: 3 }}>
			<Typography variant="h5" mb={3}>
				Add Parking Area
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
				<Grid container spacing={2} mb={2}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="Area Name"
							name="areaName"
							value={formData.areaName}
							onChange={handleChange}
							required
							disabled={loading}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="Capacity"
							name="capacity"
							type="number"
							value={formData.capacity}
							onChange={handleChange}
							required
							disabled={loading}
							inputProps={{ min: 1 }}
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
						disabled={loading}
					/>
				</Box>

				<Grid container justifyContent="space-between">
					<Grid item>
						<Button
							variant="outlined"
							onClick={handleClear}
							sx={{ color: "#003366", borderColor: "#003366" }}
							disabled={loading}>
							Clear
						</Button>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: "#003366",
								"&:hover": {
									backgroundColor: "#002244",
								},
							}}
							disabled={loading}>
							{loading ? "Saving..." : "Save"}
						</Button>
					</Grid>
				</Grid>
			</Paper>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

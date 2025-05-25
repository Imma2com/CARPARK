// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";

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
// 		// add actual submission logic
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
// 					backgroundColor: "#f5f7fa",
// 				}}>
// 				{/* Top Fields: Stacked full-width */}
// 				<Box mb={2}>
// 					<TextField
// 						fullWidth
// 						label="Area Name"
// 						name="areaName"
// 						value={formData.areaName}
// 						onChange={handleChange}
// 						required
// 					/>
// 				</Box>

// 				<Box mb={2}>
// 					<TextField
// 						fullWidth
// 						label="Capacity"
// 						name="capacity"
// 						type="number"
// 						value={formData.capacity}
// 						onChange={handleChange}
// 						required
// 					/>
// 				</Box>

// 				{/* Description */}
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

// 				{/* Buttons: Left and Right aligned */}
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
import { Box, Grid, TextField, Button, Typography, Paper } from "@mui/material";

export default function AddArea() {
	const [formData, setFormData] = useState({
		areaName: "",
		capacity: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClear = () => {
		setFormData({ areaName: "", capacity: "", description: "" });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitted:", formData);
		// Submit logic here
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
				{/* Top two fields in two columns */}
				<Grid container spacing={2} mb={2}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="Area Name"
							name="areaName"
							value={formData.areaName}
							onChange={handleChange}
							required
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
						/>
					</Grid>
				</Grid>

				{/* Description field full-width */}
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
								"&:hover": {
									backgroundColor: "#002244",
								},
							}}>
							Save
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}

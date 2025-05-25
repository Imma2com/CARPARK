import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Paper,
	Box,
	CircularProgress,
	Typography,
} from "@mui/material";

export default function ParkedCars() {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [page, setPage] = useState(0);
	const rowsPerPage = 5;

	const fetchParkedCars = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"http://localhost:5000/api/parking/parked-cars"
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setCars(data);
		} catch (err) {
			setError(err.message || "Failed to fetch parked cars");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchParkedCars();
	}, []);

	const handleChangePage = (event, newPage) => setPage(newPage);

	if (loading) {
		return (
			<Box p={2} textAlign="center">
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box p={2} textAlign="center">
				<Typography color="error">{error}</Typography>
			</Box>
		);
	}

	return (
		<Box p={2} sx={{ width: "100%" }}>
			<TableContainer
				component={Paper}
				sx={{
					width: "100%",
					overflowX: "auto",
					border: "1px solid #003366",
					boxShadow: "none",
					borderRadius: 2,
				}}>
				<Table sx={{ minWidth: 600 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#003366" }}>
							<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
								ID
							</TableCell>
							<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
								Plate Number
							</TableCell>
							<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
								Owner
							</TableCell>
							<TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
								Parked Time
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cars
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((car, i) => (
								<TableRow key={i} hover>
									<TableCell>{i + 1}</TableCell>
									<TableCell>{car.plateNumber}</TableCell>
									<TableCell>{car.ownerName}</TableCell>
									<TableCell>
										{new Date(car.parkedAt).toLocaleString()}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={cars.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[]}
					sx={{
						"& .MuiTablePagination-toolbar": {
							bgcolor: "#f0f0f0",
							borderTop: "1px solid #003366",
							color: "#003366",
						},
						"& .MuiTablePagination-actions button": {
							color: "#003366",
						},
					}}
				/>
			</TableContainer>
		</Box>
	);
}

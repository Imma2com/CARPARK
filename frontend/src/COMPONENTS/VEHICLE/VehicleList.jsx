import React, { useState, useEffect } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Paper,
	Typography,
	CircularProgress,
} from "@mui/material";

const columns = [
	{ id: "vehicleType", label: "Vehicle Type", minWidth: 100 },
	{ id: "vehicleNumber", label: "Vehicle No.", minWidth: 120 },
	{ id: "ownerName", label: "Owner", minWidth: 150 },
	{ id: "contact", label: "Contact", minWidth: 150 },
	{ id: "description", label: "Description", minWidth: 200 },
];

export default function VehicleList() {
	const [vehicles, setVehicles] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [loading, setLoading] = useState(true);

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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Box sx={{ width: "100%", p: 3 }}>
			<Typography variant="h5" mb={3} sx={{ color: "#003366" }}>
				Vehicle List
			</Typography>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
					<CircularProgress sx={{ color: "#003366" }} />
				</Box>
			) : (
				<Paper
					sx={{
						width: "100%",
						overflow: "hidden",
						border: "1px solid #ccc",
						boxShadow: "none",
						bgcolor: "#fafafa",
					}}>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table
							stickyHeader
							aria-label="vehicle list table"
							sx={{ minWidth: 650 }}>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											sx={{
												fontWeight: "bold",
												backgroundColor: "#003366",
												color: "white",
												minWidth: column.minWidth,
											}}>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{vehicles
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, idx) => (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row._id || idx}>
											{columns.map((column) => (
												<TableCell
													key={column.id}
													sx={{ whiteSpace: "nowrap" }}>
													{row[column.id]}
												</TableCell>
											))}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						sx={{
							".MuiTablePagination-toolbar": {
								bgcolor: "#e3eaf6",
							},
						}}
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={vehicles.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage="Rows per page:"
					/>
				</Paper>
			)}
		</Box>
	);
}

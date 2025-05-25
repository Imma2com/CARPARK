import React, { useEffect, useState } from "react";
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Typography,
} from "@mui/material";
import axios from "axios";

function ParkArea() {
	const [areas, setAreas] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		const fetchAreas = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/park-areas");
				setAreas(res.data); // assuming API returns an array of park areas
			} catch (err) {
				console.error("Error fetching park areas:", err);
			}
		};

		fetchAreas();
	}, []);

	const handleChangePage = (event, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Box sx={{ p: 3, width: "100%" }}>
			<Typography variant="h5" mb={2} sx={{ color: "#003366" }}>
				Parking Areas
			</Typography>

			<Paper
				sx={{
					width: "100%",
					overflow: "hidden",
					border: "1px solid #ccc",
					boxShadow: "none",
					borderRadius: 2,
					backgroundColor: "#fafafa",
				}}>
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#f0f0f0" }}>
								<TableCell sx={{ fontWeight: "bold", color: "#222" }}>
									ID
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", color: "#222" }}>
									Area Name
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", color: "#222" }}>
									Capacity
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", color: "#222" }}>
									Description
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{areas
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((area, index) => (
									<TableRow key={area._id || index} hover>
										<TableCell>{page * rowsPerPage + index + 1}</TableCell>
										<TableCell>{area.areaName}</TableCell>
										<TableCell>{area.capacity}</TableCell>
										<TableCell>{area.description}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[5, 10, 15]}
					component="div"
					count={areas.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{
						"& .MuiTablePagination-toolbar": {
							bgcolor: "#fafafa",
							borderTop: "1px solid #ccc",
							color: "#003366",
						},
						"& .MuiTablePagination-actions button": {
							color: "#003366",
						},
					}}
				/>
			</Paper>
		</Box>
	);
}

export default ParkArea;

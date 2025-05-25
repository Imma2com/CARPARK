import React, { useState } from "react";
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
} from "@mui/material";

const sampleData = [
	{ id: 1, plate: "ABC-1234", owner: "John Doe", time: "10:30 AM" },
	{ id: 2, plate: "XYZ-5678", owner: "Jane Smith", time: "11:15 AM" },
	{ id: 3, plate: "LMN-4321", owner: "Alice Green", time: "12:00 PM" },
	{ id: 4, plate: "QWE-9876", owner: "Bob Brown", time: "1:20 PM" },
	{ id: 5, plate: "TYU-1233", owner: "Sara Connor", time: "2:45 PM" },
	{ id: 6, plate: "POI-7890", owner: "Mike Ross", time: "3:00 PM" },
	{ id: 7, plate: "ZXC-4567", owner: "Harvey Specter", time: "3:30 PM" },
];

export default function ParkedCars() {
	const [page, setPage] = useState(0);
	const rowsPerPage = 5;

	const handleChangePage = (event, newPage) => setPage(newPage);

	return (
		<Box p={2} sx={{ width: "100%" }}>
			<TableContainer
				component={Paper}
				sx={{
					width: "100%",
					overflowX: "auto",
					border: "1px solid #003366", // dark blue border
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
						{sampleData
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((car) => (
								<TableRow key={car.id} hover>
									<TableCell>{car.id}</TableCell>
									<TableCell>{car.plate}</TableCell>
									<TableCell>{car.owner}</TableCell>
									<TableCell>{car.time}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={sampleData.length}
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

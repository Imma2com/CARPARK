import React, { useState } from "react";
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
} from "@mui/material";

const columns = [
	{ id: "type", label: "Vehicle Type", minWidth: 100 },
	{ id: "number", label: "Vehicle No.", minWidth: 120 },
	{ id: "owner", label: "Owner", minWidth: 150 },
	{ id: "contact", label: "Contact", minWidth: 150 },
	{ id: "description", label: "Description", minWidth: 200 },
];

const createData = (type, number, owner, contact, description) => {
	return { type, number, owner, contact, description };
};

const rows = [
	createData("Car", "ABC-1234", "John Doe", "1234567890", "Sedan"),
	createData("Motorcycle", "XYZ-5678", "Jane Smith", "0987654321", "Sportbike"),
	createData("Truck", "LMN-3456", "Alice Brown", "1112223333", "Pickup"),
	// Add more mock data as needed
];

export default function VehicleList() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

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
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, idx) => (
									<TableRow hover role="checkbox" tabIndex={-1} key={idx}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													sx={{ whiteSpace: "nowrap" }}>
													{value}
												</TableCell>
											);
										})}
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelRowsPerPage="Rows per page:"
				/>
			</Paper>
		</Box>
	);
}

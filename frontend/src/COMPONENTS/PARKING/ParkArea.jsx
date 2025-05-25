import React, { useState } from "react";
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

const mockData = Array.from({ length: 25 }).map((_, i) => ({
	id: i + 1,
	name: `Area ${i + 1}`,
	capacity: Math.floor(Math.random() * 100) + 10,
	description: `Description for Area ${i + 1}`,
}));

function ParkArea() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Box sx={{ p: 3, width: "100%" }}>
			<Typography variant="h5" mb={2}>
				Parking Areas
			</Typography>

			<Paper
				sx={{
					width: "100%",
					overflow: "hidden",
					border: "1px solid #ccc",
					boxShadow: "none",
				}}>
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Area Name</TableCell>
								<TableCell>Capacity</TableCell>
								<TableCell>Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{mockData
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow key={row.id} hover>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.capacity}</TableCell>
										<TableCell>{row.description}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[5, 10, 15]}
					component="div"
					count={mockData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

export default ParkArea;

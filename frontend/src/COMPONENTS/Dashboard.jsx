import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

// Fake chart data
const data = [
	{ name: "Mon", parked: 20 },
	{ name: "Tue", parked: 45 },
	{ name: "Wed", parked: 35 },
	{ name: "Thu", parked: 50 },
	{ name: "Fri", parked: 75 },
	{ name: "Sat", parked: 60 },
	{ name: "Sun", parked: 90 },
];

// Styled summary card
const SummaryCard = styled(Paper)(({ theme }) => ({
	backgroundColor: "#0b3558", // dark blue
	color: "#fff",
	padding: theme.spacing(3),
	textAlign: "center",
	height: "100%",
	borderRadius: 12,
}));

function Dashboard() {
	return (
		<Box sx={{ p: 3 }}>
			{/* Summary Cards */}
			<Grid container spacing={3}>
				{[
					{ title: "Total Parked Cars", value: 128 },
					{ title: "Available Slots", value: 72 },
					{ title: "Total Revenue", value: "$4,560" },
					{ title: "Parking Areas", value: 5 },
				].map((item, index) => (
					<Grid key={index} item xs={12} sm={6} md={3}>
						<SummaryCard elevation={4}>
							<Typography variant="subtitle1" gutterBottom>
								{item.title}
							</Typography>
							<Typography variant="h4" fontWeight="bold">
								{item.value}
							</Typography>
						</SummaryCard>
					</Grid>
				))}
			</Grid>

			{/* Spacer */}
			<Box my={4} />

			{/* Parking Activity Chart */}
			<Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
				<Typography variant="h6" mb={2}>
					Parking Activity (This Week)
				</Typography>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid stroke="#ccc" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="parked"
							stroke="#1976d2"
							strokeWidth={3}
						/>
					</LineChart>
				</ResponsiveContainer>
			</Paper>

			{/* Spacer */}
			<Box my={4} />

			{/* Recent Parked Cars Placeholder */}
			<Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
				<Typography variant="h6" mb={2}>
					Recent Parked Cars
				</Typography>
				<Box
					sx={{
						width: "100%",
						height: 200,
						backgroundColor: "#f5f5f5",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#888",
						fontStyle: "italic",
						borderRadius: 2,
					}}>
					[ Table coming soon... ]
				</Box>
			</Paper>
		</Box>
	);
}

export default Dashboard;

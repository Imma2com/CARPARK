import React from "react";
import { Box, Typography, Paper } from "@mui/material";
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
import ParkedCars from "./PARKING/ParkedCars";

// Sample data
const data = [
	{ name: "Mon", parked: 20 },
	{ name: "Tue", parked: 45 },
	{ name: "Wed", parked: 35 },
	{ name: "Thu", parked: 50 },
	{ name: "Fri", parked: 75 },
	{ name: "Sat", parked: 60 },
	{ name: "Sun", parked: 90 },
];

// Styled card
const SummaryCard = styled(Paper)(({ theme }) => ({
	backgroundColor: "#0b3558",
	color: "#fff",
	padding: theme.spacing(2),
	flex: "1 1 200px", // responsive grow
	borderRadius: 8,
	border: "1px solid #1e3a5f",
	boxShadow: "none",
	textAlign: "center",
	minWidth: 180,
}));

// Section box with light border
const Section = styled(Box)(({ theme }) => ({
	border: "1px solid #e0e0e0",
	borderRadius: 8,
	padding: theme.spacing(2),
	marginBottom: theme.spacing(4),
}));

function Dashboard() {
	const summaryItems = [
		{ title: "Total Parked Cars", value: 128 },
		{ title: "Available Slots", value: 72 },
		{ title: "Total Revenue", value: "$4,560" },
		{ title: "Parking Areas", value: 5 },
	];

	return (
		<Box sx={{ p: { xs: 2, md: 4 } }}>
			{/* Summary Cards */}
			<Box
				display="flex"
				flexWrap="wrap"
				gap={2}
				justifyContent="space-between"
				mb={4}>
				{summaryItems.map((item, index) => (
					<SummaryCard key={index}>
						<Typography variant="subtitle2" gutterBottom>
							{item.title}
						</Typography>
						<Typography variant="h5" fontWeight="bold">
							{item.value}
						</Typography>
					</SummaryCard>
				))}
			</Box>

			{/* Chart Section */}
			<Section>
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
			</Section>

			{/* Placeholder for Recent Parked Cars */}
			<Section>
				<Typography variant="h6" mb={2}>
					Recent Parked Cars
				</Typography>
				<Box
					sx={{
						width: "100%",
						backgroundColor: "#f9f9f9",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#999",
						fontStyle: "italic",
						borderRadius: 4,
					}}>
					<ParkedCars />
				</Box>
			</Section>
		</Box>
	);
}

export default Dashboard;

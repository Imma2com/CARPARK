import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

import TopBar from "./TopBar";

const drawerWidth = 260;

export default function Layout() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [openMenus, setOpenMenus] = useState({
		vehicle: false,
		settings: false,
	});

	const location = useLocation();

	const toggleMenu = (menu) => {
		setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const isActive = (path) => location.pathname.startsWith(path);

	const drawer = (
		<div style={{ height: "100%", backgroundColor: "#1565C0", color: "white" }}>
			<Toolbar />
			<Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

			<List component="nav" disablePadding>
				<ListItemButton
					component={Link}
					to="/dashboard"
					selected={isActive("/dashboard")}
					sx={{
						color: "white",
						"&.Mui-selected": {
							bgcolor: "#0D47A1",
						},
						"&:hover": {
							bgcolor: "#0D47A1",
						},
					}}>
					<ListItemText primary="Dashboard" />
				</ListItemButton>

				<ListItemButton
					component={Link}
					to="/parkcar"
					selected={isActive("/parkcar")}
					sx={{
						color: "white",
						"&.Mui-selected": {
							bgcolor: "#0D47A1",
						},
						"&:hover": {
							bgcolor: "#0D47A1",
						},
					}}>
					<ListItemText primary="Park Car" />
				</ListItemButton>

				{/* Vehicle submenu */}
				<ListItemButton
					onClick={() => toggleMenu("vehicle")}
					sx={{
						color: "white",
						justifyContent: "space-between",
						"&:hover": {
							bgcolor: "#0D47A1",
						},
					}}>
					<ListItemText primary="Vehicle" />
					{openMenus.vehicle ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openMenus.vehicle} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							component={Link}
							to="/vehicles/add"
							selected={isActive("/vehicles/add")}
							sx={{
								pl: 4,
								color: "white",
								"&.Mui-selected": {
									bgcolor: "#0D47A1",
								},
								"&:hover": {
									bgcolor: "#0D47A1",
								},
							}}>
							<ListItemText primary="Add Vehicle" />
						</ListItemButton>
						<ListItemButton
							component={Link}
							to="/vehicles/list"
							selected={isActive("/vehicles/list")}
							sx={{
								pl: 4,
								color: "white",
								"&.Mui-selected": {
									bgcolor: "#0D47A1",
								},
								"&:hover": {
									bgcolor: "#0D47A1",
								},
							}}>
							<ListItemText primary="Vehicle List" />
						</ListItemButton>
					</List>
				</Collapse>

				{/* Settings submenu */}
				<ListItemButton
					onClick={() => toggleMenu("settings")}
					sx={{
						color: "white",
						justifyContent: "space-between",
						"&:hover": {
							bgcolor: "#0D47A1",
						},
					}}>
					<ListItemText primary="Parking Settings" />
					{openMenus.settings ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openMenus.settings} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							component={Link}
							to="/settings/add-area"
							selected={isActive("/settings/add-area")}
							sx={{
								pl: 4,
								color: "white",
								"&.Mui-selected": {
									bgcolor: "#0D47A1",
								},
								"&:hover": {
									bgcolor: "#0D47A1",
								},
							}}>
							<ListItemText primary="Add Parking Area" />
						</ListItemButton>
						<ListItemButton
							component={Link}
							to="/settings/park-area"
							selected={isActive("/settings/park-area")}
							sx={{
								pl: 4,
								color: "white",
								"&.Mui-selected": {
									bgcolor: "#0D47A1",
								},
								"&:hover": {
									bgcolor: "#0D47A1",
								},
							}}>
							<ListItemText primary="Park Area" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex", height: "100vh" }}>
			<CssBaseline />
			<TopBar onMenuClick={handleDrawerToggle} />

			{/* Drawer for desktop */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", md: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
						bgcolor: "#1565C0",
						color: "white",
					},
				}}
				open>
				{drawer}
			</Drawer>

			{/* Drawer for mobile */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
						bgcolor: "#1565C0",
						color: "white",
					},
				}}>
				{drawer}
			</Drawer>

			{/* Main content */}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: "#E3F2FD",
					p: 3,
					width: { md: `calc(100% - ${drawerWidth}px)` },
					marginTop: "64px", // height of appbar
					overflowY: "auto",
				}}>
				<Outlet />
			</Box>
		</Box>
	);
}

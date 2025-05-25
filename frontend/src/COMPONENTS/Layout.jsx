// src/COMPONENTS/Layout.jsx
import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Collapse,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 240;

export default function Layout() {
	const [openVehicle, setOpenVehicle] = useState(false);
	const [openSettings, setOpenSettings] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const location = useLocation();

	const toggleDrawer = () => {
		setMobileOpen(!mobileOpen);
	};

	const isActive = (path) => location.pathname.startsWith(path);

	const menuItems = [
		{ label: "Dashboard", path: "/dashboard" },
		{ label: "Park Car", path: "/parkcar" },
	];

	const subMenus = {
		Vehicle: [
			{ label: "Add Vehicle", path: "/vehicles/add" },
			{ label: "Vehicle List", path: "/vehicles/list" },
		],
		Settings: [
			{ label: "Add Parking Area", path: "/settings/add-area" },
			{ label: "Park Area", path: "/settings/park-area-list" },
			{ label: "Parked Car", path: "/settings/park-area" },
		],
	};

	const drawerContent = (
		<Box sx={{ bgcolor: "#0d1b2a", height: "100%", color: "white" }}>
			<Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
				Car Park System
			</Typography>
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.path} disablePadding>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={isActive(item.path)}
							sx={{ color: "white", "&.Mui-selected": { bgcolor: "#1b263b" } }}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}

				{/* Vehicle Submenu */}
				<ListItemButton
					onClick={() => setOpenVehicle(!openVehicle)}
					sx={{ color: "white" }}>
					<ListItemText primary="Vehicle" />
					{openVehicle ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openVehicle} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{subMenus.Vehicle.map((sub) => (
							<ListItemButton
								key={sub.path}
								component={Link}
								to={sub.path}
								sx={{
									pl: 4,
									color: "white",
									"&.Mui-selected": { bgcolor: "#1b263b" },
								}}
								selected={isActive(sub.path)}>
								<ListItemText primary={sub.label} />
							</ListItemButton>
						))}
					</List>
				</Collapse>

				{/* Settings Submenu */}
				<ListItemButton
					onClick={() => setOpenSettings(!openSettings)}
					sx={{ color: "white" }}>
					<ListItemText primary="Parking Settings" />
					{openSettings ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openSettings} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{subMenus.Settings.map((sub) => (
							<ListItemButton
								key={sub.path}
								component={Link}
								to={sub.path}
								sx={{
									pl: 4,
									color: "white",
									"&.Mui-selected": { bgcolor: "#1b263b" },
								}}
								selected={isActive(sub.path)}>
								<ListItemText primary={sub.label} />
							</ListItemButton>
						))}
					</List>
				</Collapse>
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: "flex" }}>
			{/* Top Bar */}
			<AppBar position="fixed" sx={{ zIndex: 1300, bgcolor: "#1b263b" }}>
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						onClick={toggleDrawer}
						sx={{ mr: 2, display: { md: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Car Parking System
					</Typography>
				</Toolbar>
			</AppBar>

			{/* Sidebar */}
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
				aria-label="menu folders">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={toggleDrawer}
					ModalProps={{ keepMounted: true }}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							bgcolor: "#0d1b2a",
						},
					}}>
					{drawerContent}
				</Drawer>

				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", md: "block" },
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							bgcolor: "#0d1b2a",
						},
					}}
					open>
					{drawerContent}
				</Drawer>
			</Box>

			{/* Content */}
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: "#f0f4f8", p: 3, minHeight: "100vh" }}>
				<Toolbar /> {/* for spacing under AppBar */}
				<Outlet />
			</Box>
		</Box>
	);
}

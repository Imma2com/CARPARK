import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function TopBar({ onMenuClick }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/");
	};

	return (
		<AppBar
			position="fixed"
			sx={{ bgcolor: "#1b263b", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onMenuClick}
					sx={{ mr: 2, display: { md: "none" } }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
					Parking System
				</Typography>
				<Button color="inherit" onClick={handleLogout}>
					Logout
				</Button>
			</Toolbar>
		</AppBar>
	);
}

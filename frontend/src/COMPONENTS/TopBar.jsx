import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopBar({ onMenuClick }) {
	return (
		<AppBar
			position="fixed"
			sx={{ bgcolor: "#0D47A1", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={onMenuClick}
					sx={{ mr: 2, display: { md: "none" } }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Parking System
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import TopBar from "./TopBar";

export default function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openMenus, setOpenMenus] = useState({
		vehicle: false,
		settings: false,
	});

	const location = useLocation();

	const toggleMenu = (menu) => {
		setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
	};

	const isActive = (path) => location.pathname.startsWith(path);

	return (
		<div className="flex h-screen overflow-hidden bg-gray-100">
			{/* Sidebar */}
			<aside
				className={`bg-blue-900 text-white w-64 space-y-4 py-6 px-4 absolute inset-y-0 left-0 transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
				<h2 className="text-2xl font-semibold text-white mb-6 text-center">
					Parking System
				</h2>

				<nav className="space-y-1">
					<NavItem
						to="/dashboard"
						label="Dashboard"
						active={isActive("/dashboard")}
					/>
					<NavItem
						to="/parkcar"
						label="Park Car"
						active={isActive("/parkcar")}
					/>

					{/* Vehicle submenu */}
					<SubMenu
						label="Vehicle"
						isOpen={openMenus.vehicle}
						onToggle={() => toggleMenu("vehicle")}
						links={[
							{ to: "/vehicles/add", label: "Add Vehicle" },
							{ to: "/vehicles/list", label: "Vehicle List" },
						]}
						activePaths={["/vehicles/add", "/vehicles/list"]}
						currentPath={location.pathname}
					/>

					{/* Settings submenu */}
					<SubMenu
						label="Parking Settings"
						isOpen={openMenus.settings}
						onToggle={() => toggleMenu("settings")}
						links={[
							{ to: "/settings/add-area", label: "Add Parking Area" },
							{ to: "/settings/park-area", label: "Park Area" },
						]}
						activePaths={["/settings/add-area", "/settings/park-area"]}
						currentPath={location.pathname}
					/>
				</nav>
			</aside>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col">
				<TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
				<main className="flex-1 overflow-y-auto p-4 bg-gray-100">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

// Nav Item component
function NavItem({ to, label, active }) {
	return (
		<Link
			to={to}
			className={`block py-2 px-4 rounded transition duration-200 ${
				active ? "bg-blue-700 font-medium" : "hover:bg-blue-800"
			}`}>
			{label}
		</Link>
	);
}

// Submenu component
function SubMenu({ label, isOpen, onToggle, links, activePaths, currentPath }) {
	const isAnyActive = activePaths.some((path) => currentPath.startsWith(path));

	return (
		<div>
			<button
				onClick={onToggle}
				className={`w-full flex justify-between items-center py-2 px-4 rounded transition duration-200 ${
					isAnyActive ? "bg-blue-700 font-medium" : "hover:bg-blue-800"
				}`}>
				<span>{label}</span>
				<svg
					className={`h-4 w-4 transform transition-transform ${
						isOpen ? "rotate-90" : ""
					}`}
					viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd" d="M6 6L14 10L6 14V6Z" clipRule="evenodd" />
				</svg>
			</button>
			{isOpen && (
				<div className="ml-4 mt-1 space-y-1">
					{links.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={`block py-1 px-3 rounded transition duration-200 ${
								currentPath.startsWith(link.to)
									? "bg-blue-700 font-medium"
									: "hover:bg-blue-800"
							}`}>
							{link.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

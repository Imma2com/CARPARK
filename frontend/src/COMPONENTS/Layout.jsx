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
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<aside
				className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
				<nav className="space-y-1">
					<Link
						to="/dashboard"
						className="block py-2.5 px-4 rounded hover:bg-gray-700">
						Dashboard
					</Link>
					<Link
						to="/parkcar"
						className="block py-2.5 px-4 rounded hover:bg-gray-700">
						Park Car
					</Link>

					{/* Vehicle Menu */}
					<div>
						<button
							onClick={() => toggleMenu("vehicle")}
							className="w-full flex justify-between items-center py-2.5 px-4 hover:bg-gray-700 rounded">
							<span>Vehicle</span>
							<svg
								className={`h-4 w-4 transform transition-transform ${
									openMenus.vehicle ? "rotate-90" : ""
								}`}
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M6 6L14 10L6 14V6Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{openMenus.vehicle && (
							<div className="ml-6 space-y-1">
								<Link
									to="/vehicles/add"
									className={`block py-1 px-2 rounded hover:bg-gray-700 ${
										isActive("/vehicles/add") && "bg-gray-700"
									}`}>
									Add Vehicle
								</Link>
								<Link
									to="/vehicles/list"
									className={`block py-1 px-2 rounded hover:bg-gray-700 ${
										isActive("/vehicles/list") && "bg-gray-700"
									}`}>
									Vehicle List
								</Link>
							</div>
						)}
					</div>

					{/* Parking Settings Menu */}
					<div>
						<button
							onClick={() => toggleMenu("settings")}
							className="w-full flex justify-between items-center py-2.5 px-4 hover:bg-gray-700 rounded">
							<span>Parking Settings</span>
							<svg
								className={`h-4 w-4 transform transition-transform ${
									openMenus.settings ? "rotate-90" : ""
								}`}
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M6 6L14 10L6 14V6Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{openMenus.settings && (
							<div className="ml-6 space-y-1">
								<Link
									to="/settings/add-area"
									className={`block py-1 px-2 rounded hover:bg-gray-700 ${
										isActive("/settings/add-area") && "bg-gray-700"
									}`}>
									Add Parking Area
								</Link>
								<Link
									to="/settings/park-area"
									className={`block py-1 px-2 rounded hover:bg-gray-700 ${
										isActive("/settings/park-area") && "bg-gray-700"
									}`}>
									Park Area
								</Link>
							</div>
						)}
					</div>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				<TopBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
				<main className="flex-1 overflow-y-auto p-4 bg-gray-100">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

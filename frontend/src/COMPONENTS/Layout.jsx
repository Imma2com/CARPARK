import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
	{
		name: "Dashboard",
		to: "/dashboard",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
				/>
			</svg>
		),
	},
	{
		name: "Park Car",
		to: "/parkcar",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24">
				<circle
					cx="12"
					cy="12"
					r="10"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M14 14l-4-4" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		name: "Vehicle",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24">
				<path
					d="M3 10h18M3 14h18"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		submenu: [
			{ name: "Add Vehicle", to: "/vehicles/add" },
			{ name: "Vehicle List", to: "/vehicles/list" },
		],
	},
	{
		name: "Parking Settings",
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24">
				<path
					d="M4 6h16M4 12h16M4 18h16"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		submenu: [
			{ name: "Add Parking Area", to: "/settings/add-area" },
			{ name: "Park Area", to: "/settings/park-area" },
		],
	},
];

export default function Layout() {
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [openMenus, setOpenMenus] = useState({});

	const toggleMenu = (name) => {
		setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
	};

	const isActive = (path) =>
		location.pathname === path || location.pathname.startsWith(path);

	return (
		<div className="flex h-screen bg-gray-100 font-sans">
			{/* Sidebar */}
			<aside
				className={`${
					sidebarOpen ? "w-64" : "w-16"
				} bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col transition-width duration-300`}>
				{/* Logo */}
				<div className="h-16 flex items-center justify-center font-bold text-xl tracking-wide border-b border-blue-700">
					{sidebarOpen ? "PARKING SYS" : "PS"}
				</div>

				{/* Nav */}
				<nav className="flex-1 overflow-y-auto mt-4">
					{menuItems.map((item) =>
						item.submenu ? (
							<div key={item.name}>
								<button
									onClick={() => toggleMenu(item.name)}
									className={`flex items-center w-full px-4 py-3 hover:bg-blue-700 transition-colors ${
										openMenus[item.name] ? "bg-blue-700" : ""
									} ${!sidebarOpen && "justify-center"}`}>
									<span className="mr-3">{item.icon}</span>
									{sidebarOpen && (
										<>
											<span className="flex-1 text-left">{item.name}</span>
											<svg
												className={`w-4 h-4 transform transition-transform ${
													openMenus[item.name] ? "rotate-90" : ""
												}`}
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</>
									)}
								</button>

								{openMenus[item.name] && sidebarOpen && (
									<div className="ml-10 mt-1 flex flex-col space-y-1">
										{item.submenu.map((sub) => (
											<Link
												key={sub.name}
												to={sub.to}
												className={`block px-3 py-2 rounded hover:bg-blue-600 transition-colors ${
													isActive(sub.to) ? "bg-blue-600 font-semibold" : ""
												}`}>
												{sub.name}
											</Link>
										))}
									</div>
								)}
							</div>
						) : (
							<Link
								key={item.name}
								to={item.to}
								className={`flex items-center px-4 py-3 hover:bg-blue-700 transition-colors ${
									isActive(item.to) ? "bg-blue-700 font-semibold" : ""
								} ${!sidebarOpen && "justify-center"}`}>
								<span className="mr-3">{item.icon}</span>
								{sidebarOpen && <span>{item.name}</span>}
							</Link>
						)
					)}
				</nav>

				{/* Collapse Button */}
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className="h-12 w-full flex items-center justify-center border-t border-blue-700 hover:bg-blue-700 transition-colors focus:outline-none">
					{sidebarOpen ? (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					)}
				</button>
			</aside>

			{/* Main content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top Nav */}
				<header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-300 shadow-sm">
					<div>
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="text-blue-900 hover:text-blue-700 focus:outline-none md:hidden">
							{/* Hamburger icon */}
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
					<div className="text-xl font-semibold text-blue-900">
						Parking Management System
					</div>
					<div>
						{/* Placeholder for user avatar or profile menu */}
						<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer select-none">
							U
						</div>
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 overflow-y-auto p-6 bg-gray-50">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

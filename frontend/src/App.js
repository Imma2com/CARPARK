import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./COMPONENTS/Layout";
import ParkCar from "./COMPONENTS/PARKING/ParkCar";
import AddVehicle from "./COMPONENTS/VEHICLE/AddVehicle";
import VehicleList from "./COMPONENTS/VEHICLE/VehicleList";
import AddArea from "./COMPONENTS/PARKING/AddArea";
import ParkArea from "./COMPONENTS/PARKING/ParkArea";
import Dashboard from "./COMPONENTS/Dashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="parkcar" element={<ParkCar />} />
					<Route path="vehicles/add" element={<AddVehicle />} />
					<Route path="vehicles/list" element={<VehicleList />} />
					<Route path="settings/add-area" element={<AddArea />} />
					<Route path="settings/park-area" element={<ParkArea />} />
					<Route index element={<Dashboard />} /> {/* default route */}
				</Route>
			</Routes>
		</Router>
	);
}
export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./COMPONENTS/Layout";
import AddVehicle from "./COMPONENTS/VEHICLE/AddVehicle";
import VehicleList from "./COMPONENTS/VEHICLE/VehicleList";
import AddArea from "./COMPONENTS/PARKING/AddArea";
import Dashboard from "./COMPONENTS/Dashboard";
import ParkedCars from "./COMPONENTS/PARKING/ParkedCars";
import ParkCar from "./COMPONENTS/PARKING/ParkCar";

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
					<Route path="settings/park-area" element={<ParkedCars />} />
					<Route index element={<Dashboard />} />
				</Route>
			</Routes>
		</Router>
	);
}
export default App;

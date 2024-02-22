//jshint esversion:9
import { Routes, Route } from "react-router-dom";
import Login from "./Scenes/Login";
import ResetPassword from "./Scenes/ResetPassword";
import Admin from "./Scenes/Admin";
import Dashboard from "./Scenes/Dashboard";
import PrivateRoute from "./Scenes/Admin/PrivateRoute";
import RegisterUser from "./Scenes/RegisterUser";
import Page404 from "./Shared/Page404";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
function App() {
	return (
		<div className="w-full">
			<AnimatePresence mode="wait">
				<Toaster toastOptions={{ duration: 3000 }} />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<RegisterUser />} />
					{/*<Route path="/resetpassword" element={<ResetPassword />} />*/}
					<Route path="/admin" element={<PrivateRoute element={<Admin />} />}>
						<Route index element={<Dashboard />} />
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;

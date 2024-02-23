//jshint esversion:9
import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import Logo from "../../assets/logo.png";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(null);
	const navigateToDashboard = (user) => {
		navigate("/admin");
	};
	const { loginUser, user } = useUser();
	const navigate = useNavigate();
	const handleOnFocus = () => {
		setError(null);
		setMessage(null);
	};
	const login = async (data) => {
		setLoading(true);
		console.log("data", data);
		await instance
			.post("/login", { ...data, userCredentials: data.email })
			.then((res) => {
				console.log("res", res);
				loginUser(res.data.user);
				navigateToDashboard(res.data.user);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setMessage(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="max-h-screen mx-auto bg-login-bg">
			<div className="flex flex-col items-center justify-center min-h-screen font-nunito">
				<motion.div
					initial={{ x: -50, scale: 0.7, opacity: 0 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="rounded-[12px] md:max-lg:w-[70%] lg:w-[40%] w-[80%] shadow-lg bg-slate-50 my-2">
					<div className="w-full">
						<img src={Logo} className="block w-20 h-20" />
					</div>
				</motion.div>
				<motion.div
					initial={{ x: 50, scale: 0.5, opacity: 0 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.4 }}
					className="md:max-lg:w-[70%] lg:w-[40%] w-[80%] shadow-lg  rounded-[16px] bg-slate-50">
					<p className="px-4 my-2 font-extrabold ">Signin </p>

					<form onSubmit={handleSubmit(login)} className="px-4 mx-2 ">
						<div>
							<label
								htmlFor="id"
								className="block my-1 text-xs font-bold text-gray-700 ">
								Email
							</label>
							<input
								type="email"
								onFocus={handleOnFocus}
								className="w-full px-3 py-1 border-[1.2px] border-gray-500 rounded-[8px] shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="email"
								{...register("email")}
							/>
						</div>
						<div className="">
							<label
								htmlFor="password"
								className="block my-1 text-xs font-bold text-gray-700 ">
								Password
							</label>
							<input
								type="password"
								onFocus={handleOnFocus}
								className="w-full px-3 py-1 border-[1.2px] border-gray-500 rounded-[8px] shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="password"
								{...register("password")}
							/>
						</div>
						<div className="py-4">
							<button
								type="submit"
								className="w-full   text-xs  px-3 py-2  font-bold text-center text-white rounded-[32px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none mt-4 mb-2">
								{!loading ? (
									"Login"
								) : (
									<HashLoader color="#fff" loading={loading} size={15} />
								)}
							</button>
						</div>

						{/*<Link
							to="/resetpassword"
							className="block my-4 text-xs font-bold text-center text-sky-700">
							Reset Password
							</Link>*/}
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;

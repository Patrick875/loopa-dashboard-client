import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";

function ResetPassword() {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(null);

	const navigateBack = () => {
		navigate("/");
	};
	const navigate = useNavigate();
	const resetPassword = async (data) => {
		setLoading(true);
		await instance
			.post("/resetPassword", { ...data })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
				navigateBack();
			});
	};
	const handleOnFocus = () => {
		setError(null);
		setMessage(null);
	};
	return (
		<div className="max-h-screen mx-auto bg-login-bg font-nunito">
			<motion.div className="flex flex-col items-center justify-center min-h-screen ">
				<motion.div
					initial={{ x: -50, scale: 0.7, opacity: 0 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="rounded-[12px] md:w-[34%] w-[80%] shadow-lg bg-slate-50 my-2">
					<div className="w-full">
						<img src={Logo} className="block w-20 h-20" />
					</div>
				</motion.div>
				<motion.div
					initial={{ x: 50, scale: 0.5, opacity: 0 }}
					animate={{ x: 0, opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.4 }}
					className="md:w-[34%] w-[80%] shadow-lg  rounded-lg bg-slate-50">
					<p className="px-4 my-2 font-extrabold">Reset password</p>
					<form onSubmit={handleSubmit(resetPassword)} className="px-4 mx-2">
						<div>
							<label
								htmlFor="id"
								className="block my-2 text-xs font-medium text-gray-700 ">
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

						<button
							type="submit"
							className="w-full  text-xs  px-3 py-2 font-bold text-center text-white rounded-[32px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none mt-4 mb-2">
							{!loading ? (
								"Reset password"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<Link
							to="/"
							className="block my-4 text-xs font-bold text-center text-sky-700">
							Login
						</Link>
					</form>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default ResetPassword;

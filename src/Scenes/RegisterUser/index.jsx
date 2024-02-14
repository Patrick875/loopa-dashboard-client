import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

const RegisterUser = () => {
	const { register, handleSubmit, reset } = useForm();

	const [loading, setLoading] = useState(null);

	const signup = async (data) => {
		setLoading(true);
		await instance
			.post("/register", { ...data })
			.then(() => {
				toast.success("Success !!!");
			})
			.catch((err) => {
				console.log(err);

				toast.error(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
				reset();
			});
	};

	return (
		<div className="max-h-screen mx-auto  bg-login-bg ">
			<div className="flex flex-col items-center justify-center min-h-screen ">
				<div className="md:w-[30%] w-[80%] shadow-lg  rounded-lg bg-slate-50">
					<div className="w-full  mx-2 ">
						<div>
							<img src={Logo} className="block  w-20 h-20" />
						</div>
					</div>

					<form onSubmit={handleSubmit(signup)} className="px-6  mx-2 ">
						<p className=" text-xs font-bold capitalize">create account</p>
						<div>
							<label
								htmlFor="id"
								className="block my-1 text-xs font-medium text-gray-700 ">
								Full name
							</label>
							<input
								type="text"
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="fullname"
								required
								{...register("fullname")}
							/>
						</div>

						<div>
							<label
								htmlFor="id"
								className="block my-1 text-xs font-medium text-gray-700 ">
								Telephone
							</label>
							<input
								type="text"
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="telephone"
								maxLength={10}
								{...register("telephone")}
							/>
						</div>

						<div>
							<label
								htmlFor="id"
								className="block my-1 text-xs font-medium text-gray-700 ">
								Email
							</label>
							<input
								type="email"
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="email"
								required
								{...register("email")}
							/>
						</div>
						<div>
							<label
								htmlFor="id"
								className="block my-1 text-xs font-medium text-gray-700 ">
								Password
							</label>
							<input
								type="password"
								required
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="password"
								{...register("password")}
							/>
						</div>

						<button
							type="submit"
							className="w-full px-3 py-2 text-xs font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none my-4">
							{!loading ? (
								"Register"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<Link
							to="/"
							className="block text-xs text-center text-sky-700 mb-4 ">
							Login
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterUser;

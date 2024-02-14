import { useForm } from "react-hook-form";

import { useState } from "react";
import instance from "../../API";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

const CreatePlot = () => {
	const [loading, setLoading] = useState(false);
	const { register, reset, handleSubmit } = useForm();

	const createPlot = async (data) => {
		setLoading(true);
		await instance
			.post("/plots", data)
			.then(() => {
				toast.success("Success !!!");
				reset();
			})
			.catch((err) => {
				console.log("err", err);
				toast.error("error registering plot");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className="w-full">
			<div className="p-4 mx-auto ">
				<div className="bg-white rounded-[8px]  mb-2 flex items-center justify-center md:w-1/2 w-full mx-auto ">
					<p className="my-2 font-bold text-center ">Add plot </p>
				</div>
				<form
					onSubmit={handleSubmit(createPlot)}
					className="w-full px-6 pt-2 mx-auto bg-white md:w-1/2  rounded-[8px]">
					<div className="py-3">
						<label
							htmlFor="id"
							className="block my-2 text-xs font-bold text-gray-700 ">
							PlodId / Name
						</label>
						<input
							type="text"
							className="w-full px-3 py-1 border-[1.2px] border-gray-500 rounded-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
							id="text"
							{...register("name")}
						/>
						<button
							type="submit"
							className="px-4 py-2 my-2 text-xs font-bold  rounded-[6px]  text-white bg-black">
							{!loading ? (
								"submit"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreatePlot;

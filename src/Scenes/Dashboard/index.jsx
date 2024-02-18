//jshint esversion:9
import html2canvas from "html2canvas";
import useFetchData from "../../Hooks/UseFetchData";
import { FadeLoader } from "react-spinners";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InfoChart from "../../Shared/InfoChart";
import { formatDate } from "../../Shared/utilFunctions";
import GenerateExcell from "../../Shared/GenerateExcell";

function Dashboard() {
	const { data, loading } = useFetchData("/plots/all");
	const [selectedPlot, setSelectedPlot] = useState("");
	const [viewForm, setViewForm] = useState("table");
	const [info, setInfo] = useState("plotTemperature");
	const chartRef = useRef();
	const handleDownloadImage = async () => {
		const element = chartRef.current;
		const canvas = await html2canvas(element);

		const data = canvas.toDataURL("image/png");
		const link = document.createElement("a");

		if (typeof link.download === "string") {
			link.href = data;
			link.download = "image.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};
	const getPlot = () => {
		if (data) {
			const clickedPlot =
				data && data.filter((el) => el.regId === selectedPlot)[0];
			const formattedPh = clickedPlot
				? clickedPlot.plotPh.map((el) => ({
						...el,
						createdAt: formatDate(el.createdAt),
				  }))
				: clickedPlot;
			const formatedTemp = clickedPlot
				? clickedPlot.plotTemperature.map((el) => ({
						...el,
						createdAt: formatDate(el.createdAt),
				  }))
				: clickedPlot;
			const formatedMoisture = clickedPlot
				? clickedPlot.plotMoisture?.map((el) => ({
						...el,
						createdAt: formatDate(el.createdAt),
				  }))
				: clickedPlot;
			const updatedData =
				clickedPlot && formatedTemp && formattedPh
					? {
							...clickedPlot,
							plotPh: formattedPh,
							plotTemperature: formatedTemp,
							plotMoisture: formatedMoisture,
					  }
					: clickedPlot;
			return { data: clickedPlot, updatedData };
		} else {
			return { data: null, updatedData: null };
		}
	};
	const currentPlot = useMemo(() => getPlot(), [data, selectedPlot]);
	const { data: originalData, updatedData } = currentPlot;

	useEffect(() => {
		if (data && data.length !== 0) {
			setSelectedPlot(data[0].regId);
		}
	}, [data]);

	return (
		<div className="min-h-screen ">
			{data && data.length === 0 ? (
				<div className="flex items-center justify-center min-h-screen bg-white">
					<p className="p-3 text-center text-black ">
						No plots are registered yet !!!
					</p>
				</div>
			) : (
				<React.Fragment>
					<div className="">
						<div className="flex w-full p-4 py-2 bg-white ">
							<div className="flex w-1/2 gap-2">
								<p
									onClick={() => setViewForm("table")}
									className={` transition-all duration-150 text-xs font-bold   p-2 cursor-pointer ${
										viewForm === "table"
											? "bg-purple-950 rounded-[6px] text-white"
											: null
									}`}>
									Table{" "}
								</p>
								<p
									onClick={() => setViewForm("charts")}
									className={`  transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										viewForm === "charts"
											? " bg-purple-950 rounded-[6px] text-white "
											: null
									}`}>
									Charts{" "}
								</p>
							</div>
							<div className="flex w-1/2 gap-4 ">
								{data && originalData && (
									<GenerateExcell
										data={originalData}
										docName={`${originalData.regId}_data`}
									/>
								)}
								{data && updatedData && viewForm === "charts" && (
									<button
										type="button"
										onClick={handleDownloadImage}
										className="p-2 rounded-[6px] text-xs font-bold text-white bg-black">
										Download as image
									</button>
								)}
							</div>
						</div>
						<hr className="bg-black border-[1.8px]cursor-pointer" />
						<div className="">
							<div className="sticky flex w-full gap-4 p-4 py-2 bg-white">
								<p
									onClick={() => setInfo("plotTemperature")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "plotTemperature"
											? "  text-white rounded-[10px]  bg-gray-600 "
											: null
									}`}>
									Temperature{" "}
								</p>
								<p
									onClick={() => setInfo("plotPh")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "plotPh"
											? "  text-white rounded-[10px]  bg-gray-600 "
											: null
									}`}>
									PH{" "}
								</p>
								<p
									onClick={() => setInfo("plotMoisture")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "plotMoisture"
											? "  text-white rounded-[10px]  bg-gray-600 "
											: null
									}`}>
									Moisture{" "}
								</p>
							</div>
						</div>
						<hr className="bg-black border-[1.8px]" />
						<div className="mb-1 rounded-[8px] ">
							{data && (
								<div className={`grid grid-cols-12 bg-white p-3 py-2`}>
									{data &&
										data.map((el) => (
											<p
												key={el._id}
												onClick={() => setSelectedPlot(el.regId)}
												className={` transition-all duration-150 col-span-3 text-xs p-2 font-bold cursor-pointer ${
													selectedPlot === el.regId
														? "  text-white rounded-[10px]  bg-pink-950 "
														: null
												}`}>
												{el.regId}
											</p>
										))}
								</div>
							)}
						</div>
					</div>

					{viewForm === "table" && data && data.length !== 0 && (
						<div className="flex-1 h-[75vh] bg-white  ">
							<div className="grid w-full grid-flow-col ">
								<p className="p-2 text-xs font-bold">Date</p>
								<p className="p-2 text-xs font-bold">
									{" "}
									{info === "plotTemperature"
										? "Temperature"
										: info === "plotPh"
										? "PH"
										: "Moisture"}{" "}
								</p>
							</div>
							<div className="grid w-full grid-flow-col overflow-y-auto max-h-96">
								<div className="p-2 text-xs font-bold bg-gray-100 ">
									{updatedData &&
									updatedData.plotTemperature &&
									updatedData.plotTemperature.length !== 0
										? updatedData.plotTemperature.map((el) => (
												<p key={el._id}>
													{" "}
													{new Date(el.updatedAt).toLocaleDateString("fr-FR")}
												</p>
										  ))
										: null}
								</div>
								<div className="p-2 text-xs font-bold bg-gray-100">
									{updatedData && updatedData[info] && updatedData[info] !== 0
										? updatedData[info].map((el) => (
												<p key={el._id}>{el.value ? el.value : 0}</p>
										  ))
										: null}
								</div>
							</div>
						</div>
					)}
					{viewForm === "charts" && updatedData && (
						<div className="flex flex-col flex-1 h-[75vh] p-2 bg-white">
							<div ref={chartRef} className="p-2 h-[75vh]">
								<InfoChart
									data={updatedData[info]}
									yKey="value"
									yKeyName={
										info === "plotTemperature"
											? "Temperature"
											: info === "plotPh"
											? "PH"
											: "Moisture"
									}
									strokeColor="#ab154c"
									titleText={`${
										info === "plotTemperature"
											? "Temperature"
											: info === "plotPh"
											? "PH"
											: "Moisture"
									} Vs Date Graph`}
								/>
							</div>
						</div>
					)}
				</React.Fragment>
			)}
			{loading && (
				<div className="flex items-center justify-center w-full min-h-screen">
					<FadeLoader color="#0C4981" loading={loading} size={16} />
				</div>
			)}
		</div>
	);
}

export default Dashboard;

// <form className="mx-2 flex items-center gap-3 py-1 px-4 bg-white rounded-[8px] ">
// 	<HiMagnifyingGlass className="w-4 h-4 text-login-blue " />
// 	<input
// 		placeholder="Search"
// 		className="bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
// 		{...register("query")}
// 	/>
// </form>;

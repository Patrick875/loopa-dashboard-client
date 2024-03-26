//jshint esversion:9
import html2canvas from "html2canvas";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InfoCharts from "../../Shared/InfoCharts";
import { formatDate } from "../../Shared/utilFunctions";
import GenerateExcell from "../../Shared/GenerateExcell";
import axios from "axios";
import { LiaDownloadSolid } from "react-icons/lia";
import instance from "../../API";

function Dashboard() {
	const [data, setData] = useState(null);
	const [availablePlots, setAvailablePlots] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedPlot, setSelectedPlot] = useState("");
	const [viewForm, setViewForm] = useState("table");
	const [info, setInfo] = useState("TEMPERATURE");
	const chartRef = useRef();
	const handleDownloadImage = async () => {
		const element = chartRef.current;
		const canvas = await html2canvas(element);

		const data = canvas.toDataURL("image/png");
		const link = document.createElement("a");

		if (typeof link.download === "string") {
			link.href = data;
			link.download = `${info} Vs Time chart / Batch ${selectedPlot}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};
	const getPlot = () => {
		if (data && data.feeds && data.feeds.length !== 0) {
			const clickedPlot =
				data && data.feeds.filter((el) => el.field1 === selectedPlot);

			const formattedPh = clickedPlot
				? clickedPlot.map((el) => ({
						value: el.field3,
						createdAt: formatDate(el.created_at, true),
				  }))
				: clickedPlot;
			const formatedTemp = clickedPlot
				? clickedPlot.map((el) => ({
						value: el.field2,
						createdAt: formatDate(el.created_at, true),
				  }))
				: clickedPlot;
			const formatedMoisture = clickedPlot
				? clickedPlot.map((el) => ({
						value: el.field4,
						createdAt: formatDate(el.created_at, true),
				  }))
				: clickedPlot;
			const updatedData =
				clickedPlot && formatedTemp && formattedPh
					? {
							PH: formattedPh,
							TEMPERATURE: formatedTemp,
							MOISURE: formatedMoisture,
					  }
					: clickedPlot;
			const originalData = {
				PH: clickedPlot.map((el) => ({
					value: el.field3,
					createdAt: el.created_at,
				})),
				TEMPERATURE: clickedPlot.map((el) => ({
					value: el.field2,
					createdAt: el.created_at,
				})),
				MOISURE: clickedPlot.map((el) => ({
					value: el.field4,
					createdAt: el.created_at,
				})),
			};
			return { data: originalData, updatedData };
		} else {
			return { data: null, updatedData: null };
		}
	};
	const currentPlot = useMemo(() => getPlot(), [data, selectedPlot]);
	const { data: originalData, updatedData } = currentPlot;

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			await instance
				.get(
					"https://api.thingspeak.com/channels/2439297/feeds.json?api_key=RYQ1XWVAOGJCFLYV&results=80000"
				)
				.then((res) => {
					setData(res.data);
					console.log("res", res);
					const plots =
						res.data && res.data.feeds
							? res.data.feeds.map((el) => el.field1)
							: [];

					const uniquePlots = [...new Set(plots)];

					setAvailablePlots(uniquePlots);
				})
				.catch((err) => {
					console.log("err", err);
				})
				.finally(() => {
					setLoading(false);
				});
		};
		getData();
	}, []);
	useEffect(() => {
		if (availablePlots && availablePlots.length !== 0) {
			setSelectedPlot(availablePlots[0]);
		}
	}, [availablePlots]);

	return (
		<div className="min-h-screen ">
			{!loading && data && data.feeds.length === 0 ? (
				<div className="flex items-center justify-center min-h-screen bg-white">
					<p className="p-3 text-center text-black ">No data available !!!</p>
				</div>
			) : (
				<React.Fragment>
					<div className="">
						<div className="flex justify-between w-full gap-2 p-4 py-2 bg-white sm:justify-stretch ">
							<div className="flex gap-2 sm:w-1/2">
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
							{
								<div className="flex items-center gap-4 sm:w-1/2 ">
									{data && originalData && (
										<GenerateExcell
											data={originalData}
											docName={`BATCH-${selectedPlot}_data`}
										/>
									)}
									{data && updatedData && viewForm === "charts" && (
										<button
											type="button"
											onClick={handleDownloadImage}
											className="p-2 sm:p-2 flex  items-center gap-2 rounded-[6px] text-xs font-bold text-white bg-black">
											Image
											<LiaDownloadSolid />
										</button>
									)}
								</div>
							}
						</div>
						<hr className="bg-black border-[1.8px]cursor-pointer" />
						<div className="">
							<div className="sticky flex w-full gap-4 p-4 py-2 bg-white">
								<p
									onClick={() => setInfo("TEMPERATURE")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "TEMPERATURE"
											? "  text-white rounded-[10px]  bg-gray-600 "
											: null
									}`}>
									Temperature{" "}
								</p>
								<p
									onClick={() => setInfo("PH")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "PH"
											? "  text-white rounded-[10px]  bg-gray-600 "
											: null
									}`}>
									PH{" "}
								</p>
								<p
									onClick={() => setInfo("MOISURE")}
									className={` transition-all duration-150  text-xs p-2 font-bold cursor-pointer ${
										info === "MOISURE"
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
									{availablePlots &&
										availablePlots.length !== 0 &&
										availablePlots.map((el) => (
											<p
												key={el}
												onClick={() => setSelectedPlot(el)}
												className={` transition-all duration-150 col-span-3 text-xs p-2 font-bold cursor-pointer ${
													selectedPlot === el
														? "  text-white rounded-[10px]  bg-pink-950 "
														: null
												}`}>
												Batch {el}
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
									{info === "TEMPERATURE"
										? "Temperature"
										: info === "PH"
										? "PH"
										: "Moisture"}{" "}
								</p>
							</div>
							<div className="grid w-full grid-flow-col overflow-y-auto max-h-96">
								<div className="p-2 text-xs font-bold bg-gray-100 ">
									{updatedData &&
									updatedData["TEMPERATURE"] &&
									updatedData["TEMPERATURE"].length !== 0
										? updatedData["TEMPERATURE"].map((el) => (
												<p key={crypto.randomUUID()}> {el.createdAt}</p>
										  ))
										: null}
								</div>
								<div className="p-2 text-xs font-bold bg-gray-100">
									{updatedData && updatedData[info] && updatedData[info] !== 0
										? updatedData[info].map((el) => (
												<p key={crypto.randomUUID()}>
													{el.value ? el.value : 0}
												</p>
										  ))
										: null}
								</div>
							</div>
						</div>
					)}
					{viewForm === "charts" && updatedData && (
						<div className="flex flex-col flex-1 overflow-x-scroll sm:overflow-hidden  h-[78vh] p-2 bg-white">
							<div
								ref={chartRef}
								className="p-2 pb-4 h-[70vh]  sm:w-full w-[800px]">
								<InfoCharts
									data={updatedData[info]}
									info={info}
									batch={selectedPlot}
								/>
							</div>
						</div>
					)}
				</React.Fragment>
			)}
		</div>
	);
}

export default Dashboard;

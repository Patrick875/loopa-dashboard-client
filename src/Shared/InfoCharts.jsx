import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

function InfoCharts({ data, info, batch }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: `${info} Vs Time chart / Batch ${batch}`,
			},
		},
	};
	const displayData = {
		labels: data.map((el) => el.createdAt),
		datasets: [
			{
				label: info,
				tension: 0.2,
				fill: false,
				data: data.map((el) => el.value),
				borderColor:
					info === "TEMPERATURE"
						? "rgb(131, 24, 67)"
						: info === "PH"
						? "rgb(19, 70, 143)"
						: "rgb(17, 94, 89)",
				backgroundColor:
					info === "TEMPERATURE"
						? "rgb(131, 24, 67)"
						: info === "PH"
						? "rgb(19, 70, 143)"
						: "rgb(17, 94, 89)",
			},
		],
	};

	return (
		<div className="h-[70vh] w-full chart-container">
			<Line data={displayData} options={options} />
		</div>
	);
}

export default InfoCharts;

import { exportToExcel, formatDate } from "./utilFunctions";

const GenerateExcell = ({ data, docName }) => {
	const handleClickExport = () => {
		const temperature =
			data &&
			data.plotTemperature &&
			data.plotTemperature.map((el) => ({
				date: formatDate(el.createdAt, true),
				T: el.value,
			}));
		const ph =
			data &&
			data.plotPh &&
			data.plotPh.map((el) => ({
				createdAt: formatDate(el.createdAt, true),
				ph: el.value,
			}));
		const moisture =
			data &&
			data.plotMoisture &&
			data.plotMoisture.map((el) => ({
				createdAt: formatDate(el.createdAt, true),
				moisture: el.value,
			}));
		const sheets = [
			{ name: "Temperature", data: temperature },
			{ name: "PH", data: ph },
			{ name: "Moisture", data: moisture },
		];

		exportToExcel(sheets, docName);
	};

	return (
		<div>
			<button
				className="p-2 text-white text-xs rounded-[6px] bg-emerald-800"
				onClick={handleClickExport}>
				Export to Excel
			</button>
		</div>
	);
};

export default GenerateExcell;

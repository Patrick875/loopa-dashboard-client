import { exportToExcel, formatDate } from "./utilFunctions";

const GenerateExcell = ({ data, docName }) => {
	const handleClickExport = () => {
		console.log("Export button clicked!", data); // Log a message to check if the function is being called
		const temperature =
			data &&
			data.plotTemperature &&
			data.plotTemperature.map((el) => ({
				date: formatDate(el.createdAt, true),
				t: el.value,
			}));
		const ph =
			data &&
			data.plotPh &&
			data.plotPh.map((el) => ({
				createdAt: formatDate(el.createdAt, true),
				ph: el.value,
			}));
		const sheets = [
			{ name: "Temperature", data: temperature },
			{ name: "PH", data: ph },
		];
		// Example data

		console.log("sheets-sheets-sheets", sheets);
		// Call exportToExcel function with your data
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

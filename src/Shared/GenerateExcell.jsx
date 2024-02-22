import { exportToExcel, formatDate } from "./utilFunctions";

const GenerateExcell = ({ data, docName }) => {
	const handleClickExport = () => {
		const temperature =
			data &&
			data.TEMPERATURE &&
			data.TEMPERATURE.map((el) => ({
				Date: formatDate(el.createdAt, true),
				T: el.value,
			}));
		const ph =
			data &&
			data.PH &&
			data.PH.map((el) => ({
				Date: formatDate(el.createdAt, true),
				ph: el.value,
			}));
		const moisture =
			data &&
			data.MOISURE &&
			data.MOISURE.map((el) => ({
				Date: formatDate(el.createdAt, true),
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

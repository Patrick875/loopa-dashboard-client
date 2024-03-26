import * as XLSX from "xlsx";
export function sortDates(data) {
	return data.sort((a, b) => b.date - a.date);
}

export function formatDate(customDateString, isFull = false) {
	const date = new Date(customDateString);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	if (isFull) {
		return `${day}/${month}/${year} ${hours}:${minutes}`;
	} else {
		return ` ${hours}:${minutes}`;
	}
}

export function exportToExcel(sheets, filename) {
	const wb = XLSX.utils.book_new();
	for (const sheet of sheets) {
		const { data } = sheet;
		const headers = Object.keys(data[0]);

		const titleHeaders = headers.map((el) =>
			el === "T" ? "TEMPERATURE" : el.toUpperCase()
		);

		const dataArray = [
			titleHeaders,
			...data.map((obj) => headers.map((key) => obj[key])),
		];
		const ws = XLSX.utils.aoa_to_sheet(dataArray);
		XLSX.utils.book_append_sheet(wb, ws, sheet.name);
	}

	XLSX.writeFile(wb, filename + ".xlsx");
}

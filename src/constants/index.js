import instance from "../API";

export const serverUrl = "https://relieved-plum-kangaroo.cyclic.app/";
export const localServerUrl = "http://localhost:5200/";
export const deleteProduct = async (id, setData, url, item) => {
	const dataCat = { catId: id };
	const dataProd = { prodId: id };
	const dataSub = item === "Product" ? dataProd : dataCat;
	await instance
		.post(`${url}`, dataSub)
		.then(() => {
			setData((prev) => prev.filter((item) => item.id !== id));
		})
		.catch((err) => {
			console.log(err);
		});
};

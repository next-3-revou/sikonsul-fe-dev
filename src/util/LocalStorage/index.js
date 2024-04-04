/* eslint-disable no-unused-vars */
export const storeData =  (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.log(e);
	}
};

export const getData =  key => {
	try {
		const value =  localStorage.getItem(key);
		if (value !== null) {
			// value previously stored
			return JSON.parse(value);
		}
	} catch (e) {
		console.log(e);
	}
};

export const clearData = async key => {
	try {
		await localStorage.clear();
	} catch (e) {
		console.log(e);
	}
};

export const clearDataByKey = async key => {
	try {
		await localStorage.removeItem(key);
	} catch (e) {
		console.log(e.message);
	}
};
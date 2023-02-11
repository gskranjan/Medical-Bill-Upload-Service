const datapath = "./model_data/bills_data.json"
function checkString(str) {
	if (typeof (str) == "string") {
		return true;
	}
	return false;
}
function createMedicalBills(data) {
	try {
		const { patientNameAddress, hospitalName, serviceDate, amount } = data;
		if (patientNameAddress && hospitalName && serviceDate && amount) {
			if (Number.isInteger(amount) && checkString(patientNameAddress) && checkString(hospitalName) && checkString(serviceDate)) {
				global.bills.push({ patientNameAddress, hospitalName, serviceDate, amount });
			}
			else {
				return { success: false, message: "Data types are not valid" };
			}
		}
		else {
			return { success: false, message: "Data is incomplete" };
		}
		return { success: true, data };
	}
	catch (err) {
		console.error("[Error] createMedicalBills function gave error " + err.message);
		const error = {
			function: "createMedicalBills",
			err,
			message: 'createMedicalBills function gave error: ' + err.message
		};
		return { success: false, message: "Something went wrong", error };
	}
}

function createMedicalBillsBulk(bulkData) {
	try {
		for (i in bulkData) {
			const result = createMedicalBills(bulkData[i]);
			if (!result.success) {
				return { success: false, message: result.message };
			}
		}
		return { success: true, bulkData };
	}
	catch (err) {
		console.error("[Error] createMedicalBillsBulk function gave error " + err.message);
		const error = {
			function: "createMedicalBillsBulk",
			err,
			message: 'createMedicalBillsBulk function gave error: ' + err.message
		};
		return { success: false, error };
	}
}

function getItems() {
	try {
		return { success: true, data: global.bills };
	}
	catch (err) {
		console.error("[Error] getItems function gave error " + err.message);
		const error = {
			function: "getItems",
			err,
			message: 'getItems function gave error: ' + err.message
		};
		return { success: false, error };
	}
}

module.exports = {
	createMedicalBills,
	getItems,
	createMedicalBillsBulk
}
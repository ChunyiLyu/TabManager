function getTime(domain) {
	var d = new Date();
	var date = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var time = hours+":"+minutes;
	var storage_var = {
		"date": date,
		"time": time,
	};
	return storage_var;
}

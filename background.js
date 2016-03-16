function getTime() {
	var d = new Date();
	var date = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var time = hours+":"+minutes;
	var curretnTime = {
		"date": date,
		"time": time,
	};
	return currentTime;
}

function checkSnooze () {
  var time = getTime();
  console.log(time["time"]);
}

setInterval(function() {checkSnooze;},  50);

function saveStatus(status) {
  var key = status["domain"];
  localStorage[key] = JSON.stringify(status);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.signal == "saveTabs") {
      chrome.extension.getBackgroundPage().console.log('received saveTabs signal');
      localStorage[request.key] = request.urls;
      console.log(localStorage[request.key]);
    } else if (request.signal == "saveUrl") {
      console.log("saveUrl");
      localStorage[request.key] = JSON.stringify(request.value);
    } else if (request.signal == "openTab") {
      console.log("openTab");
      chrome.tabs.create({ url: request.url });
    }
  }
);

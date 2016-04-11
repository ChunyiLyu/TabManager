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
			chrome.alarms.onAlarm.addListener(function (alarm) {
			    console.log('Fired alarm!');
			    DoSomething();
					console.log(alarm.scheduledTime);
					clearAlarm(alarm);
			});
			function DoSomething() {
			  chrome.tabs.create({ url: request.value["url"] });
			}
			function clearAlarm(alarm) {
				console.log(alarm.name);
				chrome.alarms.clear(alarm.name, function(){});
			}

    } else if (request.signal == "openTab") {
      console.log("openTab");
      chrome.tabs.create({ url: request.url });
    }
  }
);

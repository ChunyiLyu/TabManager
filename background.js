/*
* Background page;
* handles localStorage: store, delate, and send from localStorage to Options/Popup pages;
* @Chunyi Lyu
*/

/* delete a group of tab*/
function deleteTab(name) {
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
        console.log("Deleted from localStorage");
    }
}
/* update snooze time */
function snoozeUpdate(time) {
    localStorage["time"] = time;
}
/* update maximum number of links */
function linksUpdate(num) {
    localStorage["numLinks"] = num;
}
/*message listener */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.signal == "saveTabs") {
      localStorage[request.key] = request.urls;
    } else if (request.signal == "saveUrl") {
			var minutes = 30;
			if (localStorage["time"]) {
				minutes = localStorage["time"] * 60;
			}
			chrome.alarms.create(request.value["url"], { delayInMinutes: minutes });
			chrome.alarms.onAlarm.addListener(function (alarm) {
					fireAlarm(alarm.name);
					chrome.alarms.clearAll(function(wasCleared){});
			});
      /* temporary solution to a known bug */
			function fireAlarm(url) {
				if (url === request.value["url"]) {
			  	chrome.tabs.create({ url: url });
				}
			}
    } else if (request.signal == "deleteTab") {
			deleteTab(request.name);
		} else if (request.signal == "snoozeUpdate") {
			snoozeUpdate(request.time);
		} else if (request.signal == "linksUpdate") {
			linksUpdate(request.num);
		} else if (request.signal == "getLinksNum") {
			var num = 11;
      if (localStorage.getItem("numLinks")) {
				num = localStorage["numLinks"];
			}
			sendResponse({data: num});
    }
  }
);

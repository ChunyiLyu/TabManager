function storage(url) {
	var d = new Date();
	var date = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var time = hours+":"+minutes;
	var storage_var = {
		"url": url,
		"date": date,
		"time": time,
	};
	return storage_var;
}

window.addEventListener('load', function(evt) {
	chrome.tabs.query({}, function (tabs) {

		function openTabs(tabs) {
			var selected = document.getElementById("dropdown").value;
			console.log(selected);
			var allUrls = localStorage[selected];
		  var splitUrls = allUrls.split(" ");
			for (eachUrl of splitUrls) {
				chrome.tabs.create({ url: eachUrl });
			}
		}
		function saveTabs() {
			var storage = {};
			var urls = "";
			for (tab of tabs) {
				urls = urls.concat(" ", tab.url);
			}
			console.log(urls);
			var name = document.getElementById("name").value||"last";
			chrome.runtime.sendMessage({signal: "saveTabs", urls: urls, key: name}, function(response){});
		}
		function snooze() {
			var urlInfo = storage(window.location.href);
			chrome.runtime.sendMessage({signal: "saveUrl", key: urlInfo["time"], value: urlInfo}, function(response){});
		}

		var select = document.getElementById("dropdown");
		for (var i = 0, len = localStorage.length; i < len; ++i ) {
	    var option = document.createElement('option');
	    option.text = option.value = localStorage.key(i);
	    select.add(option, 0);
		}
		document.getElementById('snooze').addEventListener('click', snooze);
    document.getElementById('save').addEventListener('click', saveTabs);
		document.getElementById('open').addEventListener('click', openTabs);
  });
});

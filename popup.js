window.usedLinks = new Set();

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

function parseUrl(url) {
    var urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/);
    var domain = urlParts[0];
    return domain;
}

function scrape() {
	chrome.extension.getBackgroundPage().console.log("inside scrape");

	chrome.extension.getBackgroundPage().console.log("inside executeScript");
	chrome.extension.getBackgroundPage().console.log($('#keyword').val());
	keyword = $('#keyword').val();
	chrome.storage.sync.set({'searchWord': keyword}, function() {
		chrome.tabs.executeScript(null, {file:"scrape.js"}, function() {
		});
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.signal == "Links") {
			chrome.extension.getBackgroundPage().console.log(request.linkArray);
      var urlsArray = Array();
      for (var index in request.linkArray) {
        urlsArray.push(request.linkArray[index]);
				chrome.extension.getBackgroundPage().console.log(request.linkArray[index]);
      }
      chrome.windows.create({'url': urlsArray, 'type': 'normal'}, function(window) { });
    }
});

function openTabs(tabs) {
	var selected = document.getElementById("dropdown").value;
	console.log(selected);
	var allUrls = localStorage[selected];
	var splitUrls = allUrls.split(" ");
	var urlsArray = new Array();
	for (eachUrl of splitUrls) {
		urlsArray.push(eachUrl);
	}
	chrome.extension.getBackgroundPage().console.log(urlsArray.length);
	chrome.windows.create({'url': urlsArray, 'type': 'normal'}, function(window) {
  });
}

function getCurrentTab() {
    chrome.tabs.query({active: true},function (tabs) {
			window.activeTab = tabs[0];
			chrome.extension.getBackgroundPage().console.log(window.activeTab);
    });
}

window.addEventListener('load', function(evt) {
	chrome.tabs.query({}, function (tabs) {
		$('#snoozeController').text("Snooze");
		getCurrentTab();
		function saveTabs() {
			var storage = {};
			var urls = "";
			for (tab of tabs) {
				chrome.extension.getBackgroundPage().console.log(tab.url);
				urls = urls.concat(" ", tab.url);
			}
			chrome.extension.getBackgroundPage().console.log(urls);
			var name = document.getElementById("name").value||"last";
			chrome.runtime.sendMessage({signal: "saveTabs", urls: urls, key: name}, function(response){});
		}
		function snooze() {
      $('#snoozeController').text('Snooze~').css({"background-color":"#DCC7F6", "border-color":"#CEB0F3", "color":"#333"});
			var urlInfo = storage(window.activeTab.url);
			chrome.tabs.remove(window.activeTab.id, function() { });
			chrome.runtime.sendMessage({signal: "saveUrl", key: urlInfo["time"], value: urlInfo}, function(response){});
			chrome.alarms.create('myAlarm', { when : Date.now() + 5000 });
		}
		var select = document.getElementById("dropdown");
		for (var i = 0, len = localStorage.length; i < len; ++i ) {
	    var option = document.createElement('option');
	    option.text = option.value = localStorage.key(i);
	    select.add(option, 0);
		}
		$('#options').click(function () {
			chrome.tabs.create({ url : "config.html" });
		})
		$('#saveTab').click(function() {
			saveTabs();
		});
		$('#openTab').click(function() {
			openTabs();
		});
		$('#openLinks').click(function() {
			scrape();
		});
		$('#snoozeController').hover(function(){ $(this).css({'background-color': ' #CEB0F3',
						       'color': '#4B0082',
						       'border-color': '#E6E6FA'});
					  $(this).text('Snooze~'); }, // on mousenter
			      function(){ $(this).css({'background-color': '#FFC0CB',
						       'color': '#483D8B',
						       'border-color': '#E6E6FA'});
					  $(this).text("Snooze"); // on mouseexit
    });
    $('#snoozeController').click(function() {
			snooze();
		});
    // $('#snoozeController').mousedown(function() {
		// $(this).css({'background-color': '#000',
		// 	     'color': '#bbb'});
	  // });
	  // $('#snoozeController').mouseup(function() {
		// 	$(this).css({'background-color': '#fff',
		// 	  'color': '#333'});
	  //});
	});
});

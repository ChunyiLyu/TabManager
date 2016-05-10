/*
* Popup page javascript
* @ Chunyi Lyu
*/

/* return an object with "url" field */
function storage(url) {
	var storage_var = {
		"url": url,
	};
	return storage_var;
}
/* execute scrape.js */
function scrape() {
	keyword = $('#keyword').val();
	chrome.storage.sync.set({'searchWord': keyword}, function() {
		chrome.tabs.executeScript(null, {file:"scrape.js"}, function() {
		});
	});
}
/* receive links from scrape.js; open all urls in a different window */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.signal == "Links") {
      var urlsArray = Array();
      for (var index in request.linkArray) {
        urlsArray.push(request.linkArray[index]);
      }
      chrome.windows.create({'url': urlsArray, 'type': 'normal'}, function(window) { });
    }
});

/* open a list of urls in a diferent window */
function openTabs(tabs) {
	var selected = document.getElementById("dropdown").value;
	console.log(selected);
	var allUrls = localStorage[selected];
	var splitUrls = allUrls.split(" ");
	var urlsArray = new Array();
	for (eachUrl of splitUrls) {
		urlsArray.push(eachUrl);
	}
	chrome.windows.create({'url': urlsArray, 'type': 'normal'}, function(window) {});
}

/* save the url of current tab to window.activeTab */
function getCurrentTab() {
    chrome.tabs.query({active: true},function (tabs) {
			window.activeTab = tabs[0];
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
				urls = urls.concat(" ", tab.url);
			}
			var name = document.getElementById("name").value||"last";
			chrome.runtime.sendMessage({signal: "saveTabs", urls: urls, key: name}, function(response){});
		}
		function snooze() {
      $('#snoozeController').text('Snooze~').css({"background-color":"#DCC7F6", "border-color":"#CEB0F3", "color":"#333"});
			var urlInfo = storage(window.activeTab.url);
			chrome.tabs.remove(window.activeTab.id, function() { });
			chrome.runtime.sendMessage({signal: "saveUrl", key: urlInfo["time"], value: urlInfo}, function(response){});
		}

    /* populate dropdown bar */
		for (var i = 0; i < localStorage.length; i++) {
	    if (localStorage.key(i) != "time" && localStorage.key(i) !== "numLinks") {
	      $('#dropdown').append($('<option name="'+localStorage.key(i)+'">'+localStorage.key(i)+'</option>'));
	    }
	  }
		/* navigate back to options page*/
		$('#options').click(function () {
			chrome.runtime.openOptionsPage();
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
		/* hover effect */
		$('#snoozeController').hover(function(){ $(this).css({
						'background-color': '#FFC0CB',
						'color': '#B32E2E',
						'border-color': '#E6E6FA'});
			$(this).text('Snoozed~'); }, // on mousenter
      function(){ $(this).css({
						'background-color': '#FFDDE2',
						'color': '#CD5C5C',
						'border-color': '#E6E6FA'});
		  $(this).text("Snooze"); // on mouseexit
    });
    $('#snoozeController').click(function() {
			snooze();
		});
	});
});

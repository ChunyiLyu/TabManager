window.searchWord = "";
function getLinksArray() {
  console.log("inside getLinksArray");
    chrome.storage.sync.get('searchWord', function(obj) {
      window.searchWord = obj["searchWord"];
      console.log(window.searchWord);
      var linksArray = Array();
      var url = window.location.host;
  		var links = document.links;
  		console.log(window.searchWord);
      var i = 0;
      while(i < links.length && linksArray.length < 11){
          if (links[i].href.includes(url) && !links[i].href.includes("#")) {
            // links[i].innerhtml
            if (links[i].href.indexOf(window.searchWord) > -1) {
              linksArray.push(links[i].href);
            }
          }
          i++;
      }
      chrome.runtime.sendMessage({signal: "Links", linkArray: linksArray},
          function() {
            console.log("sent signal Links");
      });

    });
}

getLinksArray();
console.log("ok");

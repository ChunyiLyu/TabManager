function getLinksArray() {
  console.log("inside getLinksArray");
    var linksArray = Array();
    var url = window.location.host;
		var links = document.links;
		console.log(links);

    for(var i=0; i < links.length; i++){
        if (links[i].href.includes(url) && !links[i].href.includes("#")) {
            linksArray.push(links[i].href);
        }
    }
		console.log("size of linksArray" + linksArray.length);
    return linksArray.slice(0, 10);
}
chrome.runtime.sendMessage({signal: "Links", linkArray: getLinksArray()},
  function() {
    console.log("sent signal Links");
  });
console.log("ok");

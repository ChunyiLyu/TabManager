/*
* Options page javascript
* @ Chunyi Lyu
*/
var times = [1, 2, 5, 10, 15, 24];

/* send msg to background page to delete a group of tabs */
function tabDelete() {
  var name = $('#tabsDropdown :selected').text();
  chrome.runtime.sendMessage({signal: "deleteTab", name: name});
}

/* send msg to background page to update standard snooze time */
function snoozeUpdate() {
  var time = times[$("#snoozeDropdown")[0].selectedIndex];
  chrome.runtime.sendMessage({signal: "snoozeUpdate", time: time});
}

/* send msg to background page to update default maximum number of links opened */
function linksUpdate() {
  var num = $('#numLinks').val();
  chrome.runtime.sendMessage({signal: "linksUpdate", num: num})

}

window.addEventListener('load', function(evt) {
  /* populate tabs dropdown */
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "time" && localStorage.key(i) !== "numLinks") {
      $('#tabsDropdown').append($('<option name="'+localStorage.key(i)+'">'+localStorage.key(i)+'</option>'));
    }
  }
    /* populate snooze time dropdown */
  for (var i = 0; i < times.length; i++) {
    $('#snoozeDropdown').append($('<option value="'+times[i]+'">'+times[i] + " hours" +'</option>'));
  }
  /* show the stored snooze time if exists */
  if (localStorage["time"]) {
    $('#snoozeDropdown').val(parseInt(localStorage["time"]));
  }
  /* show the stored maximum number of links if exists */
  if (localStorage["numLinks"]) {
    $('#numLinks').val(localStorage["numLinks"]);
  }
  /* event listeners for three buttons */
  $('#tabDelete').click(function () {
    tabDelete()
  });
  $('#snoozeSave').click(function () {
    snoozeUpdate();
  });
  $('#linksSave').click(function() {
    linksUpdate()
  });
});

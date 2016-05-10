# Tab Manager @ Chunyi Lyu

## Installation
  1. Unzip
  2. Go to chrome://extensions/
  3. Enable Developer mode by ticking the checkbox in the upper-right corner.
  4. Click "Load Unpacked Extension".
  5. Provide path to the unzipped folder.

## Popup page
  1. Click the icon (the cat paw).
  2. Snooze button closes the current tab and reopens it later.
  3. Use the dropdown menu to select from stored settings; click 'open' to open all of the tabs.
  4. Enter a name; click 'Save' to store all of the current opening tabs.
  5. Enter a keyword; new web pages will be opened after clicking 'open'.
  6. Click 'Configure options...' will navigate user back to options page.

## Option page
  1. This is a configuration page.
  2. Go to chrome://extensions/
  3. On the plug-in page, click Options button for this extension.
  4. Select name from the list of 'saved tabs'; delete it by clicking 'Delete' button.
  5. Select the snooze time from the dropdown and save the change. by clicking 'Save' button.
  6. Enter a number for maximum links opened for the search functionality, and click 'Save' to save the change.


## Usage
- 'Tab Manager' is a Chrome extension. It can store the list of opening tab for
opening them later; it can close the current tab and reopen it automatically after a certain time; it can also search through the current web page with a keyword, and opens links that have the keyword in their urls in a new window. These are the functions that I would like to use daily, and one of my goals is to make my life easier with my own extension.


## Implementation
- This project has four different javascript files. 'background.js' is the generally logic of the extension. It receives messages from other javascript files, and it will store, delete, or send from information of the localStorage of the extension. For the 'snooze' functionality, 'background.js' is also responsible to generate the alarm and fire the alarm when it is the time.

- 'popup.js' is the javascript logic for the popup page of the extension. It handles saving/opening tabs, snoozing tab, and searching links. It communicates with 'background.js' through chrome.runtime's message.

- 'options.js' is the logic of the options page. It allows the user to customize different settings, including: delete stored groups of tabs, change the time period for snoozing tabs, and the maximum tabs opened for searching links. It also communicates with 'background.js' for storing or deleting information from storage.

- 'scrape.js' is only called by 'popup.js', when searching links from a web page. Scrapping logic is seperated from 'popup.js', because the popup page does not have access to the content of current web page. The search only looks for keyword in urls, not the title of the urls.

- Most of the information about extension is stored in localStorage, which is a storage space unique to each extension. localStorage is accessable from 'background.js', 'options.js', and 'popup.js', but 'options.js', and 'popup.js' only read from localStorage, whereas 'background.js' modifies it. I also used chrome.sync.storage api for data passing between 'popup.js' and 'scrape.js'.

## Known Bugs
- The dropdown bars in options page do not always display at the right position.
- I am using the alarm api for the snoozing tab functionality. Once the alarm is fired, 'background.js' fails at clear the alarm. Therefore, unless the extensio is reloaded, alarms just get accumulated. I have a temporary solution that the bug, but it dose not solve this bug fundementally.

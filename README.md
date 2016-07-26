# Tab Manager @ Chunyi Lyu
Open sourced on Github: https://github.com/ChunyiLyu/TabManager

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
- 'Tab Manager' is a Chrome extension. It can store the list of opening tabs to
open them later; it can close the current tab and reopen it automatically after a certain time; it can also search through the current web page with a keyword, and opens links that have the keyword in their urls in a new window. These are the functions that I would like to use daily, and one of my goals is to make my life easier with my own extension.


## Implementation
- This project has four different javascript files. 'background.js' is the general logic of the extension. It receives messages from other javascript files, and it will store, delete, or send from information of the localStorage of the extension. For the 'snooze' functionality, 'background.js' is also responsible for generating alarms and to fire the alarm when it is time.

- 'popup.js' is the javascript logic for the popup page of the extension. It handles saving/opening tabs, the snoozing tab, and searching links. It communicates with 'background.js' through chrome.runtime message API.

- 'options.js' is the logic of the options page. It allows the user to customize different settings, including: deleting stored groups of tabs, changing the time period for snoozing tabs, and the maximum tabs opened for searching links. It also communicates with 'background.js' for storing or deleting information from storage.

- 'scrape.js' is only called by 'popup.js', when searching links from a web page. Scrapping logic is separated from 'popup.js', because the popup page does not have access to the content of current web page. The search only looks for keyword in urls, not the title of the urls.

- Most of the information about the extension is stored in localStorage, which is a storage space unique to each extension. localStorage is accessible from 'background.js', 'options.js', and 'popup.js', but 'options.js', and 'popup.js' only read from localStorage, whereas 'background.js' modifies it. I also used chrome.sync.storage api for data passing between 'popup.js' and 'scrape.js'.

## Todos
- The dropdown bars in the options page do not always display at the right position.
- When adding and deleting a group of tabs, the dropdown does not refresh automatically. Changes will be reflected after reopen the popup or options pages.
- I am using the alarm API for the snoozing tab functionality. Once the alarm is fired, 'background.js' fails at clear the alarm. Therefore, unless the extension is reloaded, alarms just get accumulated. I have a temporary solution for the bug, but it does not solve this bug fundamentally.

## Reflection
- My main goals are to learn web development, and to develop a useful tool for myself. I am really glad that I finally had a chance to do more web development, and this was my first time learning html/css as well. I am happy with my final project. This is the extension I want and I will keep using it. I have a new perspective about html/css now, and I am looking forward to learning more front-end development in the future.

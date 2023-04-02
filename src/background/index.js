import refreshItemData from "../utils/refreshItemData.js";

chrome.alarms.onAlarm.addListener(e => refreshItemData());

chrome.alarms.create("", {periodInMinutes: 1}); // TODO: Change it

chrome.action.onClicked.addListener(e => chrome.tabs.create({url: chrome.runtime.getURL("src/page/index.html")}));
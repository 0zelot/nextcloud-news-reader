import { local } from "chrome-storage-promises";

import refreshItemData from "../utils/refreshItemData.js";

(async () => {

    const options = (await local.get("options")).options;
    const periodInMinutes = options?.settings?.refreshRate || 5;

    chrome.alarms.onAlarm.addListener(e => refreshItemData());
    chrome.alarms.create("", {periodInMinutes});

})();

chrome.action.onClicked.addListener(e => chrome.tabs.create({url: chrome.runtime.getURL("src/page/index.html")}));
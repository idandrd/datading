const notications = {};

chrome.runtime.onMessage.addListener(({ resultStats }, sender) => {
  chrome.notifications.create(
    resultStats,
    {
      type: "basic",
      title: "Databricks Cell Run Complete",
      message: resultStats,
      iconUrl: "images/icons/38.png",
    },
    (notificationId) => {
      notications[notificationId] = {
        tabId: sender.tab.id,
        windowId: sender.tab.windowId,
      };
    }
  );
});

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId in notications) {
    const { tabId, windowId } = notications[notificationId];
    chrome.tabs.update(tabId, { active: true });
    chrome.windows.update(windowId, { focused: true });
  }
});

chrome.runtime.onMessage.addListener(({ resultStats }, sender) => {
  chrome.tabs.update(sender.tab.id, { active: true });
  chrome.windows.update(sender.tab.windowId, {focused: true});
  chrome.notifications.create(resultStats, {
    type: "basic",
    title: "Databricks Cell Run Complete",
    message: resultStats,
    iconUrl: "images/icons/38.png",
  });
});

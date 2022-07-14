chrome.runtime.onMessage.addListener(({ resultStats }) => {
  chrome.notifications.create(resultStats, {
    type: "basic",
    title: "Databricks Cell Run Complete",
    message: resultStats,
    iconUrl: "images/icons/38.png",
  });
});

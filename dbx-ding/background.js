chrome.runtime.onMessage.addListener((message, callback) => {
  // alert('yo')
  chrome.notifications.create("NOTFICATION_ID", {
      type: "basic",
      title: "notification title",
      message: "notification message",
      iconUrl: "images/icons/38.png"
    });
});
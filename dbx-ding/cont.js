(() => {
  const CELL_CLASS = "command-with-number";
  const COMMENT_CLASS = "cm-comment";
  const RESULTS_CLASS = "command-result-stats";
  const DING_BUTTON_ACTIVE_CLASS = "ding-button-active";
  const DING_BUTTON_CLASS = "ding-button";
  const DING_FLAGS = ["# ding", "-- ding", "// ding"];

  function notif(resultStats) {}

  let ids = {};
  let startLocation = getCurrentLocation();

  addStyle();
  setInterval(scan, 250);

  function scan() {
    insertButtons();
    if (getCurrentLocation() !== startLocation) {
      // The IDs are per notebook
      // If the user navigated to the notebook without full page reload we need to flush them
      ids = {};
      startLocation = getCurrentLocation();
    }

    if (Object.keys(ids).length !== 0) {
      // If there are no IDs yet we assume that the page just loaded and we don't want to ding
      [...document.getElementsByClassName(CELL_CLASS)].forEach((cell) => {
        const hasDingFlag = [
          ...cell.getElementsByClassName(COMMENT_CLASS),
        ].some((comment) => DING_FLAGS.includes(comment.textContent));
        const dingButtonActive = cell.querySelector(
          `.${DING_BUTTON_ACTIVE_CLASS}`
        );
        if (hasDingFlag || dingButtonActive) {
          const resultStats = cell.querySelector(
            `.${RESULTS_CLASS}`
          )?.textContent;
          if (resultStats && !(resultStats in ids)) {
            play(resultStats);
          }
        }
      });
    }
    burnIds();
  }

  function burnIds() {
    [...document.getElementsByClassName(RESULTS_CLASS)].forEach(
      (resultStats) => {
        ids[resultStats.textContent] = true;
      }
    );
  }

  function play(resultStats) {
    chrome.storage.local.get(
      ["sound", "soundDisabled", "notificationDisabled"],
      (result) => {
        // if (!result.soundDisabled) {
        //   const sound = result.sound || "classic.mp3";
        //   // https://stackoverflow.com/a/27496510/8924226
        //   let url = chrome.runtime.getURL(`sounds/${sound}`);
        //   let a = new Audio(url);
        //   a.play();
        // }
        if (!result.notificationDisabled) {
          chrome.runtime.sendMessage({ resultStats });
        }
      }
    );
  }

  function getCurrentLocation() {
    return window.location.href.split("/command/")[0];
  }

  function addStyle() {
    const style = document.createElement("style");
    style.innerHTML =
      ".ding-button-active {color: var(--notebook-cell-button-active-color) !important;}";
    document.head.appendChild(style);
  }

  function insertButtons() {
    [...document.getElementsByClassName("command-buttons")].forEach((menu) => {
      if (menu.getElementsByClassName(DING_BUTTON_CLASS).length === 0) {
        const buttonWrapper = document.createElement("div");
        const buttonHTML = `<a onclick="event.preventDefault();this.classList.toggle('${DING_BUTTON_ACTIVE_CLASS}');" href="#" role="button" class="${DING_BUTTON_CLASS} comment-button command-button" title="ding"><i aria-hidden="true" class="fa fa-bell fa-fw" style="text-align: center;"></i></a>`;
        buttonWrapper.innerHTML = buttonHTML;
        dingButton = buttonWrapper.firstChild;
        menu.insertBefore(dingButton, menu.firstChild);
      }
    });
  }
})();

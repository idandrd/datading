(() => {
  const CELL_CLASS = "command-with-number";
  const COMMENT_CLASS = "cm-comment";
  const RESULTS_CLASS = "command-result-stats";
  const DING_FLAG = "# ding";

  let ids = {};
  let startLocation = getCurrentLocation();

  setInterval(scan, 250);

  function scan() {
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
        ].some((comment) => comment.textContent === DING_FLAG);
        if (hasDingFlag) {
          const resultStats = cell.querySelector(
            `.${RESULTS_CLASS}`
          )?.textContent;
          if (resultStats && !(resultStats in ids)) {
            play();
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

  function play() {
    // https://stackoverflow.com/a/27496510/8924226
    let url = chrome.runtime.getURL("note.mp3");
    let a = new Audio(url);
    a.play();
  }

  function getCurrentLocation() {
    return window.location.href.split("/command/")[0];
  }
})();

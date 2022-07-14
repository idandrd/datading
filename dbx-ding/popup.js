const soundRadioClass = "soundRadio";
const soundSwitchId = "soundSwitch";

chrome.storage.local.get(["sound", "soundEnabled"], function (result) {
  const sound = result.sound || "classic.mp3";
  const radio = document.getElementById(sound);
  if (radio) radio.checked = true;

  const soundEnabled = result.soundEnabled;
  const soundSwitch = document.getElementById(soundSwitchId);
  if (soundSwitch) soundSwitch.checked = soundEnabled;
  disableRadios(soundEnabled);
});

[...document.getElementsByClassName(soundRadioClass)].forEach((radio) =>
  radio.addEventListener("change", (event) => {
    event.target.checked && setSound(event.target.id);
  })
);

document.getElementById(soundSwitchId).addEventListener("change", (event) => {
  const soundEnabled = event.target.checked;
  chrome.storage.local.set({ soundEnabled });
  disableRadios(soundEnabled);
});

function setSound(value) {
  chrome.storage.local.set({ sound: value });
}

function disableRadios(soundEnabled) {
  [...document.getElementsByClassName(soundRadioClass)].forEach(
    (radio) => (radio.disabled = !soundEnabled)
  );
}

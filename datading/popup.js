const soundRadioClass = "soundRadio";
const soundSwitchId = "soundSwitch";
const notificationSwitchId = "notificationSwitch";

chrome.storage.local.get(["sound", "soundDisabled", "notificationDisabled"], function (result) {
  const sound = result.sound || "classic.mp3";
  const radio = document.getElementById(sound);
  if (radio) radio.checked = true;

  const soundDisabled = result.soundDisabled;
  const soundSwitch = document.getElementById(soundSwitchId);
  if (soundSwitch) soundSwitch.checked = !soundDisabled;
  disableRadios(soundDisabled);
  
  const notificationDisabled = result.notificationDisabled
  const notificationSwitch = document.getElementById(notificationSwitchId);
  if (notificationSwitch) notificationSwitch.checked = !notificationDisabled;
});

[...document.getElementsByClassName(soundRadioClass)].forEach((radio) =>
  radio.addEventListener("change", (event) => {
    event.target.checked && setSound(event.target.id);
  })
);

document.getElementById(soundSwitchId).addEventListener("change", (event) => {
  const soundDisabled = !event.target.checked;
  chrome.storage.local.set({ soundDisabled });
  disableRadios(soundDisabled);
});

document.getElementById(notificationSwitchId).addEventListener("change", (event) => {
  const notificationDisabled = !event.target.checked;
  chrome.storage.local.set({ notificationDisabled });
});

function setSound(value) {
  chrome.storage.local.set({ sound: value });
}

function disableRadios(soundDisabled) {
  [...document.getElementsByClassName(soundRadioClass)].forEach(
    (radio) => (radio.disabled = soundDisabled)
  );
}

document.getElementById('classicRadio').addEventListener('change', () => setSound('classic.mp3'))
document.getElementById('scifiRadio').addEventListener('change', () => setSound('scifi.wav'))
document.getElementById('gameRadio').addEventListener('change', () => setSound('game.wav'))

function setSound(value) {
  chrome.storage.local.set({'sound': value}, function() {
    console.log('Value is set to ' + value);
  });
}
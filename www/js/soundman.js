document.addEventListener('deviceready', onDeviceReady, false);
var media;

//function onDeviceReady() {
//	document.querySelector("#playMp3").addEventListener("touchend", playMP3, false);
//};

function playMP3(m) {
    var mp3URL = getMediaURL("res/"+m+".mp3");
    media = new Media(mp3URL, null, mediaError, onStatus);
    media.play();
}

function playSound(m) {
    var mp3URL = getMediaURL("res/"+m+".mp3");
    var snd = new Media(mp3URL, null, mediaError);
    snd.play();
}

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "file:///android_asset/www/" + s;
    return s;
}

// onError Callback 
function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

// onSuccess Callback
function onSuccess() {
}

// onStatus Callback 
function onStatus(status) {
  if( status==Media.MEDIA_STOPPED ) {
    media.play();
  }
}
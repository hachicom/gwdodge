function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextLevelUp(level,sabbath){
  levelcalc = level - (sabbath * 7);
  nextvalret = Math.round((( 0.04 * (Math.pow(levelcalc , 3)) + 0.8 * (Math.pow(levelcalc,2)) + 2 * levelcalc))/2)+ 4 + sabbath;
  if(nextvalret>16) nextvalret=16;
  return nextvalret;
}

function isMobile(){
  var vMobile;
  vMobile = /Android/i.test(navigator.userAgent);
  //A linha abaixo é para debug. Ao compilar, comentá-la para usar funções do Phonegap
  //vMobile = false;
  
  return vMobile;
}

//check localstorage support - by ZOUHAIR SERRAR
//http://www.gameplaypassion.com/blog/how-to-save-game-data-in-browser-html5-localstorage/
function isLocalStorageSupported() 
{
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } 
  catch (e) {
    return false;
  }
}

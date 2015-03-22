function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextLevelUp(level){
  return Math.round( 0.04 * (Math.pow(level , 3)) + 0.8 * (Math.pow(level,2)) + 2 * level) + 2;
}

function isMobile(){
  var vMobile;
  vMobile = /Android/i.test(navigator.userAgent);
  //A linha abaixo é para debug. Ao compilar, comentá-la para usar funções do Phonegap
  //vMobile = false;
  
  return vMobile;
}

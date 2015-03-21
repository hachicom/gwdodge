function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isMobile(){
  var vMobile;
  vMobile = /Android/i.test(navigator.userAgent);
  //A linha abaixo é para debug. Ao compilar, comentá-la para usar funções do Phonegap
  vMobile = false;
  
  return vMobile;
}

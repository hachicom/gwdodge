var keeploop = true;
var hiscore = 1000;
var paused = false;
var jumpSnd, bgmstatus, bgm, intro, introstatus, hit, coin, crash, powerup, bonus, bonusstatus;
var isAndroid = isMobile();
var scoreRewards = [1000,5000,10000,50000];
var soundOn = true;
var playerData = {
  scoretable: {
		hiscore: 1000
	},
  settings: {
		sound: true
	},
	// ...
}; 

//Desligando os eventos de mouse (Android hack)
document.addEventListener('mousedown', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('mouseup', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('mousemove', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('click', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('touchend', function(e) {
    e.preventDefault();
}, false);


//game global difficulty variables
var levelUpAt = 4;

// 1 - Start enchant.js
enchant();
 
// 2 - On document load 
window.onload = function() {
  //console.log(screen.width+"X"+screen.height);
  var gameheight = (320 * screen.height)/screen.width;
	// 3 - Starting point
	var game = new Core(320, gameheight);
	// 4 - Preload resources
	game.preload('res/penguinSheet.png',
               'res/Ice.png',
               'res/IceFrag.png',
               'res/heart.png',
               'res/fishSheet.png',
               'res/piranhaSheet.png',
               'res/yukiSheet.png',
               'res/iglooSheet.png',
               'res/mountain.png',
               'res/groundSheet.png',
               'res/title.png',
               'res/dpad.png',
               'res/brackets.png',
               'res/pause.png',
               'res/font0_0.png');
  
	// 5 - Game settings
	game.fps = 30;
	//game.scale = 1;
	// 6 - Once Game finishes loading
  game.onload = function() {
		// 1 - Variables
    enchant.bmfont.createFont('score', 'res/font0.fnt', game.assets['res/font0_0.png']);
    var scene;
    
    if (isLocalStorageSupported())
    {
	    console.log("Supports Save!");
      playerDataTmp = JSON.decode(localStorage["playerData"]);
      if (playerDataTmp!=null) playerData = playerDataTmp;
      console.dir(playerData);
    }
    else
    {
      console.log("Doesn't support Save!");
      localStorage = [];
    }
    hiscore = playerData.scoretable.hiscore;
    soundOn = playerData.settings.sound;
    
    // 2 - New scene
    scene = new SceneTitle();
    game.pushScene(scene);
	}
  
  // Set Phonegap Events
  if( isAndroid ) {
    document.addEventListener("deviceready", function ()
    {
      bgmstatus = introstatus = 0;
	    bgm = new Media("file:///android_asset/www/res/bgm.ogg",
	      function() {
	        if(keeploop==true) this.play();
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      },
	      function(status){
	      	bgmstatus=status;
	      }
	    );      
      
	    bonus = new Media("file:///android_asset/www/res/bonus.ogg",
	      function() {
	        //if(keeploop==true) this.play();
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      },
	      function(status){
	      	bonusstatus=status;
	      }
	    );
      
      intro = new Media("file:///android_asset/www/res/intro.ogg",
	      function() {
	        //if(keeploop==true) this.play();
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      },
	      function(status){
	      	introstatus=status;
	      }
	    );
	    
	    hit = new Media("file:///android_asset/www/res/hit.wav",
	      function() {
	        //console.log("Audio Success");
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      }
	    );
	    
	    coin = new Media("file:///android_asset/www/res/fish.wav",
	      function() {
	        //console.log("Audio Success");
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      }
	    );
	    
	    crash = new Media("file:///android_asset/www/res/break.wav",
	      function() {
	        //console.log("Audio Success");
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      }
	    );
	    
	     powerup = new Media("file:///android_asset/www/res/powerup.wav",
	      function() {
	        //console.log("Audio Success");
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      }
	    );
	    
	    jumpSnd = new Media("file:///android_asset/www/res/jump.wav",
	      function() {
	        //console.log("Audio Success");
	      },
	      function(err) {
	        console.log(JSON.stringify(err));
	      }
	    );
      
      document.addEventListener("pause", function() {
        keeploop=false;
        if(bgmstatus==2)bgm.pause();
        if(introstatus==2)intro.stop();
        if(bonusstatus==2)bonus.stop();
        game.stop();
        console.log("paused");
        //cr_setSuspended(true);
      }, false);

      document.addEventListener("resume", function() {
        keeploop=true;
        if(bgmstatus==3 && !paused) bgm.play();
        game.resume();
        console.log("resumed");
        //cr_setSuspended(false);
      }, false);

      document.addEventListener("backbutton", onBackKeyDown, false);
            
      function onBackKeyDown(){
	      game.stop();
	      navigator.notification.confirm(
	        'Deseja sair do jogo?', // message
	        onConfirm, // callback to invoke with index of button pressed
	        'Confirmar', // title
	        ['Cancelar','Sair'] // buttonLabels
	      );
	    }
	
	    function onConfirm(buttonIndex) {
	      if(buttonIndex == 2){
	        if (navigator && navigator.app) {
	          navigator.app.exitApp();
	          console.log("exiting app");
	        } else {
	          if (navigator && navigator.device) {
	            navigator.device.exitApp();
	            console.log("exiting device");
	          }
	        }
	        keeploop=false;
	        if(bgmstatus==2)bgm.stop();
          if(introstatus==2)intro.stop();
          if(bonusstatus==2)bonus.stop();
	        //bgm.release();
	        console.log("exited");
	      }else game.resume();
	    }
      
    }, false);
    
    admob.initAdmob("ca-app-pub-8006522456285045/2785327219","ca-app-pub-8006522456285045/4262060411");
    var admobParam=new  admob.Params();
		//admobParam.extra={'keyword':"admob phonegame"};
		//admobParam.isForChild=true;
		admobParam.isTesting=true;
    admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_APP,admobParam);
  }
  
	// 7 - Start
  game.start();
  //window.scrollTo(0, 1);
  
  // SceneGame  
  var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
      var game, label, bg, penguin, iceGroup, map;

      // 1 - Call superclass constructor
      Scene.apply(this);
      // 2 - Access to the game singleton instance
      game = Game.instance;
      keeploop=true;
      // 3 - Create child nodes
      // Background
      bg = new Sprite(320,128);
      bg.y = 200;
      bg.scale(1,2);
      bg.image = game.assets['res/mountain.png'];
      this.backgroundArray = ['#51e4ff','#0064fa','#000000'];
      this.backgroundColor = this.backgroundArray[0];
      map = new Map(32, 32);
      //map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
            
      //UI
      gui = new Sprite(320,56);
      gui.backgroundColor = '#000000';
      // Label
      label = new FontSprite('score', 128, 32, 'SC 0');
      label.x = 8;
      label.y = 0;
      this.scoreLabel = label;
      
      label6 = new FontSprite('score', 144, 16, 'TOP 0');
      label6.x = 160;
      label6.y = 0;
      this.hiscoreLabel = label6;
      
      label5 = new FontSprite('score', 96, 32, 'SNOW_ 3');
      label5.x = 100;
      label5.y = 24;
      this.livesLabel = label5;
      
      label3 = new FontSprite('score', 96, 32, 'FISH_0');
      label3.x = 177;
      label3.y = 24;
      this.coinsLabel = label3;
      
      label2 = new FontSprite('score', 80, 32, 'LVL_0');
      label2.x = 268;
      label2.y = 24;
      this.levelLabel = label2;
      
      label4 = new FontSprite('score', 256, 32, 'COLETE 4 PEIXES!');
      label4.x = 32;
      label4.y = 140;
      this.msgLabel = label4;
      
      bracket1 = new Sprite(5, 32);
      bracket1.image = game.assets['res/brackets.png'];
      bracket1.frame = 1;
      bracket1.x = 93;
      bracket1.y = 24;
      
      bracket2 = new Sprite(11, 32);
      bracket2.image = game.assets['res/brackets.png'];
      bracket2.x = 164;
      bracket2.y = 24;
      
      bracket3 = new Sprite(11, 32);
      bracket3.image = game.assets['res/brackets.png'];
      bracket3.x = 257;
      bracket3.y = 24;
      
      bracket4 = new Sprite(4, 32);
      bracket4.image = game.assets['res/brackets.png'];
      bracket4.x = 314;
      bracket4.y = 24;
      
      dpad = new Sprite(320,156);
      dpad.x = 0;
      dpad.y = game.height - 156;
      dpad.opacity = 0.5;
      dpad.image = game.assets['res/dpad.png'];       
      dpad.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      this.dpad = dpad;
      
      labelPause = new Sprite(64, 64);
      labelPause.image = game.assets['res/pause.png'];
      labelPause.x = 246;
      labelPause.y = 70;
      labelPause.opacity = 0.6;
      labelPause.addEventListener(Event.TOUCH_START,this.pauseGame);
      
      // Penguin
      penguin = new Penguin(145,288);
      this.penguin = penguin;
      
      // Igloo & Yuki
      igloo = new Igloo(282,208,levelUpAt);
      this.igloo = igloo;
      yuki = new Yuki(272,288,levelUpAt);
      this.yuki = yuki;
      
      // Ice group
      iceGroup = new Group();
      this.iceGroup = iceGroup;
      // Fish group
      fishGroup = new Group();
      this.fishGroup = fishGroup;
      // Heart group
      heartGroup = new Group();
      this.heartGroup = heartGroup;
      
      // Instance variables
      this.paused = false;
      this.startLevelMsg = 1.5;
      this.generateIceTimer = 0;
      this.generateFishTimer = 0;
      this.createPiranha = getRandom(4,6);
      this.fishCount = 0;
      this.fishTimerExp = 20;
      this.heartTimer = 25;
      this.fishTimer = getRandom(3,6)*this.fishTimerExp;
      this.lives = 3;
      this.score = 0;
      this.multiplier = 1;
      this.coins = 0;
      this.hearts = 0;
      this.level = 1; //LEVEL SELECT
      this.levelcalc = this.level;
      this.levelUpAt = levelUpAt;
      this.iceTimer = 320;
      this.gotHit = false;
      this.hitDuration = 0;
      this.buying = false;
      this.buyDuration = 0; 
      this.sabbath = 0;
      this.bonusMode = false;
      this.bonusDuration = 0; 
      this.heartsGenerated = 0;
      this.scoreTarget = 0; //posição de scoreRewards que aumenta ao ser atingida
      this.winGame = 0; //ao passar do level 21, considera o jogo ganho e apresenta uma mensagem de parabéns no SceneGameOver
      
      // Background music
      if( isAndroid ) {
        this.bgm = bgm;
        if(soundOn) this.bgm.play();
        //this.jumpSnd = jumpSnd;
      }else{
        //this.bgm = game.assets['res/bgm.mp3']; // Add this line
        //this.jumpSnd = game.assets['res/jump.wav'];
        // Start BGM
        //if(soundOn) this.bgm.play();
      }
      
      // 4 - Add child nodes
      this.addChild(gui);
      //this.addChild(bg);
      this.addChild(map);
      this.addChild(igloo);
      this.addChild(penguin);
      this.addChild(yuki);
      this.addChild(iceGroup);
      this.addChild(fishGroup);
      this.addChild(heartGroup);
      this.addChild(label3);
      this.addChild(label2);
      this.addChild(label);
      this.addChild(label4);
      this.addChild(label5);
      this.addChild(label6);
      this.addChild(bracket1);
      this.addChild(bracket2);
      this.addChild(bracket3);
      this.addChild(bracket4);
      this.addChild(dpad);
      this.addChild(labelPause);
      
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    pauseGame: function (evt) {
      if(this.parentNode.paused == false) {
        this.parentNode.paused = true;
        if( isAndroid ) {
          keeploop = false; 
          //bgm.pause();
        }
        if(soundOn) this.parentNode.bgm.pause();        
      }else {
        this.parentNode.paused = false;
        if( isAndroid ) {
          keeploop = true; 
          if(soundOn) this.parentNode.bgm.play();
        }
      }
      paused = this.parentNode.paused;
    },
    
    handleTouchControl: function (evt) {
      var playSnd, lane;
      if(!this.parentNode.paused){
        if(this.parentNode.gotHit!=true && this.parentNode.buying!=true && this.parentNode.startLevelMsg<=0){
          if(evt.x > game.width/2) lane=1;
          else lane=-1;
          
          //Verifica a posição do pinguim e dependendo do caso dispara um som
          playSnd = this.parentNode.penguin.switchToLaneNumber(lane,this.parentNode.igloo.isLit,this.parentNode.yuki.isThere);
          if (playSnd=='jump') { //apenas moveu o pinguim
            if( isAndroid ){
              if(soundOn) {
                jumpSnd.seekTo(1);
                jumpSnd.play();
              }
            }/* else{
              if(soundOn) this.parentNode.jumpSnd.play();
            } */
          }else if(playSnd=='powerup') { //dispara o modo de entrega dos peixes
            if( isAndroid ) {
              if(soundOn) powerup.play();
            }/* else{
              if(soundOn) game.assets['res/powerup.wav'].play();
            } */
            this.parentNode.buying=true;
            this.parentNode.setCoins(this.parentNode.levelUpAt*(-1));
          }
        }
      }
      evt.stopPropagation();
      evt.preventDefault();
    },
    
    setScore: function (value,multi) {
      if (multi) this.score = this.score + (value * this.multiplier);
      else this.score = this.score + value;
      if (this.score >= scoreRewards[this.scoreTarget]){
        if(this.scoreTarget<=scoreRewards.length){
          this.lives+=1;
          this.scoreTarget+=1;
        }
      }
      if (this.score >= 99999) {
        this.score = 99999;
        this.winGame = 2;
      }
      if (this.score >= hiscore) hiscore = this.score;
    },
    
    setCoins: function (value) {
      this.coins = this.coins + value;
      this.igloo.turnLights(this.coins);
      this.yuki.smile(this.coins);
    },
    
    setHearts: function (value) {
      this.hearts = this.hearts + value;
    },
    
    incLevelUp: function(){
      this.level = this.level+1;
      if(this.level%2==0){
        this.fishTimerExp = this.fishTimerExp/2;
        if (this.fishTimerExp <=5) this.fishTimerExp=5;
      }
      if(this.level%7==0){
        this.sabbath++;
        this.iceTimer = this.iceTimer/2;
        if (this.iceTimer <=80) this.iceTimer = 80;
        this.levelUpAt = 30;
        this.fishTimerExp = 20 - (2*this.sabbath);
        this.heartTimer = 25 - (this.sabbath * 5);
        if(this.heartTimer <= 10) this.heartTimer = 10;
        this.bonusMode = true;
        
        //deal with music change
        if( isAndroid ) {
          if(soundOn) {
            keeploop = false;
            this.bgm.stop();
            this.bgm = bonus;
            this.bgm.play();
          }
        }else{
          console.log('ok');
          //game.assets['res/powerup.wav'].play();
        }
        
      }else this.levelUpAt = nextLevelUp(this.level,this.sabbath);
      if (this.level == 28) this.winGame = 1;
      if (this.winGame == 2) {
        if( isAndroid ) {
          keeploop = false;
        }
        if(soundOn) this.bgm.stop();
        game.replaceScene(new SceneGameOver(this.scoreLabel,this.coinsLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
      }
    },
    
    update: function(evt) {
      if(!this.paused){
        coinstr = levelupstr = '';
        if(this.coins < 10) coinstr = '0';
        if(this.levelUpAt < 10) levelupstr = '0';
        
        this.scoreLabel.text = 'SC ' + this.score;// + '_x' + this.multiplier;
        this.coinsLabel.text = 'PEIXE_' + coinstr + this.coins + '/' + levelupstr + this.levelUpAt;//+ '<br>' + this.generateFishTimer;
        this.levelLabel.text = 'LVL_ ' + this.level;// + ' - ' + this.iceTimer+ '<br>' + this.generateIceTimer;
        this.livesLabel.text = 'SNOW_ ' + this.lives;
        this.hiscoreLabel.text = 'TOP '+hiscore;
        if(this.bonusMode == true) this.coinsLabel.text = 'BONUS_STAGE';
        
        if(this.gotHit!=true && this.buying!=true && this.bonusMode!=true){
          // Deal with start message        
          if(this.startLevelMsg>0) {
            this.startLevelMsg-=evt.elapsed * 0.001;
            this.msgLabel.text = '    ROUND '+ this.level +'_COLETE ' + this.levelUpAt + ' PEIXES!';
          }
          else if(this.coins == this.levelUpAt) this.msgLabel.text = 'LEVE OS PEIXES_  PARA YUKI!!!';
          else this.msgLabel.text = '';
        
          // Check if it's time to create a new set of obstacles
          if(this.startLevelMsg<=0) {
            this.levelcalc = this.level - (this.sabbath * 7);
            
            if(this.levelcalc<3) this.generateIceTimer += 2;
            else this.generateIceTimer += 2 + (this.levelcalc - 2);
            if (this.generateIceTimer >= this.iceTimer) {
              var ice;
              this.generateIceTimer = 0;
              
              //limit to 4 ice cubes at the screen
              if(this.iceGroup.childNodes.length<=4){
                ice = new Ice(Math.floor(Math.random()*3),this.levelcalc);
                this.iceGroup.addChild(ice);
              }
            }
            
            // Check if it's time to make fish jump
            if(this.coins != this.levelUpAt){
              this.generateFishTimer += 1;
              if (this.generateFishTimer >= this.fishTimer) {
                var fish, isPiranha;
                this.generateFishTimer = 0;
                isPiranha = false;
                this.fishCount++;
                if(this.fishCount==this.createPiranha) {
                  if(this.levelcalc>=3) isPiranha = true;
                  this.fishCount = 0;
                  this.createPiranha = getRandom(4,6);
                }
                fish = new Fish(Math.floor(Math.random()*3),this.levelcalc, isPiranha);
                this.fishGroup.addChild(fish);
                this.fishTimer = getRandom(3,6)*this.fishTimerExp;
              }
            }
          }
        
          // Check collision
          // Ice collision
          for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];
            if(ice.y<=260){
              if (ice.intersect(this.penguin) && this.penguin.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn) hit.play();
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                //console.log(ice.y);
                ice.crashToPieces();
                this.gotHit = true; 
                this.penguin.gotHit();
                if( isAndroid ) {
                  keeploop = false; 
                  this.bgm.stop();
                }
                break;
              }
            }else{
              //this.iceGroup.removeChild(ice);
              if( isAndroid ) {
                if(soundOn) {
                  crash.seekTo(1);
                  crash.play();
                }
              }/* else{
                if(soundOn) game.assets['res/break.wav'].play();
              } */
              ice.crashToPieces();
              //this.setScore(1);
            }
          }
          
          // Fish collision
          for (var i = this.fishGroup.childNodes.length - 1; i >= 0; i--) {
            var fish;
            fish = this.fishGroup.childNodes[i];
            if (fish.intersect(this.penguin) && this.coins < this.levelUpAt){
              if(fish.piranha && !fish.ascending && fish.y<284){
                if( isAndroid ) {
                  if(soundOn) hit.play();
                }
                this.gotHit = true; 
                this.penguin.gotHit();
                if( isAndroid ) {
                  keeploop = false;
                  this.bgm.stop();
                }
                break;
              }else if(!fish.piranha){
                if( isAndroid ) {
                  if(soundOn) {
                    coin.seekTo(1);
                    coin.play();
                  }
                }/* else{
                  if(soundOn) game.assets['res/fish.wav'].play();
                } */
                this.setScore(10,false);
                this.setCoins(1);
                //if(this.multiplier<8) this.multiplier=this.multiplier * 2; 
                this.fishGroup.removeChild(fish);
                break;
              }
            }
          }
        }
        
        //Atingido: dispara o timer e parte para o game over no término
        if(this.gotHit==true){
          //game.stop();
          this.hitDuration += evt.elapsed * 0.001; 
          if(this.hitDuration >= 1.5){
            //this.iceGroup.removeChild(ice);
            //game.resume();
            if(this.lives==0){
              if( isAndroid ) {
                keeploop = false; 
                //bgm.stop();
              }
              //this.bgm.stop();
              game.replaceScene(new SceneGameOver(this.scoreLabel,this.coinsLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
            }else{
              this.gotHit=false;
              this.hitDuration=0;
              this.lives-=1;
              this.multiplier=1;
              for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
                var ice;
                ice = this.iceGroup.childNodes[i];
                this.iceGroup.removeChild(ice);
              }
              for (var i = this.fishGroup.childNodes.length - 1; i >= 0; i--) {
                var fish;
                fish = this.fishGroup.childNodes[i];
                this.fishGroup.removeChild(fish);
              }
              this.penguin.resetPosition();
              if( isAndroid ) {
                keeploop = true; 
                if(soundOn) this.bgm.play();
                //bgm.play();
              }
            }
          }
        }
        
        //Comprando(iglu ou Yuki): dispara o timer, executa as ações necessárias e libera o jogador ao término
        if(this.buying==true){
          this.msgLabel.text = 'BONUS '+(10*this.levelUpAt)*(this.sabbath+1) + 'pts';
          for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
            var ice;
            ice = this.iceGroup.childNodes[i];
            ice.crashToPieces();
          }
          //game.stop();
          this.buyDuration += evt.elapsed * 0.001; 
          this.penguin.shopping();
          this.yuki.kiss(this.penguin.lane);
          // if(this.hitDuration <= 1 && this.duration){
          // }
          if(this.buyDuration >= 2){
            //this.iceGroup.removeChild(ice);
            //game.resume();
            for (var i = this.fishGroup.childNodes.length - 1; i >= 0; i--) {
              var fish;
              fish = this.fishGroup.childNodes[i];
              this.fishGroup.removeChild(fish);
            }
            this.buying=false; 
            //this.penguin.shopping(false);
            this.buyDuration = 0;
            if (this.penguin.lane==2) {
              this.setScore((10*this.levelUpAt)*(this.sabbath+1),false);           
              this.incLevelUp();
            }
            this.yuki.smile(this.coins);
            this.yuki.price = this.igloo.price = this.levelUpAt;
            this.startLevelMsg = 1.5;
            if(this.levelcalc<=1) this.backgroundColor = this.backgroundArray[0];
            else if(this.levelcalc<=3) this.backgroundColor = this.backgroundArray[1];
            else this.backgroundColor = this.backgroundArray[2];
            this.penguin.resetPosition();
            //break;
          }
        }
        
        // Bonus Stage Mode
        if(this.bonusMode == true){
          // Deal with start message        
          if(this.startLevelMsg>0) {
            this.startLevelMsg-=evt.elapsed * 0.001;
            this.msgLabel.text = '    ROUND '+ this.level +'_  BONUS ROUND';
          }else this.msgLabel.text = ' CORAçÕES: '+this.hearts;
          
          // Check if it's time to make hearts
          if(this.startLevelMsg<=0) {
            if(this.heartsGenerated < this.levelUpAt){
              this.yuki.kiss(2);
              this.generateFishTimer += 1;
              if (this.generateFishTimer >= this.heartTimer) {
                var ice;
                this.generateFishTimer = 0;
                heart = this.yuki.giveHeart(getRandom(1,3)*(-1));
                this.heartGroup.addChild(heart);
                this.heartsGenerated++;
              }
            }
          }
          
          // Heart collision
          for (var i = this.heartGroup.childNodes.length - 1; i >= 0; i--) {
            var heart;
            heart = this.heartGroup.childNodes[i];
            if (heart.intersect(this.penguin)){
              if( isAndroid ) {
                if(soundOn) {
                  coin.seekTo(1);
                  coin.play();
                }
              }/* else{
                game.assets['res/fish.wav'].play();
              } */
              //this.setScore(2,false);
              this.setHearts(1);
              this.heartGroup.removeChild(heart);
              break;
            }
          }
          
          if(this.heartGroup.childNodes.length == 0 && this.heartsGenerated >= this.levelUpAt){
            this.bonusDuration += evt.elapsed * 0.001; 
            if(this.hearts==this.levelUpAt) this.msgLabel.text += '_PERFECT! 2000pts';
            else this.msgLabel.text += 'x10_BONUS '+10*this.hearts + 'pts';
            this.penguin.movable = false;
            this.penguin.lane = 2;
            this.penguin.shopping();
          }
            
          if(this.bonusDuration >=2) {
            if(this.hearts==this.levelUpAt)this.setScore(2000,false);
            else this.setScore(10*this.hearts,false);
            
            this.bonusMode = false;
            this.incLevelUp();
            this.yuki.smile(this.coins);
            this.yuki.price = this.igloo.price = this.levelUpAt;
            this.startLevelMsg = 1.5;
            this.bonusDuration = 0;
            this.heartsGenerated = 0;
            this.hearts = 0;
            this.penguin.movable = true;
            this.backgroundColor = this.backgroundArray[0];
            this.penguin.resetPosition();
            
            if( isAndroid ) {
              if(soundOn) {
                this.bgm.stop();
                this.bgm = bgm;
                keeploop = true;
                this.bgm.play();
              }
            }
          }
        }
        
        // Loop BGM
        /* if( isAndroid ) {
          //if(bgm.getCurrentPosition() >= bgm.getDuration()) bgm.play();
        }
        else
        if (this.bgm.currentTime >= this.bgm.duration ){
          if(soundOn) this.bgm.play();
        } */
        
        // If Samsung android browser is detected
        if (window.navigator && window.navigator.userAgent.indexOf('534.30') > 0) {

          // Tweak the canvas opacity, causing it to redraw
          $('canvas').css('opacity', '0.99');

          // Set the canvas opacity back to normal after 5ms
          setTimeout(function() {
              $('canvas').css('opacity', '1');
          }, 5);
        }
      }else{
        this.msgLabel.text = '      PAUSE';
      }
      
    }
  });
  
  // SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function(score,coin,level,life,hiscorelb,winGame) {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);    
      this.backgroundColor = '#000000';
      
      // Background
      bg = new Sprite(320,128);
      bg.y = 193;
      //bg.scale(2,2);
      bg.image = game.assets['res/mountain.png'];
      map = new Map(32, 32);
      map.image = game.assets['res/groundSheet.png'];
      
      if(winGame>=1){
        map.loadData(arrMap2Top,arrMap2Sub);
        map.y = 16;
      }else map.loadData(arrMap1Top,arrMap1Sub);
      
      playerData.scoretable.hiscore = hiscore;
      localStorage["playerData"] = JSON.encode(playerData);
      
      // UI labels
      scoreLabel = score;
      coinLabel = coin;
      levelLabel = level;
      livesLabel = life;
      hiscoreLabel = hiscorelb;
            
      bracket1 = new Sprite(5, 32);
      bracket1.image = game.assets['res/brackets.png'];
      bracket1.frame = 1;
      bracket1.x = 93;
      bracket1.y = 24;
      
      bracket2 = new Sprite(11, 32);
      bracket2.image = game.assets['res/brackets.png'];
      bracket2.x = 164;
      bracket2.y = 24;
      
      bracket3 = new Sprite(11, 32);
      bracket3.image = game.assets['res/brackets.png'];
      bracket3.x = 257;
      bracket3.y = 24;
      
      bracket4 = new Sprite(4, 32);
      bracket4.image = game.assets['res/brackets.png'];
      bracket4.x = 314;
      bracket4.y = 24;
            
      // Game Over label
      if(winGame==1) gameovertxt = "PARABÉNS!_Snow e Yuki terão_peixe por muito_tempo!";
      else if(winGame==2) gameovertxt = "PARABÉNS!_Você zerou_Snow & Yuki!__Em breve teremos_novos jogos e_desafios, AGUARDE!!!";
      else gameovertxt = "FIM DE JOGO!";
      gameOverLabel = new FontSprite('score', 320, 120, gameovertxt);
      gameOverLabel.x = 72;
      if(winGame>=1)gameOverLabel.x = 40;
      gameOverLabel.y = 140;
      
      this.timeToRestart = 0;
      
      // Add labels
      //this.addChild(bg);
      this.addChild(map);
      this.addChild(gameOverLabel);
      this.addChild(scoreLabel);
      this.addChild(coinLabel);
      this.addChild(levelLabel);
      this.addChild(livesLabel);
      this.addChild(hiscoreLabel);
      this.addChild(bracket1);
      this.addChild(bracket2);
      this.addChild(bracket3);
      this.addChild(bracket4);
      
      if(winGame>=1){
        igloo = new Sprite(48,48);
        igloo.x = 98;
        igloo.y = 416;
        igloo.image = game.assets['res/iglooSheet.png']; 
        
        igloo2 = new Sprite(48,48);
        igloo2.x = 146;
        igloo2.y = 416;
        igloo2.scaleX = -1;
        igloo2.image = game.assets['res/iglooSheet.png']; 
      
        snow = new Sprite(32,32);
        snow.x = 224;
        snow.y = 464;
        snow.frame = [4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1];
        snow.image = game.assets['res/penguinSheet.png']; 
        
        yuki = new Sprite(32,32);
        yuki.x = 192;
        yuki.y = 432;
        yuki.frame = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
        yuki.image = game.assets['res/yukiSheet.png']; 
        
        this.addChild(igloo);
        this.addChild(igloo2);
        this.addChild(snow);
        this.addChild(yuki);
      }
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
      if(winGame<1) // Update
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    touchToRestart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneTitle(0));
    },
    
    update: function(evt){
      this.timeToRestart += evt.elapsed * 0.001;
      if(this.timeToRestart>=3){
        var game = Game.instance;
        game.replaceScene(new SceneTitle(0));        
      }
    }
  });

  // SceneCredits
  var SceneCredits = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      // title = new Sprite(256,160);
      // title.x = 32;
      // title.y = 32;
      // title.image = game.assets['res/title.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap2Top,arrMap2Sub);
      map.y = 16;
      
      igloo = new Sprite(48,48);
      igloo.x = 98;
      igloo.y = 416;
      igloo.image = game.assets['res/iglooSheet.png']; 
      
      igloo2 = new Sprite(48,48);
      igloo2.x = 146;
      igloo2.y = 416;
      igloo2.scaleX = -1;
      igloo2.image = game.assets['res/iglooSheet.png']; 
      
      snow = new Sprite(32,32);
      snow.x = 224;
      snow.y = 464;
      snow.frame = [4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1];
      snow.image = game.assets['res/penguinSheet.png']; 
      
      yuki = new Sprite(32,32);
      yuki.x = 192;
      yuki.y = 432;
      yuki.frame = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
      yuki.image = game.assets['res/yukiSheet.png']; 
      
      label = new FontSprite('score', 320, 440, '');
      label.x = 0;
      label.y = 8;
      
      label.text = '  ==SNOW & YUKI==__CODE, ART & DESIGN_'
                  +'Adinan Batista Alves___'
                  +'ENCHANT.JS TUTORIAL_Thongrop Rodsavas_(raywenderlich.com)___'
                  +'8BIT TRACKS BY_'
                  +'Bart Kelsey_(OpenGameArt.Org)___'
                  +'BMFONT PLUGIN BY_'
                  +'COFFEE DOG GAMES___'
                  +'SOUND EFFECTS_'
                  +'CREATED IN BFXR.NET___'
                  +'THANKS FOR PLAYING!';
            
      // Add labels  
      //this.addChild(title);
      //this.addChild(map);
      this.addChild(igloo);
      this.addChild(igloo2);
      this.addChild(snow);
      this.addChild(yuki);
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneTitle());
    }
  });
  
  // SceneSettings
  var SceneSettings = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      var resetHiscore = false;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      // title = new Sprite(256,160);
      // title.x = 32;
      // title.y = 32;
      // title.image = game.assets['res/title.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
            
      snow = new Sprite(32,32);
      snow.x = 224;
      snow.y = 288;
      snow.frame = 4;
      snow.image = game.assets['res/penguinSheet.png']; 
      
      yuki = new Sprite(32,32);
      yuki.x = 192;
      yuki.y = 288;
      yuki.frame = 2;
      yuki.image = game.assets['res/yukiSheet.png']; 
      
      label = new FontSprite('score', 320, 200, '  ==CONFIGURAÇÔES==__SOM & BGM_____RESETAR HISCORE');
      label.x = 0;
      label.y = 8;
      
      // SOUND SETTINGS
      SoundOnLabel = new FontSprite('score', 80, 16, " [ON]");
      SoundOnLabel.x = 16;
      SoundOnLabel.y = 60;
      SoundOnLabel.addEventListener(Event.TOUCH_START, function(e){
        soundOn = true;
        this.text = '>[ON]';
        SoundOffLabel.text = ' [OFF]';
      });
      if (soundOn) SoundOnLabel.text = '>[ON]';
      
      SoundOffLabel = new FontSprite('score', 96, 16, ' [OFF]');
      SoundOffLabel.x = 140;
      SoundOffLabel.y = 60;
      SoundOffLabel.addEventListener(Event.TOUCH_START, function(e){
        soundOn = false;
        this.text = '>[OFF]';
        SoundOnLabel.text = ' [ON]';
      });
      if (!soundOn) SoundOffLabel.text = '>[OFF]';
      
      // HISCORE SETTINGS
      ResetYesLabel = new FontSprite('score', 96, 16, " [SIM]");
      ResetYesLabel.x = 16;
      ResetYesLabel.y = 142;
      ResetYesLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = true;
        this.text = '>[SIM]';
        ResetNoLabel.text = ' [NAO]';
      });
      if (resetHiscore) ResetYesLabel.text = '>[SIM]';
      
      ResetNoLabel = new FontSprite('score', 96, 16, ' [NAO]');
      ResetNoLabel.x = 140;
      ResetNoLabel.y = 142;
      ResetNoLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = false;
        this.text = '>[NAO]';
        ResetYesLabel.text = ' [SIM]';
      });
      if (!resetHiscore) ResetNoLabel.text = '>[NAO]';
      
      exitLabel = new FontSprite('score', 144, 16, '[VOLTAR]');
      exitLabel.x = 16;
      exitLabel.y = 240;
      exitLabel.addEventListener(Event.TOUCH_START, function(e){
        if(resetHiscore) hiscore = 0;
        playerData.scoretable.hiscore = hiscore;
        playerData.settings.sound = soundOn;
        localStorage["playerData"] = JSON.encode(playerData);
        game.replaceScene(new SceneTitle());
      });
            
      // Add labels  
      //this.addChild(title);
      this.addChild(map);
      this.addChild(snow);
      this.addChild(yuki);
      this.addChild(label);
      this.addChild(SoundOnLabel);
      this.addChild(SoundOffLabel);
      this.addChild(ResetYesLabel);
      this.addChild(ResetNoLabel);
      this.addChild(exitLabel);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    }
  });
  
  // SceneTitle
  var SceneTitle = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      title = new Sprite(256,160);
      title.x = 32;
      title.y = 32;
      //bg.scale(2,2);
      title.image = game.assets['res/title.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      //map.y = 320;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
      
      label = new FontSprite('score', 128, 16, 'SC 0');
      label.x = 8;
      label.y = 0;
      this.scoreLabel = label;
            
      label6 = new FontSprite('score', 144, 16, 'TOP '+hiscore);
      label6.x = 160;
      label6.y = 0;
      this.hiscoreLabel = label6;
      
      // Title label
      TitleLabel = new FontSprite('score', 112, 16, "ICEFALL");
      TitleLabel.x = 104;
      TitleLabel.y = 198;
      
      // Press Start label
      PressStart = new FontSprite('score', 192, 16, "[START GAME]");
      PressStart.x = 64;
      PressStart.y = 264;
      PressStart.addEventListener(Event.TOUCH_START, function(e){
        if( isAndroid ) {
          if(soundOn && introstatus==2)intro.stop();
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneGame());
      });
      
      optionLabel = new FontSprite('score', 160, 16, '[SETTINGS]');
      optionLabel.x = 64;
      optionLabel.y = 320;
      optionLabel.addEventListener(Event.TOUCH_START, function(e){
        if( isAndroid ) {
          if(soundOn && introstatus==2)intro.stop();
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneSettings());
      });
      
      creditLabel = new FontSprite('score', 144, 16, '[CREDITS]');
      creditLabel.x = 64;
      creditLabel.y = 376;
      creditLabel.addEventListener(Event.TOUCH_START, function(e){
        game.replaceScene(new SceneCredits());
      });
      
      // Copyright label
      copyright = new FontSprite('score', 240, 16, "© 2015 HACHICOM");
      copyright.x = 40;
      copyright.y = game.height - 16 - 60;
      
      // Hiscore label
      scoreLabel = new Label('HISCORE: ' + score);
      scoreLabel.x = 0;
      scoreLabel.y = 0;        
      scoreLabel.color = 'white';
      scoreLabel.font = '16px system';
      scoreLabel.textAlign = 'center';
      scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      
      // Add labels  
      this.addChild(title);
      //this.addChild(map);
      this.addChild(copyright);
      this.addChild(TitleLabel); 
      this.addChild(PressStart);
      this.addChild(optionLabel);
      this.addChild(creditLabel);
      this.addChild(label);
      this.addChild(label6);
      
      if( isAndroid ) {
        if(soundOn) {
          intro.seekTo(1);
          intro.play();
        }
      }/* else{
        if(soundOn) game.assets['res/intro.mp3'].play();
      } */
    }
  });  
};

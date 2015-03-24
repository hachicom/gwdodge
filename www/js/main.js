var keeploop = true;
var jumpSnd, bgmstatus, bgm, hit, coin, crash, powerup;
var isAndroid = isMobile();

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
	if( isAndroid ) {
    game.preload('res/penguinSheet.png',
                 'res/Ice.png',
                 'res/IceFrag.png',
                 'res/fishSheet.png',
                 'res/yukiSheet.png',
                 'res/iglooSheet.png',
                 'res/mountain.png',
                 'res/groundSheet.png',
                 'res/title.png',
                 'res/dpad.png',
                 'res/font0_0.png');
  }else{
    game.preload('res/penguinSheet.png',
                 'res/Ice.png',
                 'res/IceFrag.png',
                 'res/fishSheet.png',
                 'res/yukiSheet.png',
                 'res/iglooSheet.png',
                 'res/mountain.png',
                 'res/groundSheet.png',
                 'res/title.png',
                 'res/dpad.png',
                 'res/font0_0.png',
                 'res/hit.wav',
                 'res/jump.wav',
                 'res/fish.wav',
                 'res/break.wav',
                 'res/powerup.wav',
                 'res/bgm.mp3');
  }
  
	// 5 - Game settings
	game.fps = 30;
	//game.scale = 1;
	// 6 - Once Game finishes loading
  game.onload = function() {
		// 1 - Variables
    enchant.bmfont.createFont('score', 'res/font0.fnt', game.assets['res/font0_0.png']);
    var scene;
    // 2 - New scene
    scene = new SceneTitle();
    game.pushScene(scene);
	}
  
  // Set Phonegap Events
  if( isAndroid ) {
    document.addEventListener("deviceready", function ()
    {
      bgmstatus = 0;
	     bgm = new Media("file:///android_asset/www/res/bgm.mp3",
	      function() {
	        if(keeploop==true) this.play();
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      },
	      function(status){
	      	 bgmstatus=status;
	      }
	    );
	    
	     hit = new Media("file:///android_asset/www/res/hit.wav",
	      function() {
	        //alert("Audio Success");
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      }
	    );
	    
	     coin = new Media("file:///android_asset/www/res/fish.wav",
	      function() {
	        //alert("Audio Success");
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      }
	    );
	    
	     crash = new Media("file:///android_asset/www/res/break.wav",
	      function() {
	        //alert("Audio Success");
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      }
	    );
	    
	     powerup = new Media("file:///android_asset/www/res/powerup.wav",
	      function() {
	        //alert("Audio Success");
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      }
	    );
	    
	    jumpSnd = new Media("file:///android_asset/www/res/jump.wav",
	      function() {
	        //alert("Audio Success");
	      },
	      function(err) {
	        alert(JSON.stringify(err));
	      }
	    );
      
      document.addEventListener("pause", function() {
        keeploop=false;
        if(bgmstatus==2)bgm.pause();
        game.stop();
        console.log("paused");
        //cr_setSuspended(true);
      }, false);

      document.addEventListener("resume", function() {
        keeploop=true;
        if(bgmstatus==3)bgm.play();
        game.resume();
        console.log("resumed");
        //cr_setSuspended(false);
      }, false);

      document.addEventListener("backbutton", onBackKeyDown, false);
      
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
      bg.y = 193;
      //bg.scale(2,2);
      bg.image = game.assets['res/mountain.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      //map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
            
      //UI      
      // Label
      label = new FontSprite('score', 128, 32, 'SCx1 0');
      label.x = 8;
      label.y = 0;
      this.scoreLabel = label;
      
      label3 = new FontSprite('score', 96, 32, 'FISH_0');
      label3.x = 170;
      label3.y = 32;
      this.coinsLabel = label3;
      
      label2 = new FontSprite('score', 80, 32, 'LVL_0');
      label2.x = 270;
      label2.y = 32;
      this.levelLabel = label2;
      
      label4 = new FontSprite('score', 256, 32, 'COLETE 4 PEIXES!');
      label4.x = 32;
      label4.y = 140;
      this.msgLabel = label4;
      
      dpad = new Sprite(242,96);
      dpad.x = 160 - (dpad.width/2);
      dpad.y = 400;
      dpad.opacity = 0.5;
      dpad.image = game.assets['res/dpad.png']; 
      
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
      
      // Instance variables
      this.startLevelMsg = 1.5;
      this.generateIceTimer = 0;
      this.cubesGenerated = 0;
      this.generateFishTimer = 0;
      this.fishTimerExp = 20;
      this.fishTimer = getRandom(3,6)*this.fishTimerExp;
      this.scoreTimer = 0;
      this.score = 0;
      this.multiplier = 1;
      this.coins = 0;
      this.level = 0;
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
      
      // Background music
      if( isAndroid ) {
        bgm.play();
        //this.jumpSnd = jumpSnd;
      }else{
        this.bgm = game.assets['res/bgm.mp3']; // Add this line
        this.jumpSnd = game.assets['res/jump.wav'];
        // Start BGM
        this.bgm.play();
      }
      
      // 4 - Add child nodes        
      this.addChild(map);
      this.addChild(igloo);
      this.addChild(penguin);
      this.addChild(yuki);
      this.addChild(iceGroup);
      this.addChild(fishGroup);
      this.addChild(label3);
      this.addChild(label2);
      this.addChild(label);
      this.addChild(label4);
      this.addChild(dpad);
      
      // Touch listener
      this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    handleTouchControl: function (evt) {
      var playSnd, lane;
      if(this.gotHit!=true && this.buying!=true){
        if(evt.x > game.width/2) lane=1;
        else lane=-1;
        
        //Verifica a posição do pinguim e dependendo do caso dispara um som
        playSnd = this.penguin.switchToLaneNumber(lane,this.igloo.isLit,this.yuki.isThere);
        if (playSnd=='jump') { //apenas moveu o pinguim
          if( isAndroid ){
            jumpSnd.seekTo(1);
            jumpSnd.play();
          }else{
            this.jumpSnd.play();
          }
        }else if(playSnd=='powerup') { //dispara o modo de entrega dos peixes
          if( isAndroid ) {
            powerup.play();
          }else{
            game.assets['res/powerup.wav'].play();
          }
          this.buying=true;
          this.setCoins(this.levelUpAt*(-1));
        }
      }
      evt.stopPropagation();
      evt.preventDefault();
    },
    
    setScore: function (value) {
      this.score = this.score + (value * this.multiplier);
    },
    
    setCoins: function (value) {
      this.coins = this.coins + value;
      this.igloo.turnLights(this.coins);
      this.yuki.smile(this.coins);
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
        this.levelUpAt = 1;
        this.fishTimerExp = 20 - (2*this.sabbath);
        this.bonusMode = true;
      }else this.levelUpAt = nextLevelUp(this.level,this.sabbath);
    },
    
    update: function(evt) {
      this.scoreLabel.text = 'SCx' + this.multiplier + ' ' + this.score;
      this.coinsLabel.text = 'FISH_' + this.coins + '/' + this.levelUpAt; //+ '<br>' + this.generateFishTimer;
      this.levelLabel.text = 'LVL_ ' + this.level;// + ' - ' + this.iceTimer+ '<br>' + this.generateIceTimer;
      
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
          this.levelcalc = this.level - (this.sabbath * 5);
          
          if(this.levelcalc<3) this.generateIceTimer += 2;
          else this.generateIceTimer += 2 + (this.levelcalc - 2);
          if (this.generateIceTimer >= this.iceTimer) {
            var ice;
            this.generateIceTimer = 0;
            //this.cubesGenerated += 1;
            ice = new Ice(Math.floor(Math.random()*3),this.levelcalc);
            this.iceGroup.addChild(ice);
          }
          
          // Check if it's time to make fish jump
          this.generateFishTimer += 1;
          if (this.generateFishTimer >= this.fishTimer) {
            var ice;
            this.generateFishTimer = 0;
            fish = new Fish(Math.floor(Math.random()*3),this.levelcalc);
            this.fishGroup.addChild(fish);
            this.fishTimer = getRandom(3,6)*this.fishTimerExp;
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
                hit.play();
              }else{
                game.assets['res/hit.wav'].play();
              }
              //alert(ice.y);
              ice.crashToPieces();
              this.gotHit = true; 
              this.penguin.gotHit();
              // this.iceGroup.removeChild(ice);
              // this.bgm.stop();
              // game.replaceScene(new SceneGameOver(this.score)); 
              break;
            }
          }else{
            //this.iceGroup.removeChild(ice);
            if( isAndroid ) {
              crash.seekTo(1);
              crash.play();
            }else{
              game.assets['res/break.wav'].play();
            }
            ice.crashToPieces();
            //this.setScore(1);
          }
        }
        
        // Fish collision
        for (var i = this.fishGroup.childNodes.length - 1; i >= 0; i--) {
          var fish;
          fish = this.fishGroup.childNodes[i];
          if (fish.intersect(this.penguin) && this.coins < this.levelUpAt){
            if( isAndroid ) {
              coin.seekTo(1);
              coin.play();
            }else{
              game.assets['res/fish.wav'].play();
            }
            this.setScore(1);
            this.setCoins(1);
            if(this.multiplier<8) this.multiplier=this.multiplier * 2; 
            this.fishGroup.removeChild(fish);
            break;
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
          if( isAndroid ) {        
            keeploop = false; 
            bgm.stop();
          }else{
            this.bgm.stop();
          }
          game.replaceScene(new SceneGameOver(this.scoreLabel,this.coinsLabel,this.levelLabel)); 
          //break;
        }
      }
      
      //Comprando(iglu ou Yuki): dispara o timer, executa as ações necessárias e libera o jogador ao término
      if(this.buying==true){
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
          var ice;
          ice = this.iceGroup.childNodes[i];
          ice.crashToPieces();
        }
        //game.stop();
        this.buyDuration += evt.elapsed * 0.001; 
        this.penguin.shopping(true);
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
          this.penguin.shopping(false);
          this.buyDuration = 0;
          if (this.penguin.lane==2) {
            this.setScore((3*this.levelUpAt));           
            this.incLevelUp();
          }
          this.yuki.smile(this.coins);
          this.yuki.price = this.igloo.price = this.levelUpAt;
          this.startLevelMsg = 1.5;
          //break;
        }
      }
      
      // Bonus Stage Mode
      if(this.bonusMode == true){
        // Deal with start message        
        if(this.startLevelMsg>0) {
          this.startLevelMsg-=evt.elapsed * 0.001;
          this.msgLabel.text = '  BONUS ROUND_RELAXA É SÁBADO';
        }else if(this.coins == this.levelUpAt) this.msgLabel.text = 'LEVE OS PEIXES_  PARA YUKI!!!';
        else this.msgLabel.text = '';
        this.bonusDuration += evt.elapsed * 0.001; 
        if(this.bonusDuration >=5) {
          this.bonusMode = false;
          this.incLevelUp();
          this.yuki.smile(this.coins);
          this.yuki.price = this.igloo.price = this.levelUpAt;
          this.startLevelMsg = 1.5;
          this.bonusDuration = 0; 
        }
      }
      
      // Loop BGM
      if( isAndroid ) {
        //if(bgm.getCurrentPosition() >= bgm.getDuration()) bgm.play();
      }
      else
      if (this.bgm.currentTime >= this.bgm.duration ){
        this.bgm.play();
      }
      
      // If Samsung android browser is detected
      if (window.navigator && window.navigator.userAgent.indexOf('534.30') > 0) {

        // Tweak the canvas opacity, causing it to redraw
        $('canvas').css('opacity', '0.99');

        // Set the canvas opacity back to normal after 5ms
        setTimeout(function() {
            $('canvas').css('opacity', '1');
        }, 5);
      }
    }
  });
  
  // SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function(score,coin,level) {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);    
      this.backgroundColor = '#000000';
      
      // Background
      bg = new Sprite(320,128);
      bg.y = 193;
      //bg.scale(2,2);
      bg.image = game.assets['res/mountain.png'];
      map = new Map(32, 32);
      //map.y = 320;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
      
      // Score label
      scoreLabel = score;
      coinLabel = coin;
      levelLabel = level;
            
      // Game Over label
      gameOverLabel = new FontSprite('score', 176, 16, "FIM DE JOGO");
      gameOverLabel.x = 72;
      gameOverLabel.y = 140;
      
      this.timeToRestart = 0;
      
      // Add labels
      //this.addChild(bg);
      this.addChild(map);
      this.addChild(gameOverLabel);
      this.addChild(scoreLabel);
      this.addChild(coinLabel);
      this.addChild(levelLabel);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
      // Update
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
      
      // Title label
      TitleLabel = new FontSprite('score', 112, 16, "ICEFALL");
      TitleLabel.x = 104;
      TitleLabel.y = 198;
      
      // Press Start label
      PressStart = new FontSprite('score', 288, 16, "TOQUE PARA INICIAR");
      PressStart.x = 16;
      PressStart.y = 264;
      
      // Copyright label
      copyright = new FontSprite('score', 240, 16, "© 2015 HACHICOM");
      copyright.x = 40;
      copyright.y = 390;
      
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
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneGame());
    }
  });  
};

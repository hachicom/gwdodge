var keeploop = true;
var jumpSnd;
var isAndroid = isMobile();

//game global difficulty variables
var shopPrice = 5;
var levelUpAt = 10;

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
                 'res/groundSheet.png');
  }else{
    game.preload('res/penguinSheet.png',
                 'res/Ice.png',
                 'res/IceFrag.png',
                 'res/fishSheet.png',
                 'res/yukiSheet.png',
                 'res/iglooSheet.png',
                 'res/mountain.png',
                 'res/groundSheet.png',
                 'res/hit.wav',
                 'res/jump.wav',
                 'res/fish.wav',
                 'res/break.wav',
                 'res/powerup.wav',
                 'res/bgm.mp3');
  }
               
  if( isAndroid ) {
    var bgmstatus = 0;
    var bgm = new Media("file:///android_asset/www/res/bgm.mp3",
      function() {
        if(keeploop==true) this.play();
      },
      function(err) {
        alert(JSON.stringify(err));
      },
      function(status){
      	 bgmstatus=status; console.log(bgmstatus);
      }
    );
    
    var hit = new Media("file:///android_asset/www/res/hit.wav",
      function() {
        //alert("Audio Success");
      },
      function(err) {
        alert(JSON.stringify(err));
      }
    );
    
    var coin = new Media("file:///android_asset/www/res/fish.wav",
      function() {
        //alert("Audio Success");
      },
      function(err) {
        alert(JSON.stringify(err));
      }
    );
    
    var crash = new Media("file:///android_asset/www/res/break.wav",
      function() {
        //alert("Audio Success");
      },
      function(err) {
        alert(JSON.stringify(err));
      }
    );
    
    var powerup = new Media("file:///android_asset/www/res/powerup.wav",
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
  }
  
	// 5 - Game settings
	game.fps = 30;
	//game.scale = 1;
	// 6 - Once Game finishes loading
  game.onload = function() {
		// 1 - Variables
    var scene;
    // 2 - New scene
    scene = new SceneTitle();
    game.pushScene(scene);
	}
  
  // Set Phonegap Events
  if( isAndroid ) {
    document.addEventListener("deviceready", function ()
    {
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
        
    }, false);

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
        bgm.release();
        console.log("exited");
      }else game.resume();
    }
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
      this.backgroundColor = '#00fffa';
      map = new Map(32, 32);
      //map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData([
        [-1,2,0,0,0,0,0,0,4,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [-1,3,1,1,1,1,1,1,5,-1],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
        ]);
      
      //UI
      // Label
      label = new Label('SCORE: 0');
      label.x = 8;
      label.y = 0;
      label.color = 'white';
      label.font = '16px monospace';
      label.textAlign = 'left';
      label.backgroundColor = "rgba(0,0,0,0.6)";label.width = 304;label.height = 32;
      this.scoreLabel = label;
      //console.dir(label);
      
      label2 = new Label('LEVEL: 0');
      label2.x = 220;
      label2.y = 0;        
      label2.color = 'white';
      label2.font = '16px monospace';
      //label2.textAlign = 'right';
      this.debugLabel = label2;
      
      label3 = new Label('FISH: 0');
      label3.x = 120;
      label3.y = 0;        
      label3.color = 'white';
      label3.font = '16px monospace';
      //label2.textAlign = 'right';
      this.coinsLabel = label3;
      
      // Penguin
      penguin = new Penguin(145,288);
      this.penguin = penguin;
      
      // Igloo & Yuki
      igloo = new Igloo(272,272,shopPrice);
      this.igloo = igloo;
      yuki = new Yuki(8,288,shopPrice);
      this.yuki = yuki;
      
      // Ice group
      iceGroup = new Group();
      this.iceGroup = iceGroup;
      // Fish group
      fishGroup = new Group();
      this.fishGroup = fishGroup;
      
      // Instance variables
      this.generateIceTimer = 0;
      this.cubesGenerated = 0;
      this.generateFish = getRandom(3,5);
      this.scoreTimer = 0;
      this.score = 0;
      this.multiplier = 1;
      this.coins = 0;
      this.level = 0;
      this.levelup = 0;
      this.gotHit = false;
      this.hitDuration = 0;
      this.buying = false;
      this.buyDuration = 0; 
      
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
      this.addChild(bg);
      this.addChild(map);
      this.addChild(igloo);
      this.addChild(penguin);
      this.addChild(yuki);
      this.addChild(iceGroup);
      this.addChild(fishGroup);
      this.addChild(label);
      this.addChild(label2);
      this.addChild(label3);
      
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
          this.setCoins(shopPrice*(-1));
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
      this.levelup = this.levelup+1;
      if(this.levelup>=levelUpAt) {
        this.levelup=0;
        this.level = this.level+1;
      }
    },
    
    decLevelDown: function(){
      this.levelup = 0;
      if(this.level>1) this.level = this.level-1;
    },
    
    update: function(evt) {
      this.scoreLabel.text = 'SCORE: ' + this.score + '<BR>X' + this.multiplier;
      this.coinsLabel.text = 'FISH: ' + this.coins;
      this.debugLabel.text = 'LEVEL: ' + this.level + '<BR>next: ' + (levelUpAt - this.levelup);
      
      if(this.gotHit!=true && this.buying!=true){
        // Check if it's time to create a new set of obstacles
        this.generateIceTimer += 2 + this.level;
        if (this.generateIceTimer >= 60) {
          var ice;
          this.generateIceTimer = 0;
          this.cubesGenerated += 1;
          if (this.cubesGenerated >= this.generateFish){
            fish = new Fish(Math.floor(Math.random()*3),this.level);
            this.fishGroup.addChild(fish);
            this.generateFish = getRandom(3,5);
            this.cubesGenerated = 0;
          }else{
            ice = new Ice(Math.floor(Math.random()*3),this.level);
            //this.addChild(ice);
            this.iceGroup.addChild(ice);
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
            this.setScore(1);
            this.incLevelUp();
          }
        }
        
        // Fish collision
        for (var i = this.fishGroup.childNodes.length - 1; i >= 0; i--) {
          var fish;
          fish = this.fishGroup.childNodes[i];
          if (fish.intersect(this.penguin)){
            if( isAndroid ) {
              coin.seekTo(1);
              coin.play();
            }else{
              game.assets['res/fish.wav'].play();
            }
            //this.setScore(this.score + 5);
            this.setCoins(1);
            this.fishGroup.removeChild(fish);
            break;
          }
        }
      }
      
      //Atingido: dispara o timer e parte para o game over no término
      if(this.gotHit==true){
        //game.stop();
        this.hitDuration += evt.elapsed * 0.001; 
        if(this.hitDuration >= 1){
          //this.iceGroup.removeChild(ice);
          //game.resume();
          if( isAndroid ) {        
            keeploop = false; 
            bgm.stop();
          }else{
            this.bgm.stop();
          }
          game.replaceScene(new SceneGameOver(this.score)); 
          //break;
        }
      }
      
      //Comprando(iglu ou Yuki): dispara o timer, executa as ações necessárias e libera o jogador ao término
      if(this.buying==true){
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
          var ice;
          ice = this.iceGroup.childNodes[i];
          if(ice.y>=100){
            ice.crashToPieces();
          }
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
          this.buying=false; 
          this.penguin.shopping(false);
          this.buyDuration = 0;
          if (this.penguin.lane==2) {
            this.setScore((2*shopPrice));
            this.multiplier=this.multiplier * 2;
          }
          else if (this.penguin.lane==0) {
            this.setScore((shopPrice));
            //if(this.multiplier>=2)this.multiplier=this.multiplier / 2;
            this.decLevelDown();
          }
          this.yuki.smile(this.coins);
          //break;
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
    initialize: function(score) {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);    
      this.backgroundColor = '#00fffa';
      
      // Game Over label
      gameOverLabel = new Label("FIM DE JOGO<br>Toque para Reiniciar");
      gameOverLabel.x = 8;
      gameOverLabel.y = 98;
      gameOverLabel.color = 'white';
      gameOverLabel.font = '32px strong';
      gameOverLabel.textAlign = 'center';
      
      // Background
      bg = new Sprite(320,128);
      bg.y = 190;
      //bg.scale(2,2);
      bg.image = game.assets['res/mountain.png'];      
      this.backgroundColor = '#00fffa';
      map = new Map(32, 32);
      map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData([
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
        ]);
      
      // Score label
      scoreLabel = new Label('SCORE<br>' + score);
      scoreLabel.x = 9;
      scoreLabel.y = 32;        
      scoreLabel.color = 'white';
      scoreLabel.font = '16px strong';
      scoreLabel.textAlign = 'center';
      scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      
      // Add labels
      this.addChild(bg);
      this.addChild(map);
      this.addChild(gameOverLabel);
      this.addChild(scoreLabel);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
    },
    
    touchToRestart: function(evt) {
      console.log("restart");
      var game = Game.instance;
      game.replaceScene(new SceneGame());
    }
  });

  // SceneTitle
  var SceneTitle = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      bg = new Sprite(320,128);
      bg.y = 190;
      //bg.scale(2,2);
      bg.image = game.assets['res/mountain.png'];      
      this.backgroundColor = '#00fffa';
      map = new Map(32, 32);
      map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData([
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
        ]);
      
      // Game Over label
      TitleLabel = new Label("Benji & Yuki<br>ICYFALL<br><br>Toque para Iniciar");
      TitleLabel.x = 8;
      TitleLabel.y = 98;
      TitleLabel.color = 'white';
      TitleLabel.font = '32px strong';
      TitleLabel.textAlign = 'center';
      
      // Score label
      scoreLabel = new Label('SCORE<br>' + score);
      scoreLabel.x = 9;
      scoreLabel.y = 32;        
      scoreLabel.color = 'white';
      scoreLabel.font = '16px strong';
      scoreLabel.textAlign = 'center';
      scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      
      // Add labels  
      this.addChild(bg);
      this.addChild(map);
      this.addChild(TitleLabel); 
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
    },
    
    touchToRestart: function(evt) {
      console.log("restart");
      var game = Game.instance;
      game.replaceScene(new SceneGame());
    }
  });  
};

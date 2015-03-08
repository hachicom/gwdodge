var keeploop = true;

// 1 - Start enchant.js
enchant();
 
// 2 - On document load 
window.onload = function() {
	// 3 - Starting point
	var game = new Core(320, 440);
	// 4 - Preload resources
	if( /Android/i.test(navigator.userAgent) ) {
    game.preload('res/BG.png',
                 'res/penguinSheet.png',
                 'res/Ice.png');
  }else{
    game.preload('res/BG.png',
                 'res/penguinSheet.png',
                 'res/Ice.png',
                 'res/Hit.mp3',
                 'res/bgm.mp3');
  }
               
  if( /Android/i.test(navigator.userAgent) ) {
    var bgmstatus = 0; //play, stop, pause
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
    
    var hit = new Media("file:///android_asset/www/res/Hit.mp3",
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
    scene = new SceneGame();
    game.pushScene(scene);
	}
  
  // Set Phonegap Events
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
    
    var last_click_time = new Date().getTime();
    document.addEventListener('click', function (e) {
      console.log("cliquei");
      click_time = e['timeStamp'];
      //if (click_time && (click_time - last_click_time) < 1000) {
        e.stopImmediatePropagation();
        e.preventDefault();
        //return false;
      //}
      last_click_time = click_time;
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
  
	// 7 - Start
	game.start();
  //window.scrollTo(0, 1);
  
  // SceneGame  
  var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
      var game, label, bg, penguin, iceGroup;

      // 1 - Call superclass constructor
      Scene.apply(this);
      // 2 - Access to the game singleton instance
      game = Game.instance;
      keeploop=true;
      // 3 - Create child nodes
      // Background
      bg = new Sprite(320,440);
      bg.image = game.assets['res/BG.png'];
      //UI
      // Label
      label = new Label('SCORE<br>0');
      label.x = 9;
      label.y = 32;        
      label.color = 'white';
      label.font = '16px strong';
      label.textAlign = 'center';
      label._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      this.scoreLabel = label;
      
      label2 = new Label('Time<br>0');
      label2.x = 20;
      label2.y = 32;        
      label2.color = 'white';
      label2.font = '16px strong';
      label2.textAlign = 'right';
      label2._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      this.debugLabel = label2;
      // Penguin
      penguin = new Penguin();
      penguin.x = 145;
      penguin.y = 280;
      this.penguin = penguin;
      
      // Ice group
      iceGroup = new Group();
      this.iceGroup = iceGroup;
      
      // Instance variables
      this.generateIceTimer = 0;
      this.scoreTimer = 0;
      this.score = 0;
      this.level = 0;
      this.levelup = 0;
      this.gotHit = false;
      this.hitDuration = 0; 
      
      // Background music
      if( /Android/i.test(navigator.userAgent) ) {
        bgm.play();
      }else{
        this.bgm = game.assets['res/bgm.mp3']; // Add this line
        // Start BGM
        this.bgm.play();
      }
      
      // 4 - Add child nodes        
      this.addChild(bg);
      this.addChild(iceGroup);
      this.addChild(penguin);
      this.addChild(label);
      this.addChild(label2);
      
      // Touch listener
      this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    handleTouchControl: function (evt) {
      var laneWidth, lane;
      // laneWidth = 320/3;
      // lane = Math.floor(evt.x/laneWidth);
      // lane = Math.max(Math.min(2,lane),0);
      if(this.gotHit!=true){
        if(evt.x > game.width/2) lane=1;
        else lane=-1;
        console.log(evt.x);
        this.penguin.switchToLaneNumber(lane);
      }
      //evt.stopPropagation();
      //evt.preventDefault();
    },
    
    setScore: function (value) {
      this.score = value;
      this.levelup = this.levelup+1;
      if(this.levelup>=10) {
        this.levelup=0;
        this.level = this.level+1;
      }
      this.scoreLabel.text = 'SCORE<br>' + this.score;
    },
    
    update: function(evt) {
      this.debugLabel.text = 'LEVEL<br>' + this.level;
      if(this.gotHit!=true){
        // Check if it's time to create a new set of obstacles
        this.generateIceTimer += 2 + this.level;
        if (this.generateIceTimer >= 60) {
          var ice;
          this.generateIceTimer = 0;
          ice = new Ice(Math.floor(Math.random()*3),this.level);
          //this.addChild(ice);
          this.iceGroup.addChild(ice);
        }
        
        // Score increase as time passes
        // this.scoreTimer += evt.elapsed * 0.001;
        // if (this.scoreTimer >= 0.5) {
          // this.setScore(this.score + 1);
          // this.scoreTimer -= 0.5;
        // }
      
        // Check collision
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
          var ice;
          ice = this.iceGroup.childNodes[i];
          if(ice.y<=250){
            if (ice.intersect(this.penguin)){
              if( /Android/i.test(navigator.userAgent) ) {
                hit.play();
              }else{
                game.assets['res/Hit.mp3'].play();
              }
              //alert(ice.y);
              this.gotHit = true; 
              // this.iceGroup.removeChild(ice);
              // this.bgm.stop();
              // game.replaceScene(new SceneGameOver(this.score)); 
              break;
            }
          }else{
            this.iceGroup.removeChild(ice);
            this.setScore(this.score + 1);
          }
        }
      }
      
      if(this.gotHit==true){
        //game.stop();
        this.hitDuration += evt.elapsed * 0.001; 
        if(this.hitDuration >= 1){
          //this.iceGroup.removeChild(ice);
          //game.resume();
          if( /Android/i.test(navigator.userAgent) ) {        
            keeploop = false; 
            bgm.stop();
          }else{
            this.bgm.stop();
          }
          game.replaceScene(new SceneGameOver(this.score)); 
          //break;
        }
      }
      
      // Loop BGM
      if( /Android/i.test(navigator.userAgent) ) {
        //if(bgm.getCurrentPosition() >= bgm.getDuration()) bgm.play();
      }
      else
      if (this.bgm.currentTime >= this.bgm.duration ){
        this.bgm.play();
      }
    }
  });
  
  // SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function(score) {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);
      this.backgroundColor = '#0026FF';
      
      // Game Over label
      gameOverLabel = new Label("FIM DE JOGO<br><br>Toque para Reiniciar");
      gameOverLabel.x = 8;
      gameOverLabel.y = 128;
      gameOverLabel.color = 'white';
      gameOverLabel.font = '32px strong';
      gameOverLabel.textAlign = 'center';
      
      // Score label
      scoreLabel = new Label('SCORE<br>' + score);
      scoreLabel.x = 9;
      scoreLabel.y = 32;        
      scoreLabel.color = 'white';
      scoreLabel.font = '16px strong';
      scoreLabel.textAlign = 'center';
      scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      
      // Add labels
      this.addChild(gameOverLabel);
      this.addChild(scoreLabel);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
    },
    
    touchToRestart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneGame());
    }
  });  
};

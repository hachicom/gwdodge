// 1 - Start enchant.js
enchant();
 
// 2 - On document load 
window.onload = function() {
	// 3 - Starting point
	var game = new Core(320, 440);
	// 4 - Preload resources
	game.preload('res/BG.png',
               'res/penguinSheet.png',
               'res/Ice.png',
               'android-asset/Hit.mp3',
               'android-asset/bgm.mp3');
               
  mp3file = new Media("file:///android/assets/www/android_asset/bgm.mp3",
  function() {
      alert("Audio Success");
  },
      function(err) {
          alert(JSON.stringify(err));
  }
  );
  mp3file.play();
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
      // Penguin
      penguin = new Penguin();
      penguin.x = game.width/2 - penguin.width/2;
      penguin.y = 280;
      this.penguin = penguin;
      
      // Ice group
      iceGroup = new Group();
      this.iceGroup = iceGroup;
      
      // Instance variables
      this.generateIceTimer = 0;
      this.scoreTimer = 0;
      this.score = 0;
      this.gotHit = false;
      this.hitDuration = 0; 
      
      // Background music
      this.bgm = game.assets['android-asset/bgm.mp3']; // Add this line
      // Start BGM
      //this.bgm.play();
      
      // 4 - Add child nodes        
      this.addChild(bg);
      this.addChild(iceGroup);
      this.addChild(penguin);
      this.addChild(label);
      
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
    },
    
    setScore: function (value) {
      this.score = value;
      this.scoreLabel.text = 'SCORE<br>' + this.score;
    },
    
    update: function(evt) {
      if(this.gotHit!=true){
        // Check if it's time to create a new set of obstacles
        this.generateIceTimer += evt.elapsed * 0.001;
        if (this.generateIceTimer >= 1.5) {
          var ice;
          this.generateIceTimer -= 1.5;
          ice = new Ice(Math.floor(Math.random()*3));
          //this.addChild(ice);
          this.iceGroup.addChild(ice);
        }
        
        // Score increase as time passes
        this.scoreTimer += evt.elapsed * 0.001;
        if (this.scoreTimer >= 0.5) {
          this.setScore(this.score + 1);
          this.scoreTimer -= 0.5;
        }
      
        // Check collision
        for (var i = this.iceGroup.childNodes.length - 1; i >= 0; i--) {
          var ice;
          ice = this.iceGroup.childNodes[i];
          if (ice.intersect(this.penguin)){
            game.assets['android-asset/Hit.mp3'].play();
            this.gotHit = true; 
            // this.iceGroup.removeChild(ice);
            // this.bgm.stop();
            // game.replaceScene(new SceneGameOver(this.score)); 
            break;
          }
        }
      }
      
      if(this.gotHit==true){
        //game.stop();
        this.hitDuration += evt.elapsed * 0.001; 
        if(this.hitDuration >= 1){
          //this.iceGroup.removeChild(ice);
          //game.resume();
          this.bgm.stop();
          game.replaceScene(new SceneGameOver(this.score)); 
          //break;
        }
      }
      
      // Loop BGM
      if (this.bgm.currentTime >= this.bgm.duration ){
        //this.bgm.play();
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

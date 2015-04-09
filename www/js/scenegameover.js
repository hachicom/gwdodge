// SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function(score,coin,level,life,hiscorelb,winGame,playerData) {
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
      }//else map.loadData(arrMap1Top,arrMap1Sub);
      
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
      
      this.textbook = [
        'DICA: Tente pegar as_piranhas pela cauda,_vale 100 pontos!',
        'DICA: A cambalhota_de uma piranha pode_quebrar os cubos_de gelo!',
        'DICA: Snow não pode_carregar mais peixes_que o necessário!',
        'DICA: Pontuações_altas garantem mais_vidas!',
        'DICA: A Cada 7 fases_a dificuldade fica_maior, assim como_o bônus ao fim de_cada fase!',
      ];
            
      // Game Over label
      if(winGame==1) gameovertxt = "    PARABÉNS!__Foi uma boa partida!";
      else if(winGame==2) gameovertxt = "    PARABÉNS!__Você zerou o placar_de Snow & Yuki!!!";
      else gameovertxt = "    FIM DE JOGO!____"+this.textbook[getRandom(0,this.textbook.length-1)];
      gameOverLabel = new FontSprite('score', 320, 320, gameovertxt);
      gameOverLabel.x = 0;
      if(winGame>=1)gameOverLabel.x = 40;
      gameOverLabel.y = 140;
      
      this.timeToRestart = 0;
      
      // Add labels
      //this.addChild(bg);
      if(winGame>=1)this.addChild(map);
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
      
      if( isMobile() ) {
        admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_APP,admobParam);
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
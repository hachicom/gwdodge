// Igloo
var Igloo = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,price) {
    // Call superclass constructor
    Sprite.apply(this,[48, 48]);
    this.image  = Game.instance.assets['res/iglooSheet.png'];    
    this.frame = 0;  
    this.iniFrame = 0;
    this.endFrame = 0;
    this.animationDuration = 0;
    this.animationSpeed = 0.05;
    
    this.x = x;
    this.y = y;
    this.isLit = false;
    this.price = price;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  turnLights: function(fishqtd){
    if(fishqtd>=this.price){
      this.frame = 1;
      this.endFrame=1;
      this.isLit = true;
    }else{
      this.frame = 0;  
      this.endFrame=0;
      this.isLit = false;
    }
  },
    
  update: function(evt) { 
    if (!this.parentNode.paused){
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
    }
  }
});

// Igloo
var Yuki = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,price) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/yukiSheet.png'];    
    this.frame = 0;  
    this.scaleX = -1;
    this.iniFrame = 0;
    this.endFrame = 0;
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
    
    this.x = x;
    this.y = y;
    this.isThere = false;
    this.price = price;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  smile: function(fishqtd){
    if(fishqtd>=this.price){
      this.frame = 1;
      this.iniFrame = 1;
      this.endFrame = 2;
      this.isThere = true;
    }else{
      this.frame = 0; 
      this.iniFrame = 0; 
      this.endFrame = 0;
      this.isThere = false;
    }
  },
  
  kiss: function(lane){
    if(lane===2){
      this.frame = 3;
      this.iniFrame = 3;
      this.endFrame = 3;
    }else{
      this.frame = 0; 
      this.iniFrame = 0;  
      this.endFrame = 0;
    }
  },
  
  giveHeart: function(vx){
    var heart = new Heart(this.x,this.y,vx);
    return heart;
  },
    
  update: function(evt) { 
    if (!this.parentNode.paused){
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
    }
  }
});

// Heart Collectible
var Heart = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,vx) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/heart.png'];      
    this.rotationSpeed = Math.random() * 100 - 50;
    this.ySpeed = -14;
    this.yAccel = 0.45;
    this.x = x;
    this.y = y;
    this.xSpeed = vx;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    //IMPORTANTE: Este objeto precisa fazer parte de um grupo filho da scene
    if (!this.parentNode.parentNode.paused){
      var game;
     
      game = Game.instance;
      
      this.ySpeed += this.yAccel;
      this.y += this.ySpeed;
      this.x += this.xSpeed;        
      if (this.y > game.height) {
        this.parentNode.removeChild(this);        
      }
    }

  }
});
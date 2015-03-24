// Ice Boulder
var Ice = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(lane,level) {
    // Call superclass constructor
    Sprite.apply(this,[48, 48]);
    this.image  = Game.instance.assets['res/Ice.png'];      
    this.rotationSpeed = 0;
    this.ySpeed = 2;
    this.setLane(lane);
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  setLane: function(lane) {
    var game, distance;
    game = Game.instance;        
    distance = 70;
   
    this.rotationSpeed = Math.random() * 100 - 50;
   
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = -this.height;    
    this.rotation = Math.floor( Math.random() * 360 );    
  },  
  
  crashToPieces: function() { 
    var i,game;
    var arrSpeed = [1,3,-3,-1];
    var arrHeight = [0,16,16,0];
    var arrFrag = [];
    
    for(i=0;i<4;i++){
      arrFrag[i] = new IceFrag(this.x+(this.width/2),this.y+this.height+arrHeight[i],arrSpeed[i]);
      this.parentNode.parentNode.addChild(arrFrag[i]);
    }
    this.parentNode.removeChild(this);
  },
  
  update: function(evt) { 
    var game,level;
   
    game = Game.instance;
    level = this.parentNode.parentNode.levelcalc;
    if(level<3) level=0;
    else level-=2;
   
    if(this.parentNode.parentNode.gotHit!=true && this.parentNode.parentNode.buying!=true){
      this.y += this.ySpeed + level;
      this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
      if (this.y > game.height) {
        this.parentNode.removeChild(this);        
      }
    }
  }
});

// Ice Fragment
var IceFrag = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,vx) {
    // Call superclass constructor
    Sprite.apply(this,[16, 16]);
    this.image  = Game.instance.assets['res/IceFrag.png'];      
    this.rotationSpeed = Math.random() * 100 - 50;
    this.ySpeed = -10;
    this.yAccel = 1;
    this.x = x;
    this.y = y;
    this.xSpeed = vx;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game;
   
    game = Game.instance;
    
    this.ySpeed += this.yAccel;
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
    if (this.y > game.height) {
      this.parentNode.removeChild(this);        
    }

  }
});

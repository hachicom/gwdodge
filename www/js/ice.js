// Ice Boulder
var Ice = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(lane) {
    // Call superclass constructor
    Sprite.apply(this,[48, 49]);
    this.image  = Game.instance.assets['res/Ice.png'];      
    this.rotationSpeed = 0;
    this.setLane(lane);
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  setLane: function(lane) {
    var game, distance;
    game = Game.instance;        
    distance = 90;
   
    this.rotationSpeed = Math.random() * 100 - 50;
   
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = -this.height;    
    this.rotation = Math.floor( Math.random() * 360 );    
  },
  
  update: function(evt) { 
    var ySpeed, game;
   
    game = Game.instance;
    ySpeed = 100;
   
    if(this.parentNode.parentNode.gotHit!=true){
      this.y += ySpeed * evt.elapsed * 0.001;
      this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
      if (this.y > game.height) {
        this.parentNode.removeChild(this);        
      }
    }
  }
});
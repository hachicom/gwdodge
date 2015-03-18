// Ice Boulder
var Fish = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(lane,level) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/fishSheet.png'];    
    this.frame = 0;  
    this.rotationSpeed = 0;
    this.animationDuration = 0;
    this.ySpeed = 2;
    this.setLane(lane);
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  setLane: function(lane) {
    var game, distance;
    game = Game.instance;        
    distance = 90;
   
    this.rotationSpeed = Math.random() * 100 - 50;
   
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = -40;    
    this.rotation = Math.floor( Math.random() * 360 );    
  },
  
  update: function(evt) { 
    var ySpeed, game;
   
    game = Game.instance;
    level = this.parentNode.parentNode.level;
   
    if(this.parentNode.parentNode.gotHit!=true){
      this.y += this.ySpeed + level;
      this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
      if (this.y > game.height) {
        this.parentNode.removeChild(this);        
      }
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= 1) {
        this.frame = (this.frame + 1) % 2;
        this.animationDuration = 0;
      }
    }
  }
});

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
    this.ySpeed = 10;
    this.rotationTime = 1;
    this.ascending = true;
    this.setLane(lane);
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  setLane: function(lane) {
    var game, distance;
    game = Game.instance;        
    distance = 70;
   
    this.rotationSpeed = 50;
   
    this.x = game.width/2 - this.width/2 + (lane - 1) * distance;
    this.y = game.height;    
    this.rotation = Math.floor( Math.random() * 360 );
  },
  
  update: function(evt) { 
    var ySpeed, game;
   
    game = Game.instance;
    level = this.parentNode.parentNode.level;
   
    if(this.parentNode.parentNode.gotHit!=true && this.parentNode.parentNode.buying!=true){
      //Dealing with movement
      if(this.ascending){
        this.y -= this.ySpeed + level;
        if (this.y <= 248) this.ascending = false;
      }else{
        this.rotationTime -= evt.elapsed * 0.001;
        if(this.rotationTime <= 0){
          this.y += this.ySpeed + level;
          if (this.y > game.height && this.ascending===false) {
            this.parentNode.removeChild(this);        
          }
        }
      }
      
      //Dealing with animation
      if(this.rotationTime <= 0){
        this.rotation = 270;
      }else{
        if(this.ascending) this.rotation = 90;
        else this.rotation += this.rotationSpeed;           
      }
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= 1) {
        this.frame = (this.frame + 1) % 2;
        this.animationDuration = 0;
      }
    }
  }
});

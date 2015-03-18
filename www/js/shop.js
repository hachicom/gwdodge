// Ice Boulder
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
    this.animationDuration += evt.elapsed * 0.001;       
    if (this.animationDuration >= this.animationSpeed) {
      if(this.frame<this.endFrame) this.frame ++;
      else this.frame = this.iniFrame;
      this.animationDuration = 0;
    }
  }
});

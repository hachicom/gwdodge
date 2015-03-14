// Penguin
var Penguin = Class.create(Sprite, {
  // The player character.     
  initialize: function() {
      // 1 - Call superclass constructor
      Sprite.apply(this,[32, 32]);
      this.image = Game.instance.assets['res/penguinSheet.png'];
      this.frame = [0,1];
      // 2 - Animate
      this.animationDuration = 0;
      this.lane = 1;
      this.positions = [55,145,235];
      this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
  },
  
  updateAnimation: function (evt) {        
    if(this.parentNode.gotHit!=true){
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= 0.25) {
        this.frame = (this.frame + 1) % 2;
        this.animationDuration -= 0.25;
      }
    }
  },
  
  switchToLaneNumber: function(lane){     
    playsnd = true;
    this.lane = this.lane + lane;
    if(this.lane<0) {this.lane=0; playsnd = false;}
    if(this.lane>2) {this.lane=2; playsnd = false;}
    //var targetX = 160 - this.width/2 + (this.lane-1)*90;
    this.x = this.positions[this.lane];
    return playsnd;
    //console.log(this.x+' - '+this.lane+' '+lane);
  },
  
  gotHit: function(lane){     
    this.frame = [2];
    //console.log(this.x+' - '+this.lane+' '+lane);
  }
});
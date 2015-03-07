// Penguin
var Penguin = Class.create(Sprite, {
  // The player character.     
  initialize: function() {
      // 1 - Call superclass constructor
      Sprite.apply(this,[30, 43]);
      this.image = Game.instance.assets['res/penguinSheet.png'];
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
    this.lane = this.lane + lane;
    if(this.lane<0) this.lane=0;
    if(this.lane>2) this.lane=2;
    //var targetX = 160 - this.width/2 + (this.lane-1)*90;
    this.x = this.positions[this.lane];
    console.log(this.x+' - '+this.lane+' '+lane);
  }
});
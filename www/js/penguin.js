// Penguin
var Penguin = Class.create(Sprite, {
  // The player character.     
  initialize: function() {
      // 1 - Call superclass constructor
      Sprite.apply(this,[32, 32]);
      this.image = Game.instance.assets['res/penguinSheet.png'];
      this.frame = 0;
      this.iniFrame = 0;
      this.endFrame = 1;
      // 2 - Animate
      this.animationDuration = 0;
      this.animationSpeed = 0.25;
      this.lane = 1;
      this.positions = [55,145,235];
      this.nextpos = 145;
      this.movespeed = 30
      this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
  },
  
  updateAnimation: function (evt) {        
    this.animationDuration += evt.elapsed * 0.001;       
    if (this.animationDuration >= this.animationSpeed) {
      if(this.frame<this.endFrame) this.frame ++;
      else this.frame = this.iniFrame;
      this.animationDuration = 0;
    }
    if(this.parentNode.gotHit!=true){
      if(this.x<this.nextpos) {
        this.x+=this.movespeed;
        if(this.x>=this.nextpos) this.x=this.nextpos;
      }else if(this.x>this.nextpos){
        this.x-=this.movespeed;
        if(this.x<=this.nextpos) this.x=this.nextpos;
      }
    }
  },
  
  switchToLaneNumber: function(lane){     
    if(this.x==this.nextpos){
      playsnd = true;
      this.lane = this.lane + lane;
      if(this.lane<0) {this.lane=0; playsnd = false;}
      if(this.lane>2) {this.lane=2; playsnd = false;}
      //var targetX = 160 - this.width/2 + (this.lane-1)*90;
      this.nextpos = this.positions[this.lane];
      return playsnd;
    }
  },
  
  gotHit: function(lane){     
    this.frame = 2;
    this.iniFrame = 2;
    this.endFrame = 3;
    this.animationDuration = 0;
    this.animationSpeed = 0.1;
    //console.log(this.x+' - '+this.lane+' '+lane);
  }
});
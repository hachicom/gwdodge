// Penguin
var Penguin = Class.create(Sprite, {
  // The player character.     
  initialize: function(x,y) {
      // 1 - Call superclass constructor
      Sprite.apply(this,[32, 32]);
      this.image = Game.instance.assets['res/penguinSheet.png'];
      this.lane = 1;
      this.positions = [70,145,220];
      this.nextpos = x;
      this.movespeed = 30
      this.x = x;
      this.y = y;
      this.movable = true;
      this.tl.setTimeBased();
    
      // 2 - Animate
      this.frame = 0;
      this.iniFrame = 0;
      this.endFrame = 1;
      this.animationDuration = 0;
      this.animationSpeed = 0.25;
      this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
  },
  
  updateAnimation: function (evt) {        
    if (!this.parentNode.paused){
      this.animationDuration += evt.elapsed * 0.001;       
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration = 0;
      }
      /* if(this.parentNode.gotHit!=true){
        if(this.x<this.nextpos) {
          this.x+=this.movespeed;
          if(this.x>=this.nextpos) this.x=this.nextpos;
        }else if(this.x>this.nextpos){
          this.x-=this.movespeed;
          if(this.x<=this.nextpos) this.x=this.nextpos;
        }
      } */
    }
  },
  
  switchToLaneNumber: function(lane,isLit,isThere){
    if (!this.movable) return false;
    //if(this.x==this.nextpos){
      this.tl.clear();
      playsnd = 'jump';
      this.lane = this.lane + lane;
      if(this.lane<0) {
        this.lane=0; 
        //if(isThere) playsnd = 'powerup';
        //else 
        playsnd = false;
      }
      if(this.lane>2) {
        this.lane=2; 
        if(isLit) playsnd = 'powerup';
        else playsnd = false;
      }else{
        //var targetX = 160 - this.width/2 + (this.lane-1)*90;
        //this.nextpos = this.positions[this.lane];
        this.tl.moveTo(this.positions[this.lane], this.y, 50, enchant.Easing.QUAD_EASEINOUT);
      }
      return playsnd;
    //}
  },
  
  resetPosition: function(){
    this.tl.clear();
    this.lane=1;
    this.x = this.positions[1];
    //this.nextpos = this.positions[1];
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 1;
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
  },
  
  gotHit: function(lane){     
    this.frame = 2;
    this.iniFrame = 2;
    this.endFrame = 3;
    this.animationDuration = 0;
    this.animationSpeed = 0.1;
    //console.log(this.x+' - '+this.lane+' '+lane);
  },
  
  shopping: function(buying){     
    if(buying){
      if(this.lane==2){
        this.frame = 4;
        this.iniFrame = 4;
        this.endFrame = 4;
        this.tl.moveTo(252, this.y, 100, enchant.Easing.QUAD_EASEINOUT);
        //this.nextpos = 252;
      }//else{
        // this.frame = 5;
        // this.iniFrame = 5;
        // this.endFrame = 5;
        // this.nextpos = 26;
      // }
    }else{
      this.frame = 0;
      this.iniFrame = 0;
      this.endFrame = 1;
      this.tl.moveTo(this.positions[this.lane], this.y, 100, enchant.Easing.QUAD_EASEINOUT);
      //this.nextpos = this.positions[this.lane];
    }
  },
  
  isVulnerable: function(){
    //return (this.x==this.nextpos);
    return true;
  }
});
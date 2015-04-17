// Fish
var Fish = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(lane,level,piranha) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.piranha = piranha;
    if(this.piranha){
      this.image  = Game.instance.assets['res/piranhaSheet.png'];
      this.ySpeed = 20;
      this.rotationTime = 0;
      this.yAccel = 0.5;
    }else{
      this.image  = Game.instance.assets['res/fishSheet.png'];
      this.ySpeed = 21;
      this.rotationTime = 2;
      this.yAccel = 0.7;
    }
    this.frame = 0;  
    this.rotationSpeed = 0;
    this.animationDuration = 0;
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
    this.y = 569;    
    this.rotation = Math.floor( Math.random() * 360 );
  },
  
  update: function(evt) {
    //IMKORTANTE: � preciso que este objeto seja parte de um grupo filho da scene
    if (!this.parentNode.parentNode.paused){
      var ySpeed, game;
     
      game = Game.instance;
      level = this.parentNode.parentNode.levelcalc;
     
      if(this.parentNode.parentNode.gotHit!=true && this.parentNode.parentNode.buying!=true){
        //Dealing with movement
        if(this.ascending){
          this.ySpeed -= this.yAccel;
          this.y -= this.ySpeed;
          if (this.ySpeed <= 0) this.ascending = false;
        }else{
          this.rotationTime -= evt.elapsed * (level+1) * 0.001;
          if(this.rotationTime <= 0){
            this.ySpeed += this.yAccel;
            this.y += this.ySpeed;
            if (this.y > game.height && this.ascending===false) {
              if(this.parentNode.parentNode.coins != this.parentNode.parentNode.levelUpAt) 
                this.parentNode.parentNode.multiplier=1;  
              this.parentNode.removeChild(this);           
            }
          }
        }
        
        //Dealing with animation
        if(this.rotationTime <= 0 && !this.ascending){
          this.rotation = 270;
        }else{
          if(this.ascending) {
            if(this.piranha) this.rotation += this.rotationSpeed;
            else this.rotation = 90;
          }
          else this.rotation += this.rotationSpeed;
        }
        this.animationDuration += evt.elapsed * 0.001;       
        if (this.animationDuration >= 1) {
          this.frame = (this.frame + 1) % 2;
          this.animationDuration -= 1;
        }
      }
    }
  }
});

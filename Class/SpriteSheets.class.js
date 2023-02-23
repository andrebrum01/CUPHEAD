class SpriteSheets {
  constructor({
    gap = 0,
    spriteList=[],
    x = 0,
    y = 0,
    game
  }) {

    this.spriteList = spriteList;
    this.currentSprite = spriteList[0];
    this.width = this.currentSprite.w * this.currentSprite.scale;
    this.height = this.currentSprite.h * this.currentSprite.scale;
    this.pos = new Vector(x,y)
    this.currentFrame = 0;
    this.lastUpdate = 0;
    this.isPlaying = true;
    this.isFinally = false;
    this.game = game;
    this.gap = gap;
    this.flip = false;
    this.lifeTime = Math.round(1000 / (this.currentSprite.speed * this.game.fps));

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
    this.animate = this.animate.bind(this);
    this.onCollider = this.onCollider.bind(this);
    this.setAnimation = this.setAnimation.bind(this);

    this.collider = new PolygonCollider([
      new Vertex(this.pos.x,this.pos.y),
      new Vertex(this.width+this.pos.x,this.pos.y),
      new Vertex(this.width+this.pos.x,this.height+this.pos.y),
      new Vertex(this.pos.x,this.height+this.pos.y),
    ]);
  }

  setPos(pos){
    this.pos = pos;
    this.collider = new PolygonCollider([
      new Vertex(pos.x,pos.y),
      new Vertex(this.width+pos.x,pos.y),
      new Vertex(this.width+pos.x,this.height+pos.y),
      new Vertex(pos.x,this.height+pos.y),
    ]);
  }

  draw() {
    let flip = this.flip ? -1 : 1;
    this.game.ctx.save();
    this.game.ctx.scale(flip, 1);
    this.game.ctx.drawImage(
      this.currentSprite.image,
      this.currentSprite.x + ((this.currentSprite.w + this.gap) * (this.currentFrame % this.currentSprite.cols)) - this.gap,
      this.currentSprite.y + (this.currentSprite.h * Math.max(Math.floor((this.currentFrame-1) / (this.currentSprite.cols)),0)),
      this.currentSprite.w,
      this.currentSprite.h,
      this.pos.x * flip,
      this.pos.y,
      this.width * flip,
      this.height
    );
    this.game.ctx.restore();
    // Drar debug line collider
    // this.collider.drawPolygonCollider(this.game.ctx);

  }
  

  setAnimation(name) {
    this.spriteList.forEach(sprite=>{
      if(name == sprite.name && this.currentSprite.name != sprite.name){
        this.currentFrame = 0;
        this.currentSprite = sprite;
        this.lifeTime = Math.round(1000 / (this.currentSprite.speed * this.game.fps));
      }
    })
  }

  nextAnimationFrame() {
    this.currentFrame+=1;
    if (this.currentFrame > this.currentSprite.length) {
      if (this.currentSprite.loop) {
        this.currentFrame = 0;
      } else {
        this.isPlaying = false;
        this.isFinally = true;

      }
    }
  }

  animate(time = performance.now()) {
    this.draw();
    if (!this.isPlaying) {
      return;
    }
    if (Math.round(time - this.lastUpdate) > this.lifeTime) {
      this.nextAnimationFrame();
      this.lastUpdate = time;
    }
  }

  play() {
    this.isPlaying = true;
    this.lastUpdate = performance.now();
    this.animate(this.lastUpdate);
  }

  stop() {
    this.isPlaying = false;
  }

  restart() {
    this.currentFrame = 0;
    this.lastUpdate = performance.now();
    this.isPlaying = true;
    this.animate(this.lastUpdate);
  }

  onCollider(other){
    if(this.collider.checkCollision(other)){
      return true;
    }
    return false;
  }
}
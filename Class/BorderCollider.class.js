class BorderCollider {
    constructor(game) {
        this.game = game;
        this.checkCollisions = this.checkCollisions.bind(this);

    }
  
    checkCollisions(object) {
      if (object.pos.x < 0) {
        object.pos.x = 0;
        object.velocity.x = 0;
      }
  
      if (object.pos.y < 0) {
        object.pos.y = 0;
        object.velocity.y = 0;
      }
  
      if (object.pos.x + object.width > this.game.canvas.width) {
        object.pos.x = this.game.canvas.width - object.width;
        object.velocity.x = 0;
      }
  
      if (object.pos.y + object.height >= this.game.canvas.height) {
        object.pos.y = this.game.canvas.height - object.height;
        object.velocity.y = 0;
        object.isJumping = false;
        object.isGrounded = true;
      }
    }
  }
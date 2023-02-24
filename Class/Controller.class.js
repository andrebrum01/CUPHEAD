class Controller {
    constructor(player) {
      this.keyState = {};
      document.addEventListener('keydown', (e) => {
        this.keyState[e.code] = true;
      });
      document.addEventListener('keyup', (e) => {
        this.keyState[e.code] = false;
      });
      this.player = player;
    }
  
    move(axis, direction) {
      if (axis === 'x') {
        if (direction === -1) {
          this.player.moveLeft();
        } else if (direction === 1) {
          this.player.moveRight();
        }
      } else if (axis === 'y') {
        if (direction === -1) {
          this.player.jump();
        }
        // else if (direction === 1) {
        //   this.player.moveDown();
        // }
      }
    }
  
    update() {
      let currentVelocity = this.player.velocity.x;
      if (this.keyState['ArrowLeft'] || this.keyState['KeyA']) {
        this.move('x', -1);
      }
      else if (this.keyState['ArrowRight'] || this.keyState['KeyD']) {
        this.move('x', 1);
      }
      else{
        this.player.stop();
      }
      if (this.keyState['ArrowUp'] || this.keyState['KeyW']) {
        this.move('y', -1);
      }
      if (this.keyState['ArrowDown'] || this.keyState['KeyS']) {
        this.move('y', 1);
      }
      if (!this.keyState['ArrowLeft'] && !this.keyState['KeyA'] && !this.keyState['ArrowRight'] && !this.keyState['KeyD'] && currentVelocity !== 0) {
        this.player.stop();
      }
      this.player.animationStates();
    }
  }
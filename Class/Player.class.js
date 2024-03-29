class Player {
    constructor({x, y, speed, jumpForce, game, sprite}) {
      // CONSTANTE DE JOGO 
      this.game = game;

      // ANIMAÇÃO DO PLAYER
      this.sprite = sprite;

      // PROPRIEDADES DE ESPAÇO
      this.pos = new Vector(x,y);
      this.width = sprite.width;
      this.height = sprite.height;

      // PROPRIEDADES DE FORÇAS
      this.speed = speed;
      this.jumpForce = jumpForce;
      this.velocity= new Vector();
      this.gravity = 0.5;

      // PROPRIEDADES DE ESTADOS
      this.isJumping = false;
      this.isGrounded = false;
      this.isMove = false;

      // COLISORES
      this.borderCollider = new BorderCollider(game);
      // CONTROLES
      this.controller = new Controller(this);

    }
  
    update() {
      this.sprite.setPos(this.pos);
      this.atualizarPos(this.sprite);
      this.sprite.animate();
      // Atualiza a posição do player
      this.pos = this.pos.add(this.velocity);
  
      // Aplica a gravidade
      this.velocity.y += this.gravity;
      // Limita a velocidade vertical do player
      if (this.velocity.y > 10) {
        this.velocity.y = 10;
      }
  
      // Limita a velocidade horizontal do player
      if (this.velocity.x > this.speed) {
        this.velocity.x = this.speed;
      } else if (this.velocity.x < -this.speed) {
        this.velocity.x = -this.speed;
      }

      this.borderCollider.checkCollisions(this);
    }
  
    jump() {
      // Verifica se o player está no chão e não está pulando
      if (this.isGrounded && !this.isJumping) {
        // Aplica uma força no sentido oposto da gravidade
        this.velocity.y = -this.jumpForce;
        this.isJumping = true;
        this.isGrounded = false;
      }
    }
  
    moveLeft() {
      this.velocity.x = -this.speed;
      this.sprite.flip=true;
      this.isMove = true
    }
  
    moveRight() {
      this.velocity.x = this.speed;
      this.sprite.flip=false;
      this.isMove = true
    }
  
    stop() {
      this.velocity.x = 0;
      this.isMove = false
    }

    animationStates(){
      if(this.velocity.y!=0 || this.isJumping){
        this.sprite.setAnimation('jump');
      }
      else if(this.isMove){
        this.sprite.setAnimation('run');
      }
      else{
        this.sprite.setAnimation('idle');
      }
    }

    atualizarPos(currentSprite){
      let flip = currentSprite.flip ? -1 : 1;
      const tempWidth = currentSprite.width;
      const tempHeight = currentSprite.height;
      this.pos.x += (this.width - tempWidth)*flip;
      this.pos.y += (this.height - tempHeight);
      this.width = tempWidth;
      this.height = tempHeight;
    }
  
    onCollision(other) {
      if (other instanceof BorderCollider) {
        const border = other.border;
        if (border === 'left') {
          this.position.x = 0;
          this.stop();
        }
        if (border === 'right') {
          this.velocity.x = Math.min(0, this.velocity.x);
          this.position.x = this.game.canvas.width - this.width / 2;
        }
        if (border === 'top') {
          this.velocity.y = 0;
          this.position.y = this.height / 2;
        }
        if (border === 'bottom') {
          this.isGrounded = true;
          this.velocity.y = 0;
          this.position.y = this.game.canvas.height - this.height / 2;
        }
      } else {
        this.isGrounded = true;
      }
    }
  
  }
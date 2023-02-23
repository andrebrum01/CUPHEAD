class Projectile {
  constructor(position, velocity, gravity) {
    this.position = position;
    this.velocity = velocity;
    this.gravity = gravity;
  }

  update(deltaTime) {
    const acceleration = this.gravity;
    const velocityDelta = acceleration.multiply(deltaTime);
    this.velocity = this.velocity.add(velocityDelta);
    const positionDelta = this.velocity.multiply(deltaTime);
    this.position = this.position.add(positionDelta);
  }

  draw(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
    context.fill();
  }
}
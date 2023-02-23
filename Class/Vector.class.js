class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
    this.magnitude = this.magnitude.bind(this);
    this.normalized = this.normalized.bind(this);
  } 
  
    add(other) {
      let x = this.x + other.x;
      let y = this.y + other.y;
      return new Vector(x,y);
    }
  
    subtract(other) {
      let x = this.x - other.x;
      let y = this.y - other.y;
      return new Vector(x,y);
    }
  
    multiply(scalar) {
      let x = this.x *scalar;
      let y = this.y *scalar;
      return new Vector(x,y);
    }
  
    divide(scalar) {
      let x = this.x / scalar;
      let y = this.y / scalar;
      return new Vector(x,y);
    }
  
    magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    normalized() {
      const magnitude = this.magnitude;
      if (magnitude === 0) {
        return new Vector(0, 0);
      }
      return this.divide(magnitude);
    }
}
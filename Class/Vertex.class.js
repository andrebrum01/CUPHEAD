class Vertex extends Vector{
    constructor(x, y) {
      super(x,y);
    }
    
    dot(other) {
      return (this.x * other.x) + (this.y * other.y);
    }
  }
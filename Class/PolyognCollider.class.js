class PolygonCollider {
    constructor(vertices) {
      this.vertices = vertices;
    }
  
    checkCollision(other) {
      // Para cada aresta neste polígono
      for (let i = 0; i < this.vertices.length; i++) {
        const p1 = this.vertices[i];
        const p2 = this.vertices[(i + 1) % this.vertices.length];
  
        // Para cada aresta no outro polígono
        for (let j = 0; j < other.vertices.length; j++) {
          const q1 = other.vertices[j];
          const q2 = other.vertices[(j + 1) % other.vertices.length];
  
          // Calcula o ponto de interseção entre as arestas
          const intersection = getIntersection(p1, p2, q1, q2);
  
          // Se houver interseção, os polígonos colidiram
          if (intersection) {
            return true;
          }
        }
      }
  
      // Não houve colisão
      return false;
    }
  
    getNormals() {
      const normals = [];
      const vertices = this.vertices;
  
      for (let i = 0; i < vertices.length; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 1) % vertices.length];
        const edge = p2.subtract(p1);
        normals.push(new Vertex(-edge.y, edge.x).normalized());
      }
  
      return normals;
    }
  
    project(axis) {
      let min = Number.MAX_VALUE;
      let max = -Number.MAX_VALUE;
  
      for (let i = 0; i < this.vertices.length; i++) {
        const projection = this.vertices[i].dot(axis);
        min = Math.min(min, projection);
        max = Math.max(max, projection);
      }
  
      return new Projection(min, max);
    }

    drawPolygonCollider(context,color='red') {
      context.beginPath();
      const vertices = this.vertices;
      context.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        const vertex = vertices[i];
        context.lineTo(vertex.x, vertex.y);
      }
      context.closePath();
      context.strokeStyle = color;
      context.stroke();
    }
}
function getIntersection(p1, p2, q1, q2) {
  const a = p2.y - p1.y;
  const b = p1.x - p2.x;
  const c = a * p1.x + b * p1.y;
  const d = q2.y - q1.y;
  const e = q1.x - q2.x;
  const f = d * q1.x + e * q1.y;
  const det = a * e - b * d;

  if (det === 0) {
    return null;
  } else {
    const x = (e * c - b * f) / det;
    const y = (a * f - d * c) / det;

    if (isBetween(p1.x, p2.x, x) && isBetween(p1.y, p2.y, y) && isBetween(q1.x, q2.x, x) && isBetween(q1.y, q2.y, y)) {
      return {x, y};
    } else {
      return null;
    }
  }
}

// Função auxiliar para verificar se um valor está dentro de um intervalo
function isBetween(a, b, c) {
return (a <= c && c <= b) || (a >= c && c >= b);
}
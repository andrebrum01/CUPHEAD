class Game {
    constructor({ canvas, displayWidth, displayHeight, scale ,FPS=60}) {
        this.canvas = canvas;
        this.canvas.width = displayWidth * scale;
        this.canvas.height = displayHeight * scale;
        this.ctx = canvas.getContext('2d');
        this.backgroundColor = '#000';
        this.fps = FPS;
        this.lastFrameTime = 0;
        this.numFrames = 0;
    }

    draw() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update(funcShow = () => {}, lastTime = 0) {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        this.clear();
        this.draw();
        funcShow(deltaTime);
        requestAnimationFrame(() => {
            this.update(funcShow, currentTime);
        });
        this.medirFPS(currentTime);
    }

    medirFPS(currentTime){
        this.numFrames++;
        if (currentTime - this.lastFrameTime >= 1000) {
            this.renderFPS();
            this.numFrames = 0;
            this.lastFrameTime = currentTime;
        }
    }

    renderFPS(){
        const fps = this.numFrames / ((performance.now() - this.lastFrameTime) / 1000);
        return(fps.toFixed(2));
    }
}
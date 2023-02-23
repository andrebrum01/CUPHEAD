class Sprite {
    constructor({
        x,
        y,
        length,
        cols,
        rows=1,
        name="",
        scale=1,
        speed=1,
        loop=true,
        src=''
    }){
        const myImage = new Image();
        myImage.src = src;
        this.name= name;
        this.w= myImage.width/cols;
        this.h= myImage.height/rows;
        this.x= x;
        this.y= y;
        this.length= length;
        this.cols = cols;
        this.rows = rows;
        this.scale = scale;
        this.speed = speed;
        this.loop = loop;
        this.image = myImage;
        
    }
}
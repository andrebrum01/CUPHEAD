class Colletable extends SpriteSheets{
    constructor(collect){
        super(collect);
        this.isDestroed = false;
        this.destroy = this.destroy.bind(this);
    }
    destroy(nameAnimation){
        this.setAnimation(nameAnimation);
        setInterval(()=>{
            this.isDestroed = true;
        },[this.lifeTime*10])
    }
}
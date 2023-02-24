var displayWidth = 1280;
var displayHeight = 739;
var scale = 2;
var FPS = 22;

document.addEventListener('DOMContentLoaded',()=>{
    
    // Setup de Game
    const canvas = document.querySelector('canvas');
    const game = new Game({canvas,displayWidth,displayHeight,scale,FPS});

    // Setup de Sprite
    const coins = new SpriteSheets({
        game,
        gap: 0,
        spriteList:[
            new Sprite({
                name:"idle",
                length: 16,
                x: 0,
                y: 0,
                cols: 16,
                speed: .5,
                src:'./Assets/coins/coins_idle.png'
            }),
            new Sprite({
                name:"splash",
                length: 27,
                x: 0,
                y: 0,
                cols: 5,    
                rows: 4,
                speed: 1,
                scale:.6,
                src:'./Assets/coins/coins_splash.png',
                loop: false
            }),
        ]
    });
  
    const playerSprite = new SpriteSheets({
        game,
        gap: 0,
        spriteList:[
            new Sprite({
                name:"idle",
                length: 6,
                x: 0,
                y: 0,
                cols: 6,
                speed: .12,
                scale: .5,
                src:'./Assets/cuphead_player/cup_idle.png',
            }),
            new Sprite({
                name:"jump",
                length: 8,
                x: 0,
                y: 0,
                cols: 8,
                speed: .6,
                scale: .5,
                src:'./Assets/cuphead_player/cup_jump.png',
            }),
            new Sprite({
                name:"run",
                length: 16,
                x: 0,
                y: 0,
                cols: 16,
                speed: 1.1,
                scale: .5,
                rows: 2,
                src:'./Assets/cuphead_player/cup_run.png',
            }),
        ],
        x:150,
    });

    const player = new Player({
        game,
        x:(canvas.width-playerSprite.width)/2,
        y:0,
        speed:10,
        jumpForce:20,
        sprite: playerSprite
    });

    const controls = new Controller(player);

    addEvents({coins,playerSprite});

    // Set coin in Game
    let colletableArray =[];
    const tam =10;
    for(let i=0;i<tam;i++){
        const colletable =  new Colletable(coins);
        colletable.setPos(new Vector(
            Math.random()*(canvas.width-colletable.currentSprite.w),
            ((canvas.height-colletable.currentSprite.h)-(Math.random()*(player.jumpForce*25)))
        ));
        colletableArray.push(colletable);
    }
    game.update(()=>{
        player.update();
        colletableArray = colletableArray.filter(collect=>{
            collect.animate();
            if(collect.onCollider(player.sprite.collider)){
                collect.destroy("splash");
            }
            return !collect?.isDestroed;
        });
        controls.update();
    })
})

function addEvents({coins,playerSprite}){
    const buttonToogle = document.querySelector('.toogle');
    buttonToogle.addEventListener('click',()=>{
        if(coins.isPlaying){
            coins.stop()
            playerSprite.stop()
            buttonToogle.innerHTML ="<i class='ph-play'></i> play";
            buttonToogle.classList.remove("stop");
            buttonToogle.classList.add("play");
        }
        else{
            coins.play();
            playerSprite.play();
            buttonToogle.innerHTML ="<i class='ph-pause'></i> pause";
            buttonToogle.classList.remove("play");
            buttonToogle.classList.add("stop");
        }
    });
}
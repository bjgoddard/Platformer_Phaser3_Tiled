const gameConfig = {
    type: Phaser.AUTO,
    width: 272,
    height: 160,
    pixelArt: true,
    zoom: 3,
    parent: "gameContainer",
    
    // backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 120 },
            debug: true
        }
    },
    scene: [Scene1, Scene2]
}

let platforms;
let player;


const game = new Phaser.Game(gameConfig);
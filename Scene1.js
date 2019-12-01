class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame")
    }

preload() {
    this.load.image("background2", "assets/backgroundimages/parallax-forest-lights.png")
    this.load.image("background1", "assets/backgroundimages/parallax-forest-back-trees.png")
    this.load.image("background3", "assets/backgroundimages/parallax-forest-middle-trees.png")
    this.load.image("background4", "assets/backgroundimages/parallax-forest-front-trees.png")
    this.load.image("ground", "assets/ground.png")
    this.load.atlas("girl", "assets/girlSpritesheet/girlSprites.png", "assets/girlSpritesheet/girlSprites.json")

    //Tiled maps
    this.load.image("tileset", "assets/image/level1/tileset.png")
    this.load.image("tilesets", "assets/image/level2/tilesets.png")
    
    this.load.tilemapTiledJSON('map', 'assets/tilemap/level1.json')
    }

create() {
        this.add.text(20, 20, "Loading game...")
        this.scene.start("playGame")
        ;
    }

update(){
    
}


}
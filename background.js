class Background extends Phaser.GameObjects.TileSprite {

    constructor(scene, x, y, width, height, texture) {
        super(scene, x, y, width, height, texture);
        this.setOrigin(0, 0)
        this.width = game.config.width;
        this.height = game.config.height;
        scene.add.existing(this);
       
        // this.setOrigin(0, 0)
        // this.setScrollFactor(0)
        // this.width = game.config.width;
        // this.height = game.config.height;
        
    }
    create() {
        this.setOrigin(0, 0)
        this.setScrollFactor(0)
        this.width = game.config.width;
        this.height = game.config.height;
    }
    preUpdate() {
        
        
    }
    update() {
        // background1.tilePositionX = cameras.main.scrollX * .1
        // background2.tilePositionX = cameras.main.scrollX * .2
        // background3.tilePositionX = cameras.main.scrollX * .3
        // background4.tilePositionX = cameras.main.scrollX * .4
        // background5.tilePositionX = cameras.main.scrollX * .2
        // background6.tilePositionX = cameras.main.scrollX * .6
    }
  
}
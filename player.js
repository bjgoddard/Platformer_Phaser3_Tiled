class Player extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);

        scene.physics.world.enableBody(this)
        this.displayWidth = 16;
        this.displayHeight = 16;
        this.dead = false;
        this.setBounce(-.1)
        this.setCollideWorldBounds(true)
    }

    create() {
        
        
    }
    update() {
        
    }
}

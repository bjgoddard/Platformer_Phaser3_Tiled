class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

    create() {

// STATIC BACKGROUND
        // Creating background images
        // this.background1 = this.add.image(0, 0, "background1")
        // //Set images to start at top left
        // this.background1.setOrigin(0, 0)
        // //Scaling x4 because images small
        // this.background1.setScale(4)
        // this.background2 = this.add.image(0, 0, "background2")
        // this.background2.setOrigin(0, 0)
        // this.background2.setScale(4)
        // this.background2 = this.add.image(0, 0, "background3")
        // this.background2.setOrigin(0, 0)
        // this.background2.setScale(4)
        // this.background2 = this.add.image(0, 0, "background4")
        // this.background2.setOrigin(0, 0)
        // this.background2.setScale(4)
        

    //PARALLAX BACKGROUND
        this.background1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background1")
        this.background1.setOrigin(0, 0)
        this.background1.setScrollFactor(0)
        this.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background2")
        this.background2.setOrigin(0, 0)
        this.background2.setScrollFactor(0)
        this.background3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background3")
        this.background3.setOrigin(0, 0)
        this.background3.setScrollFactor(0)
        this.background4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background4")
        this.background4.setOrigin(0, 0)
        this.background4.setScrollFactor(0)
        // this.background1.setTileScale(4, 4)
        // this.background2.setTileScale(4, 4)
        // this.background3.setTileScale(4, 4)
        // this.background4.setTileScale(4, 4)

     

        //Adding platforms
        platforms = this.physics.add.staticGroup()
        platforms.create(70, 165, 'ground')
        platforms
      
        //Adding Player
        player = this.physics.add.sprite(40, 90, 'girl', 'idle1.png')
        player.displayWidth = 20;
        player.displayHeight = 20;


        player.setBounce(0)
        player.setCollideWorldBounds(true)

        //ANIMATIONS
        
        this.anims.create({
            key: 'idle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNames('girl', {
                prefix: 'idle',
                suffix: '.png',
                start: 1,
                end: 4,
            }),
            
        })
        
        this.anims.create(
            {key: 'run',
            frames: this.anims.generateFrameNames('girl', {
                prefix: 'run',
                suffix: '.png',
                start: 1,
                end: 5,
             }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'jump',
            frameRate: 10,
            repeat: -1,
            frames: [{key: 'girl', frame: 'jump1.png'}],
           
        })
    

        //Add player controls
        this.cursors = this.input.keyboard.createCursorKeys();

        //OLD detect player/platform collision
        // this.physics.add.collider(player, platforms)

        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"})

        //Tiled map
        let map = this.add.tilemap("map")

        let level1 = map.addTilesetImage("tileset")
        let level2 = map.addTilesetImage("tilesets")

        //layers
        
    let terrain = map.createStaticLayer("terrain", [level1, level2], -60, 20)
        let spikes = map.createStaticLayer("spikes", [level1], 0, 0)
        let water = map.createStaticLayer("water", [level2], 0, 0)
        
        //collision
        this.physics.add.collider(player, terrain)
        terrain.setCollisionByProperty({collision: true})
        
        //set boundaries of game world
        this.physics.world.bounds.width = terrain.width;
        this.physics.world.bounds.height = terrain.height;

        //set bounds so camera won't exit game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //make camera follow player
        this.cameras.main.startFollow(player)


 }



    update() {
            //Player controls and animations
            if (this.cursors.left.isDown)
            {
                player.setVelocityX(-70);
                //Flip sprite to left
                player.flipX = true;
                if (player.body.onFloor()){
                player.anims.play('run', true);
            
                }
            }
            else if (this.cursors.right.isDown)
            {
                player.setVelocityX(70);
                player.flipX = false;
                if (player.body.onFloor()){
                player.anims.play('run', true);
                
            }
        }
            else
            {
                player.setVelocityX(0);
                if (player.body.onFloor()){
                player.anims.play('idle', true);
                }
            }

            if (this.cursors.up.isDown && player.body.onFloor())
            {
                player.setVelocityY(-100);
                player.anims.stop()
                player.anims.play('jump', true);
            }



    }
    
    
}
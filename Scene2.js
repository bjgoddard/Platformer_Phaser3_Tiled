// import Phaser from "./phaser.min.js";
// // import player from "player.js";


 class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

create() {

    

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
        this.background5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background5")
            this.background5.setOrigin(0, 0)
            this.background5.setScrollFactor(0)
            this.background5.visible = false
            this.background6 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background6")
            this.background6.setOrigin(0, 0)
            this.background6.setScrollFactor(0)
            this.background6.visible = false

        // //Adding Player
        player = this.physics.add.sprite(40, 90, 'girl', 'idle1.png').setDepth(1)
        player.displayWidth = 16;
        player.displayHeight = 16;
        player.dead = false;

        player.setBounce(0)
        player.setCollideWorldBounds(true)

        //Player die functions
        const killPlayer = () => {
            //Play death sound
            player.dead = true;
            player.setVelocityX(0);
            player.anims.play('dead', true)
            let killTimer = this.time.delayedCall(3000, killPlayerReset);
        }

        const killPlayerReset = () => {
            console.log("killPlayerReset called")
            this.scene.restart()
            
        }
          

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
        this.anims.create({
            key: 'dead',
            frameRate: 1,
            repeat: -1,
            frames: [{key: 'girl', frame: 'dead1.png'}]
        })

        this.anims.create(
            {key: 'run',
            frames: this.anims.generateFrameNames('girl', {
                prefix: 'run',
                suffix: '.png',
                start: 1,
                end: 5,
             }),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'jump',
            frameRate: 7,
            repeat: -1,
            frames: [{key: 'girl', frame: 'jump1.png'}],
        })

        //Add player controls
        this.cursors = this.input.keyboard.createCursorKeys();

        //Tiled map
        let map = this.add.tilemap("map")

        let level1 = map.addTilesetImage("tileset")
        let level2 = map.addTilesetImage("tilesets")

        //layers
        let terrain = map.createDynamicLayer("terrain", [level1, level2], -60, 20)

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

//MAP EVENTS WHEN PLAYER REACHES TILE
        //Camera shake on reach first button
        terrain.setTileLocationCallback(49, 7, 2, 1, () => {
            console.log("Camera Shake Event")

            //REMOVE THIS.CURSORS LISTENER HELP BRANDI

            this.cameras.main.shake(3000, 0.03, false)
            player.dead = true
            player.x += 75
            //Play sound

            //HOW MAKE GIRL PLAY DEAD ????
            player.anims.play('dead', true)
            terrain.setTileLocationCallback(49, 7, 2, 1, null)
        })
        //Move girlsprite during camera shake
        this.cameras.main.on('camerashakestart', function () {
            player.anims.play('dead', true)
        })
        this.cameras.main.on('camerashakecomplete', function () {
            console.log("camera shake complete")
            player.anims.play('dead', true)
            this.cameras.main.fade(2000)

        }, this)
        this.cameras.main.once('camerafadeoutcomplete',function (camera) {
            //Add new background
            this.background5.visible = true
            this.background6.visible = true
            player.dead = false
            console.log(player.x)
            console.log('camerafadeoutcomplete')
            camera.fadeIn(5000)
            }, this)


        //Grass spikes
            terrain.setTileLocationCallback(16, 6, 5, 1, () => {
                //Kill player
                 killPlayer();
                // player.dead = true
                // player.anims.play('dead', true)
                // let killTimer = this.time.delayedCall(3000, killPlayerReset);

                
                
                console.log("KILL AND RESTART")

            })
            terrain.setTileLocationCallback(22, 7, 3, 1, () => {
                killPlayer();
            })

            terrain.setTileLocationCallback(25, 8, 4, 1, () => {
                killPlayer();
            })

            terrain.setTileLocationCallback(29, 9, 3, 1, () => {
                killPlayer();
            })

            terrain.setTileLocationCallback(32, 10, 2, 1, () => {
                killPlayer();
            })

        //Cave spikes
        terrain.setTileLocationCallback(48, 40, 3, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(44, 40, 1, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(42, 41, 1, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(38, 42, 2, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(35, 44, 1, 1, () => {
            killPlayer();  
        })
        terrain.setTileLocationCallback(31, 45, 2, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(27, 45, 2, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(6, 55, 3, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(15, 55, 3, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(9, 54, 1, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(14, 54, 1, 1, () => {
            killPlayer();
        })
        terrain.setTileLocationCallback(17, 23, 1, 1, () => {
            killPlayer();
        })
    
     }
     

        




    update() {
            

          if (!player.dead) {
            if (this.cursors.left.isDown)
            {
                player.setVelocityX(-200);
                //Flip sprite to left
                player.flipX = true;
                if (player.body.onFloor()){
                player.anims.play('run', true);

                }
            }
            else if (this.cursors.right.isDown)
            {
              player.setVelocityX(200);
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

            if (this.cursors.up.isDown && player.body.onFloor()) {
                player.setVelocityY(-200);
                player.anims.stop()
                player.anims.play('jump', true);
            }
          }

        //parallax background
        this.background1.tilePositionX = this.cameras.main.scrollX * .1
        this.background2.tilePositionX = this.cameras.main.scrollX * .2
        this.background3.tilePositionX = this.cameras.main.scrollX * .3
        this.background4.tilePositionX = this.cameras.main.scrollX * .4
        this.background5.tilePositionX = this.cameras.main.scrollX * .2
        this.background6.tilePositionX = this.cameras.main.scrollX * .6



    }
    

}


// Maybe fix first button x push
// var timer = scene.time.addEvent({
//     delay: 500,                // ms
//     callback: callback,
//     //args: [],
//     callbackScope: thisArg,
//     repeat: 4
// });
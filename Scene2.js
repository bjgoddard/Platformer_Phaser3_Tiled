class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

create() {


// audio.play();
    const lostWoods = this.sound.add('lostWoods', {volume: 0.2})
    // lostWoods.play()
   

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
        // player = this.physics.add.sprite(40, 90, 'girl', 'idle1.png').setDepth(1)
        player = new Player(this, 40, 90, 'girl', 'idle1.png')
        
        

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
          

        // ANIMATIONS

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

       
        
        //Fireballs

    

    var fireParticles = this.add.particles('fireball');
    fireParticles.setScale(.5)
    fireParticles.createEmitter({
        
        x: 64,
        y: { min: 500, max: 700, steps:  3},
        lifespan: 1700,
        accelerationX: 200,
        scale: 0.1,
        frequency: 1000,
        deathZone: { type: 'onEnter', source: fireCollision}
    });
    var fireCollision = {
        contains: function (x, y)
        {
            var hit = player.body.hitTest(x, y);
    
            if (hit) {killPlayer()}
    
            return hit;
        }
    };

    // var emitter = particles.createEmitter()
    // emitter.setPosition(200, 400)
    // emitter.setSpeed(200)
    // emitter.setBlendMode(Phaser.BlendModes.ADD)
        
        
        //Platforms + moving ?
     var platform = this.physics.add.image(100, 470, 'platform').setImmovable(true)
        
        platform.setScale(.6)
        platform.body.setAllowGravity(false);
        platform.body.friction.y = 1;
        this.tweens.timeline({
            targets: platform.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -20, duration: 3700, ease: 'Stepped' },
              { x: 0, y: 20, duration: 3700, ease: 'Stepped' }
            ]
          });
        
        this.physics.add.collider(platform, player);

        var platform2 = this.physics.add.image(60, 810, 'platform').setImmovable(true)
        
        platform2.setScale(.6)
        platform2.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform2.body.velocity,
            loop: -1,
            tweens: [
              { x: 20, y: 0, duration: 3700, ease: 'Stepped' },
              { x: -20, y: 0, duration: 3700, ease: 'Stepped' }
            ]
          });
        
        this.physics.add.collider(platform2, player);

        var platform3 = this.physics.add.image(65, 790, 'platform').setImmovable(true)
       
        platform3.setScale(.6)
        platform3.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform3.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -20, duration: 2500, ease: 'Stepped' },
              { x: 0, y: 20, duration: 2500, ease: 'Stepped' }
            ]
          });
        
        this.physics.add.collider(platform3, player);

        var platform4 = this.physics.add.image(100, 720, 'platform').setImmovable(true)
       
        platform4.setScale(.6)
        platform4.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform4.body.velocity,
            loop: -1,
            tweens: [
              { x: 20, y: -5, duration: 3500, ease: 'Stepped' },
              { x: -20, y: 5, duration: 3500, ease: 'Stepped' }
            ]
          });
        
        this.physics.add.collider(platform4, player);

        var platform5 = this.physics.add.image(160, 670, 'platform').setImmovable(true)
        
        platform5.setScale(.6)
        platform5.body.setAllowGravity(false);
        platform5.body.friction.y = 1;
        this.tweens.timeline({
            targets: platform5.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -20, duration: 3700, ease: 'Stepped' },
              { x: 0, y: 20, duration: 3700, ease: 'Stepped' }
            ]
          });
          
          this.physics.add.collider(platform5, player);

        var platform6 = this.physics.add.image(130, 610, 'platform').setImmovable(true)
        platform6.setScale(.6)
          platform6.body.setAllowGravity(false);
          platform6.body.friction.y = 1;
          this.tweens.timeline({
              targets: platform6.body.velocity,
              loop: -1,
              tweens: [
                { x: 0, y: -20, duration: 2500, ease: 'Stepped' },
                { x: 0, y: 20, duration: 2500, ease: 'Stepped' }
              ]
            });
            
            this.physics.add.collider(platform6, player);

         var platform7 = this.physics.add.image(160, 420, 'platform').setImmovable(true)
            platform7.setScale(.6)
          platform7.body.setAllowGravity(false);
          platform7.body.friction.y = 1;
          this.tweens.timeline({
              targets: platform7.body.velocity,
              loop: -1,
              tweens: [
                { x: 0, y: -30, duration: 1500, ease: 'Stepped' },
                { x: 0, y: 30, duration: 1500, ease: 'Stepped' }
              ]
            });
            
            this.physics.add.collider(platform7, player);

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
        this.cameras.main.once('camerashakestart', function () {
            player.anims.play('dead', true)
        })
        this.cameras.main.once('camerashakecomplete', function () {
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

        
            terrain.setTileLocationCallback(51, 37, 2, 1, () => {
                this.cameras.main.flash(500)
                //Shoot fireball on interval

                terrain.setTileLocationCallback(51, 37, 2, 1, null)
            })
            



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
            // killPlayer();
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

            if (this.cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)) {
                player.setVelocityY(-200);
                
                player.anims.stop()
                player.anims.play('jump', true);
            }
          }
          
        // parallax background
        this.background1.tilePositionX = this.cameras.main.scrollX * .1
        this.background2.tilePositionX = this.cameras.main.scrollX * .2
        this.background3.tilePositionX = this.cameras.main.scrollX * .3
        this.background4.tilePositionX = this.cameras.main.scrollX * .4
        this.background5.tilePositionX = this.cameras.main.scrollX * .2
        this.background6.tilePositionX = this.cameras.main.scrollX * .6
        // background1.tilePositionX = this.cameras.main.scrollX * .1
        // background2.tilePositionX = this.cameras.main.scrollX * .2
        // background3.tilePositionX = this.cameras.main.scrollX * .3
        // background4.tilePositionX = this.cameras.main.scrollX * .4
        // background5.tilePositionX = this.cameras.main.scrollX * .2
        // background6.tilePositionX = this.cameras.main.scrollX * .6

        
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
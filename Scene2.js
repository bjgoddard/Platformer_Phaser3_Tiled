class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame")
    }

create() {
    //Level1 Song
    const lostWoods = this.sound.add('lostWoods', {volume: 0.2})
        lostWoods.play()
    const battleSong = this.sound.add('battle', {volume: 0.2})

    //Forest background images
    this.background1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background1").setOrigin(0,0).setScrollFactor(0)
    this.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background2").setOrigin(0, 0).setScrollFactor(0)
    this.background3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background3").setOrigin(0, 0).setScrollFactor(0)
    this.background4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background4").setOrigin(0, 0).setScrollFactor(0)

    //Cave background images (hidden until earthquake)
    this.background5 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background5").setOrigin(0, 0).setScrollFactor(0)
    this.background5.visible = false
    this.background6 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background6").setOrigin(0, 0).setScrollFactor(0)
    this.background6.visible = false

    //Adding Player
    player = new Player(this, 40, 110, 'girl', 'idle1.png')

    //Player die function
    const killPlayer = () => {
        player.dead = true;
        player.setVelocityX(0);
        player.anims.play('dead', true)
        let killTimer = this.time.delayedCall(3000, killPlayerReset);
        }
    const restartGame = () => {
        let winTimer = this.time.delayedCall(5000, killPlayerReset);
    }

    //Delayed callback to reset
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

    //Tiled tilesets
        let level1 = map.addTilesetImage("tileset")
        let level2 = map.addTilesetImage("tilesets")

     //Tiled Layer
        let terrain = map.createDynamicLayer("terrain", [level1, level2], -60, 20)

    //Collision
        this.physics.add.collider(player, terrain)
        terrain.setCollisionByProperty({collision: true})

    //Set boundaries of game world
        this.physics.world.bounds.width = terrain.width;
        this.physics.world.bounds.height = terrain.height;
        
    //Moving platforms
        var platform = this.physics.add.image(100, 470, 'platform').setImmovable(true).setScale(.6)
        platform.body.setAllowGravity(false);
        //Tween to move
        this.tweens.timeline({
            targets: platform.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -20, duration: 3700, ease: 'Stepped' },
              { x: 0, y: 20, duration: 3700, ease: 'Stepped' }
            ]});
        this.physics.add.collider(platform, player);

        var platform2 = this.physics.add.image(60, 810, 'platform').setImmovable(true).setScale(.6)
        platform2.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform2.body.velocity,
            loop: -1,
            tweens: [
              { x: 20, y: 0, duration: 3700, ease: 'Stepped' },
              { x: -20, y: 0, duration: 3700, ease: 'Stepped' }
            ]});
        this.physics.add.collider(platform2, player);

        var platform3 = this.physics.add.image(65, 790, 'platform').setImmovable(true).setScale(.6)
        platform3.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform3.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -20, duration: 2500, ease: 'Stepped' },
              { x: 0, y: 20, duration: 2500, ease: 'Stepped' }
            ]});
        this.physics.add.collider(platform3, player);

        var platform4 = this.physics.add.image(100, 720, 'platform').setImmovable(true).setScale(.6)
        platform4.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform4.body.velocity,
            loop: -1,
            tweens: [
              { x: 20, y: -5, duration: 3500, ease: 'Stepped' },
              { x: -20, y: 5, duration: 3500, ease: 'Stepped' }
            ]});
        
        this.physics.add.collider(platform4, player);

        var platform5 = this.physics.add.image(160, 670, 'platform').setImmovable(true).setScale(.6)
        platform5.body.setAllowGravity(false);
        this.tweens.timeline({
            targets: platform5.body.velocity,
            loop: -1,
            tweens: [
              { x: 0, y: -30, duration: 3700, ease: 'Stepped' },
              { x: 0, y: 30, duration: 3700, ease: 'Stepped' }
            ]});
          this.physics.add.collider(platform5, player);

        var platform6 = this.physics.add.image(130, 610, 'platform').setImmovable(true).setScale(.6)
          platform6.body.setAllowGravity(false);
          this.tweens.timeline({
              targets: platform6.body.velocity,
              loop: -1,
              tweens: [
                { x: 0, y: -30, duration: 3000, ease: 'Stepped' },
                { x: 0, y: 30, duration: 3000, ease: 'Stepped' }
              ]});
            this.physics.add.collider(platform6, player);

         var platform7 = this.physics.add.image(160, 420, 'platform').setImmovable(true).setScale(.6)
          platform7.body.setAllowGravity(false);
          this.tweens.timeline({
              targets: platform7.body.velocity,
              loop: -1,
              tweens: [
                { x: 0, y: -30, duration: 2000, ease: 'Stepped' },
                { x: 0, y: 30, duration: 2000, ease: 'Stepped' }
              ]});
            this.physics.add.collider(platform7, player);

    //Set bounds so camera won't exit game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //Make camera follow player
        this.cameras.main.startFollow(player)
        
  
        
    //Map events when player reaches tile coordinates
        //Camera shake on reach first button, remove controls, move player
        terrain.setTileLocationCallback(49, 7, 2, 1, () => {
            this.cameras.main.shake(3000, 0.03, false)
            lostWoods.stop()
            battleSong.play()
            player.dead = true
            player.x += 75
                                        //Play sound
        //Callback again to prevent repeat
            terrain.setTileLocationCallback(49, 7, 2, 1, null)
        })
        this.cameras.main.once('camerashakestart', () => {
            player.anims.play('dead', true)
        })
        this.cameras.main.once('camerashakecomplete', () => {
            this.cameras.main.fade(2000)}, this)
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            //Reveal new backgrounds, return controls
            this.background5.visible = true
            this.background6.visible = true
            player.dead = false
            camera.fadeIn(5000)
            }, this)
    //This would start fireballs
        terrain.setTileLocationCallback(51, 37, 2, 1, () => {
            this.cameras.main.flash(500)
            terrain.setTileLocationCallback(51, 37, 2, 1, null)
            })

    //Grass spikes
        terrain.setTileLocationCallback(16, 6, 5, 1, () => {
        //Kill player
            killPlayer();
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
    //Win when touching last button
        terrain.setTileLocationCallback(37, 26, 2, 1, (winGame) => {
            var winConfetti = this.add.image(520, 415, 'confetti').setScale(.5)
            const winSound = this.sound.add('winSound', {volume: 0.5})
            battleSong.stop()
            winSound.play()
            var winText = this.add.text(450, 400, "u win! restarting in 5")
            restartGame()
            terrain.setTileLocationCallback(37, 26, 2, 1, null)
        })
        
    }

update() {
    //If player is not dead, enable controls
        if (!player.dead) {
            if (this.cursors.left.isDown){
                player.setVelocityX(-70);
                //Flip sprite to left
                player.flipX = true;
                    if (player.body.onFloor()){
                    player.anims.play('run', true)
                }
            }
            else if (this.cursors.right.isDown){
                player.setVelocityX(70);
                player.flipX = false;
                    if (player.body.onFloor()){
                    player.anims.play('run', true);
                }
            }
            else{
                player.setVelocityX(0);
                    if (player.body.onFloor() || player.body.touching.down){
                    player.anims.play('idle', true);
                }
            }
            if ((this.cursors.up.isDown || this.cursors.space.isDown) && (player.body.onFloor() || player.body.touching.down)){
                player.setVelocityY(-100);
                player.anims.stop()
                player.anims.play('jump', true)
                }
            }
          
        // Scroll backgrounds
        this.background1.tilePositionX = this.cameras.main.scrollX * .1
        this.background2.tilePositionX = this.cameras.main.scrollX * .2
        this.background3.tilePositionX = this.cameras.main.scrollX * .3
        this.background4.tilePositionX = this.cameras.main.scrollX * .4
        this.background5.tilePositionX = this.cameras.main.scrollX * .2
        this.background6.tilePositionX = this.cameras.main.scrollX * .6
    }
}
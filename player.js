// import phaser from "phaser"

 class Player {
    constructor(scene, x, y) {
      this.scene = scene;
  
    // //   Create the animations we need from the player spritesheet
    //   const anims = scene.anims;
    //   anims.create({
    //     key: "player-idle",
    //     frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    //     frameRate: 3,
    //     repeat: -1
    //   });

    //Adding Player
    player = this.physics.add.sprite(40, 90, 'girl', 'idle1.png').setDepth(1)
    player.displayWidth = 16;
    player.displayHeight = 16;
    player.dead = false

    // Kill player function
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
    

    player.setBounce(0)
    player.setCollideWorldBounds(true)

      //ANIMATIONS
    const anims = scene.anims;
      anims.create({
        key: 'idle',
        frameRate: 3,
        repeat: -1,
        frames: anims.generateFrameNames('girl', {
            prefix: 'idle',
            suffix: '.png',
            start: 1,
            end: 4,
        }),
    })
    anims.create({
        key: 'dead',
        frameRate: 1,
        repeat: -1,
        frames: [{key: 'girl', frame: 'dead1.png'}]
    })

    anims.create(
        {key: 'run',
        frames: anims.generateFrameNames('girl', {
            prefix: 'run',
            suffix: '.png',
            start: 1,
            end: 5,
         }),
        frameRate: 7,
        repeat: -1
    })
    anims.create({
        key: 'jump',
        frameRate: 7,
        repeat: -1,
        frames: [{key: 'girl', frame: 'jump1.png'}],
    })
  }
}
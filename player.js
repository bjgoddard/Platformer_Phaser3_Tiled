// // import phaser from "phaser"

// class Player extends Phaser.GameObjects.Sprite {
//       constructor(config) {
//         super(config.scene, config.x, config.y, "player");
//         config.scene.add.existing(this)
//     }
// }
  
    

//     //Adding Player
//     // player = this.physics.add.sprite(40, 90, 'girl', 'idle1.png').setDepth(1)
//     player.displayWidth = 16;
//     player.displayHeight = 16;
//     player.dead = false;
//     player.setBounce(0);
//     player.setCollideWorldBounds(true);

//     // Kill player function
//   const killPlayer = () => {
//       //Play death sound
//       player.dead = true;
//       player.setVelocityX(0);
//       player.anims.play('dead', true)
//       let killTimer = this.time.delayedCall(3000, killPlayerReset);
//   }

//   const killPlayerReset = () => {
//       console.log("killPlayerReset called")
//       this.scene.restart()
//   }
    
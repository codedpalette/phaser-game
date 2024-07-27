import { Game, Types } from "phaser"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  //backgroundColor: "#028af8",
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  scene: { preload, create, update },
}

export default new Game(config)

function preload(this: Phaser.Scene) {
  this.load.image("sky", "assets/sky.png")
  this.load.image("ground", "assets/platform.png")
  this.load.image("star", "assets/star.png")
  this.load.image("bomb", "assets/bomb.png")
  this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })
}

let player: Types.Physics.Arcade.SpriteWithDynamicBody
let score = 0
let scoreText: Phaser.GameObjects.Text

function create(this: Phaser.Scene) {
  const { width, height } = this.game.config
  const center = { x: +width / 2, y: +height / 2 }
  this.add.image(center.x, center.y, "sky")

  const platforms = this.physics.add.staticGroup()
  ;(platforms.create(400, 568, "ground") as Phaser.Physics.Arcade.Image).setScale(2).refreshBody()

  platforms.create(600, 400, "ground")
  platforms.create(50, 250, "ground")
  platforms.create(750, 220, "ground")

  const stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  })
  stars.children.iterate((child) => {
    ;(child as Phaser.Physics.Arcade.Sprite).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    return true
  })

  player = this.physics.add.sprite(100, 450, "dude").setBounce(0.2).setCollideWorldBounds(true)
  player.body.setGravityY(200)

  this.physics.add.collider(player, platforms)
  this.physics.add.collider(stars, platforms)
  this.physics.add.overlap(player, stars, collectStar as Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this)

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  })

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  })

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  })

  scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", color: "#000" })
}

function collectStar(
  _player: Types.Physics.Arcade.SpriteWithDynamicBody,
  star: Types.Physics.Arcade.SpriteWithDynamicBody,
) {
  star.disableBody(true, true)

  score += 10
  scoreText.setText("Score: " + score)
}

function update(this: Phaser.Scene) {
  const cursors = this.input.keyboard!.createCursorKeys()
  if (cursors.left.isDown) {
    player.setVelocityX(-160)

    player.anims.play("left", true)
  } else if (cursors.right.isDown) {
    player.setVelocityX(160)

    player.anims.play("right", true)
  } else {
    player.setVelocityX(0)

    player.anims.play("turn")
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-500)
  }
}

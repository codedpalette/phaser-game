import { Scene, Types } from "phaser"

import { Player } from "../objects/Player"

export class Game extends Scene {
  player!: Player
  score = 0
  scoreText!: Phaser.GameObjects.Text
  bombs!: Phaser.Physics.Arcade.Group
  stars!: Phaser.Physics.Arcade.Group

  constructor() {
    super("Game")
  }

  create() {
    const { width, height } = this.game.config
    const center = { x: +width / 2, y: +height / 2 }
    this.add.image(center.x, center.y, "sky")

    const platforms = this.physics.add.staticGroup([
      this.physics.add.staticSprite(400, 568, "ground").setScale(2).refreshBody(),
      this.physics.add.staticSprite(600, 400, "ground"),
      this.physics.add.staticSprite(50, 250, "ground"),
      this.physics.add.staticSprite(750, 220, "ground"),
    ])

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })
    this.stars.children.iterate((child) => {
      ;(child as Types.Physics.Arcade.SpriteWithStaticBody).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
      return true
    })
    this.bombs = this.physics.add.group()

    this.player = new Player(this, 100, 450)
    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(this.stars, platforms)
    this.physics.add.collider(this.bombs, platforms)
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    )
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb as Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this,
    )

    this.scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", color: "#000" })
  }

  update(): void {
    this.player?.update()
  }

  collectStar = (
    _player: Types.Physics.Arcade.SpriteWithDynamicBody,
    star: Types.Physics.Arcade.SpriteWithStaticBody,
  ) => {
    star.disableBody(true, true)

    this.score += 10
    this.scoreText?.setText("Score: " + this.score)

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        const inactiveStar = child as Types.Physics.Arcade.SpriteWithStaticBody
        inactiveStar.enableBody(true, inactiveStar.x, 0, true, true)
        return true
      })

      const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

      const bomb = this.bombs.create(x, 16, "bomb") as Types.Physics.Arcade.SpriteWithStaticBody
      bomb.setBounce(1)
      bomb.setCollideWorldBounds(true)
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
  }

  hitBomb = (player: Types.Physics.Arcade.SpriteWithDynamicBody, _bomb: Types.Physics.Arcade.SpriteWithStaticBody) => {
    this.physics.pause()
    player.setTint(0xff0000)
    player.anims.play("turn")
    this.scene.start("GameOver")
  }
}

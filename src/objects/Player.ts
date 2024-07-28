export class Player extends Phaser.Physics.Arcade.Sprite {
  declare body: Phaser.Physics.Arcade.Body
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dude")

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

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setBounce(0.2).setCollideWorldBounds(true)
    this.body.setGravityY(200)
  }

  update(): void {
    const cursors = this.scene.input.keyboard!.createCursorKeys()
    if (cursors.left.isDown) {
      this.setVelocityX(-160)

      this.anims.play("left", true)
    } else if (cursors.right.isDown) {
      this.setVelocityX(160)

      this.anims.play("right", true)
    } else {
      this.setVelocityX(0)

      this.anims.play("turn")
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-500)
    }
  }
}

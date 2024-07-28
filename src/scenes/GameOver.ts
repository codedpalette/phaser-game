import { Scene } from "phaser"

export class GameOver extends Scene {
  constructor() {
    super("GameOver")
  }

  create() {
    const { width, height } = this.game.config
    const center = { x: +width / 2, y: +height / 2 }
    this.add.image(center.x, center.y, "background").setAlpha(0.5)

    this.add
      .text(center.x, center.y, "Game Over", {
        fontFamily: "Arial Black",
        fontSize: 64,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)

    this.input.once("pointerdown", () => this.scene.start("MainMenu"))
  }
}

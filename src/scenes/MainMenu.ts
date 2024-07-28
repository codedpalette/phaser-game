import { Scene } from "phaser"

export class MainMenu extends Scene {
  private readonly menuStrokeColor = "#000000"
  private readonly menuStrokeThickness = 3
  private readonly menuStrokeThicknessActive = 8
  constructor() {
    super("MainMenu")
  }

  create() {
    const centerX = +this.game.config.width / 2
    const centerY = +this.game.config.height / 2
    this.add.image(centerX, centerY, "background")
    this.add.image(centerX, 240, "logo")
    const text = this.add
      .text(centerX, 360, "Start", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: this.menuStrokeColor,
        strokeThickness: this.menuStrokeThickness,
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive()
    text
      .on("pointerover", () => text.setStroke(this.menuStrokeColor, this.menuStrokeThicknessActive))
      .on("pointerout", () => text.setStroke(this.menuStrokeColor, this.menuStrokeThickness))
      .on("pointerdown", () => this.scene.start("Game"))
  }
}

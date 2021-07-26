scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . 1 1 1 . . . .
    . . . . . . . . . 1 1 1 1 . . .
    . . . . . . . . . 1 1 1 1 1 . .
    . . 1 1 8 8 8 8 8 1 1 1 1 1 . .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . 9 . . . . . . . .
            . . . 9 9 . . . . . . . . . . .
            . . . 9 9 9 . . . . . . . . . .
            . . . . . 9 . . . . . . . . . .
            . . . . . . 9 . . . . . . . . .
            . . . . . . . 9 9 . . . . . . .
            . . . . . 9 9 9 9 9 . . . . . .
            . . . . 9 9 9 9 9 9 9 . . 9 . .
            . 9 9 . 9 9 9 9 9 9 9 9 9 9 . .
            . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 .
            . . 9 9 9 9 9 9 9 9 9 9 9 . . .
            . . . 9 9 9 9 9 9 . . 9 9 . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let body = sprites.create(assets.image`body`, SpriteKind.Enemy)
    body.setVelocity(-100, randint(-30, 30))
    body.y = randint(0, scene.screenHeight())
    body.left = scene.screenWidth()
    body.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.bubbles, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})

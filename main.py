scene.set_background_color(8)
spacePlane=sprites.create(img("""
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
"""),SpriteKind.player)
info.set_life(3)
spacePlane.set_stay_in_screen(True)
controller.move_sprite(spacePlane, 200, 200)
def on_a_pressed():
    missile=sprites.create_projectile_from_sprite(
        img("""
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
        """), spacePlane, 200, 0)
controller.A.on_event(
    ControllerButtonEvent.PRESSED, on_a_pressed)
def on_update():
    body=sprites.create(assets.image("""body"""),
        SpriteKind.enemy)
    body.set_velocity(-100, randint(-30, 30))
    body.y=randint(0, scene.screen_height())
    body.left=scene.screen_width()
    body.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(500, on_update)
def on_hit(sprite, othersprite):
    othersprite.destroy(effects.bubbles, 100)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy,
    on_hit)
def on_crash(sprite,othersprite):
    othersprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy,
    on_crash)
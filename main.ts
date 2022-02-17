function move_right () {
    while (move_cols([
    5,
    4,
    3,
    2,
    1
    ], CollisionDirection.Right)) {
    	
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    unpause()
    if (!(moving)) {
        move_up()
    }
})
function add_barrier_remover () {
    tile = sprites.create(assets.image`barrier_remover`, SpriteKind.Player)
    grid.place(tile, get_empty_spot())
    sprites.setDataNumber(tile, "value", -1)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    pause2()
})
function unwall () {
    for (let row = 0; row <= 5; row++) {
        for (let col = 0; col <= 5; col++) {
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(col + 1, row + 1), assets.tile`barrier`))) {
                tiles.setWallAt(tiles.getTileLocation(col + 1, row + 1), false)
            }
        }
    }
}
function add_200_pointer () {
    tile = sprites.create(assets.image`point200_tile`, SpriteKind.Player)
    grid.place(tile, get_empty_spot())
    sprites.setDataNumber(tile, "value", -4)
}
function add_100_pointer () {
    tile = sprites.create(assets.image`point100_tile`, SpriteKind.Player)
    grid.place(tile, get_empty_spot())
    sprites.setDataNumber(tile, "value", -3)
}
function move_cols (cols: any[], direction: number) {
    moving = true
    has_moved = false
    for (let index of cols) {
        for (let tile of grid.colSprites(index)) {
            for (let other_tile of grid.allSprites()) {
                if (sprites.readDataNumber(tile, "value") == sprites.readDataNumber(other_tile, "value")) {
                    tiles.setWallAt(tiles.locationOfSprite(other_tile), false)
                } else {
                    tiles.setWallAt(tiles.locationOfSprite(other_tile), true)
                }
            }
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(tile), direction)))) {
                grid.place(tile, tiles.locationInDirection(tiles.locationOfSprite(tile), direction))
                has_moved = true
            }
        }
        pause(1)
    }
    unwall()
    moving = false
    return has_moved
}
function set_score_to (s: number) {
    real_score = s
}
function num_to_color (num: number) {
    if (num <= 4) {
        return images.colorBlock(13)
    } else if (num <= 16) {
        return images.colorBlock(5)
    } else if (num <= 64) {
        return images.colorBlock(4)
    } else if (num <= 256) {
        return images.colorBlock(2)
    } else {
        return images.colorBlock(3)
    }
}
function prepare_tilemap () {
    scene.setBackgroundColor(13)
    tiles.loadMap(tiles.createMap(tilemap`screen`))
    scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + tiles.tileWidth() / 4)
}
function update_high_score () {
    if (!(label_high_score_sprite)) {
        label_high_score_sprite = textsprite.create("High: ", 0, 15)
        label_high_score_sprite.setFlag(SpriteFlag.Ghost, true)
        label_high_score_sprite.top = tiles.tileWidth() * 2.5
        label_high_score_sprite.left = tiles.tileWidth() * 7.25
        high_score_sprite = textsprite.create("", 0, 15)
        high_score_sprite.setFlag(SpriteFlag.Ghost, true)
        high_score_sprite.top = tiles.tileWidth() * 3
        high_score_sprite.left = tiles.tileWidth() * 7.25
    }
    high_score_sprite.setText("" + high_score)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    unpause()
    if (!(moving)) {
        move_left()
    }
})
function get_empty_spot () {
    location = tiles.getTileLocation(randint(1, 6), randint(1, 6))
    while (grid.getSprites(location).length > 0 || tiles.tileIsWall(location)) {
        location = tiles.getTileLocation(randint(1, 6), randint(1, 6))
    }
    return location
}
function move_rows (rows: any[], direction: number) {
    moving = true
    has_moved = false
    for (let index of rows) {
        for (let tile of grid.rowSprites(index)) {
            for (let other_tile of grid.allSprites()) {
                if (sprites.readDataNumber(tile, "value") == sprites.readDataNumber(other_tile, "value")) {
                    tiles.setWallAt(tiles.locationOfSprite(other_tile), false)
                } else {
                    tiles.setWallAt(tiles.locationOfSprite(other_tile), true)
                }
            }
            if (!(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(tile), direction)))) {
                grid.place(tile, tiles.locationInDirection(tiles.locationOfSprite(tile), direction))
                has_moved = true
            }
        }
        pause(1)
    }
    unwall()
    moving = false
    return has_moved
}
function pause2 () {
    if (paused) {
        return
    }
    paused = true
    pause_sprite = textsprite.create("Paused", 1, 15)
    pause_sprite.setPosition(scene.screenWidth() / 2, scene.screenHeight() * 0.5)
    pause_sprite.z = 10
    pause_sprite.setFlag(SpriteFlag.Ghost, true)
    pause_sprite.setBorder(1, 15, 1)
    screen_shader = shader.createRectangularShaderSprite(scene.screenWidth(), scene.screenHeight() + 8, shader.ShadeLevel.One)
    screen_shader.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    screen_shader.z = 5
    screen_shader.setFlag(SpriteFlag.Ghost, true)
}
function update_score () {
    if (!(label_score_sprite)) {
        label_score_sprite = textsprite.create("Score: ", 0, 15)
        label_score_sprite.setFlag(SpriteFlag.Ghost, true)
        label_score_sprite.top = tiles.tileWidth() * 1
        label_score_sprite.left = tiles.tileWidth() * 7.25
        score_sprite = textsprite.create("", 0, 15)
        score_sprite.setFlag(SpriteFlag.Ghost, true)
        score_sprite.top = tiles.tileWidth() * 1.5
        score_sprite.left = tiles.tileWidth() * 7.25
    }
    score_sprite.setText("" + display_score)
}
function unpause () {
    if (!(paused)) {
        return
    }
    paused = false
    pause_sprite.destroy()
    screen_shader.destroy()
}
function move_left () {
    while (move_cols([
    2,
    3,
    4,
    5,
    6
    ], CollisionDirection.Left)) {
    	
    }
}
function all_tiles_say_value () {
    for (let tile of grid.allSprites()) {
        tile.sayText("" + sprites.readDataNumber(tile, "value"))
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    unpause()
    if (!(moving)) {
        move_right()
    }
})
function move_down () {
    while (move_rows([
    5,
    4,
    3,
    2,
    1
    ], CollisionDirection.Bottom)) {
    	
    }
}
function remove_barrier () {
    location = tiles.getTilesByType(assets.tile`barrier`)._pickRandom()
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`tile0`)
    barrier_count += -1
}
function change_score_by (s: number) {
    real_score += s
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    unpause()
    if (!(moving)) {
        move_down()
    }
})
function has_barriers () {
    return tiles.getTilesByType(assets.tile`barrier`).length > 0
}
function add_50_pointer () {
    tile = sprites.create(assets.image`point50_tile`, SpriteKind.Player)
    grid.place(tile, get_empty_spot())
    sprites.setDataNumber(tile, "value", -2)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprites.readDataNumber(sprite, "value") == sprites.readDataNumber(otherSprite, "value")) {
        if (sprites.readDataNumber(sprite, "value") == -1) {
            sprite.destroy()
            if (has_barriers()) {
                remove_barrier()
            }
            change_score_by(25)
        } else if (sprites.readDataNumber(sprite, "value") == -2) {
            sprite.destroy()
            change_score_by(50)
        } else if (sprites.readDataNumber(sprite, "value") == -3) {
            sprite.destroy()
            change_score_by(100)
        } else if (sprites.readDataNumber(sprite, "value") == -4) {
            sprite.destroy()
            change_score_by(200)
        } else {
            sprites.changeDataNumberBy(sprite, "value", sprites.readDataNumber(otherSprite, "value"))
            change_score_by(sprites.readDataNumber(otherSprite, "value"))
            update_tile_image(sprite)
            if (sprites.readDataNumber(sprite, "value") >= 4096) {
                info.setScore(real_score)
                game.over(true)
            }
        }
        otherSprite.destroy()
    }
})
function add_barrier () {
    location = get_empty_spot()
    tiles.setWallAt(location, true)
    tiles.setTileAt(location, assets.tile`barrier`)
    barrier_count += 1
}
function update_tile_image (sprite: Sprite) {
    sprite.setImage(assets.image`tile`.clone())
    print_num(sprite.image, sprites.readDataNumber(sprite, "value"))
    sprite.image.replace(13, num_to_color(sprites.readDataNumber(sprite, "value")))
}
function has_empty_spot () {
    for (let row = 0; row <= 5; row++) {
        for (let col = 0; col <= 5; col++) {
            if (tiles.tileIsWall(tiles.getTileLocation(col + 1, row + 1))) {
                continue;
            }
            if (grid.getSprites(tiles.getTileLocation(col + 1, row + 1)).length == 0) {
                return true
            }
        }
    }
    return false
}
function add_number (num: number) {
    tile = sprites.create(assets.image`tile`, SpriteKind.Player)
    grid.place(tile, get_empty_spot())
    sprites.setDataNumber(tile, "value", num)
    print_num(tile.image, num)
}
function print_num (image_ptr: Image, num: number) {
    if (!(text_sprite)) {
        text_sprite = textsprite.create("", 0, 15)
        text_sprite.setMaxFontHeight(5)
        text_sprite.setFlag(SpriteFlag.Invisible, true)
    }
    num_as_str = convertToText(num)
    text_sprite.setText(num_as_str)
    if (num < 10) {
        spriteutils.drawTransparentImage(text_sprite.image, image_ptr, 6, 6)
    } else if (num < 100) {
        spriteutils.drawTransparentImage(text_sprite.image, image_ptr, 3, 5)
    } else {
        num_y = 2
        for (let index = 0; index <= (convertToText(num).length - 1) / 2; index++) {
            num_as_str = "" + convertToText(num).charAt(index * 2) + convertToText(num).charAt(index * 2 + 1)
            text_sprite.setText(num_as_str)
            spriteutils.drawTransparentImage(text_sprite.image, image_ptr, 3, num_y)
            num_y += 6
        }
    }
}
function move_up () {
    while (move_rows([
    2,
    3,
    4,
    5,
    6
    ], CollisionDirection.Top)) {
    	
    }
}
let num_y = 0
let num_as_str = ""
let text_sprite: TextSprite = null
let score_sprite: TextSprite = null
let label_score_sprite: TextSprite = null
let screen_shader: Sprite = null
let pause_sprite: TextSprite = null
let location: tiles.Location = null
let high_score_sprite: TextSprite = null
let label_high_score_sprite: TextSprite = null
let has_moved = false
let tile: Sprite = null
let high_score = 0
let display_score = 0
let real_score = 0
let moving = false
let paused = false
stats.turnStats(true)
paused = true
pause(200)
if (controller.B.isPressed()) {
    if (game.ask("Reset high score?")) {
        blockSettings.remove("high-score")
        game.splash("High score reset!")
        game.reset()
    }
}
prepare_tilemap()
let barrier_count = 0
moving = false
let time_left = 1000
let barrier_percent = 2
let barrier_remove_percent = 3
let point_50_percent = 5
let point_100_percent = 2
let point_200_percent = 1
let max_barriers = 6
real_score = 0
display_score = 0
if (!(blockSettings.exists("high-score"))) {
    blockSettings.writeNumber("high-score", 0)
}
high_score = blockSettings.readNumber("high-score")
paused = false
for (let index = 0; index < 2; index++) {
    add_number(2)
    add_barrier()
}
update_score()
update_high_score()
game.onUpdateInterval(50, function () {
    if (!(paused)) {
        if (display_score < real_score) {
            if (real_score - display_score > 50) {
                display_score += 5
            } else if (real_score - display_score > 10) {
                display_score += 2
            } else {
                display_score += 1
            }
            update_score()
        } else if (display_score > real_score) {
            if (display_score - real_score > 50) {
                display_score += -5
            } else if (display_score - real_score > 10) {
                display_score += -2
            } else {
                display_score += -1
            }
            update_score()
        }
    }
})
forever(function () {
    while (moving || paused) {
        pause(1)
    }
    if (has_empty_spot()) {
        if (Math.percentChance(barrier_remove_percent) && has_barriers()) {
            add_barrier_remover()
        } else if (Math.percentChance(point_50_percent)) {
            add_50_pointer()
        } else if (Math.percentChance(point_100_percent)) {
            add_100_pointer()
        } else if (Math.percentChance(point_200_percent)) {
            add_200_pointer()
        } else {
            add_number(2)
        }
    } else {
        info.setScore(real_score)
        game.over(false)
    }
    if (has_empty_spot()) {
        if (barrier_count < max_barriers && Math.percentChance(barrier_percent)) {
            add_barrier()
        }
    }
    time_left = Math.max(time_left - 5, 200)
    pause(time_left)
})

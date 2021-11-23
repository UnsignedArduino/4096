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
    move_up()
})
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
    }
    moving = false
    return has_moved
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    move_left()
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
    }
    moving = false
    return has_moved
}
info.onCountdownEnd(function () {
    timer.background(function () {
        while (moving) {
            pause(100)
        }
        if (has_empty_spot()) {
            add_number(2)
        } else {
            game.over(false)
        }
        if (has_empty_spot()) {
            if (barrier_count < max_barriers && Math.percentChance(barrier_percent)) {
                add_barrier()
            }
        }
        time_left = Math.max(time_left - 0.05, 0.25)
        info.startCountdown(time_left)
    })
})
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
    move_right()
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
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    move_down()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprites.readDataNumber(sprite, "value") == sprites.readDataNumber(otherSprite, "value")) {
        sprites.changeDataNumberBy(sprite, "value", sprites.readDataNumber(otherSprite, "value"))
        info.changeScoreBy(sprites.readDataNumber(otherSprite, "value"))
        update_tile_image(sprite)
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
            if (tiles.tileIsWall(tiles.getTileLocation(col, row))) {
                continue;
            }
            if (grid.getSprites(tiles.getTileLocation(col, row)).length == 0) {
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
let tile: Sprite = null
let location: tiles.Location = null
let has_moved = false
let max_barriers = 0
let barrier_percent = 0
let time_left = 0
let moving = false
let barrier_count = 0
stats.turnStats(true)
prepare_tilemap()
barrier_count = 0
moving = false
time_left = 1
barrier_percent = 2
max_barriers = 6
for (let index = 0; index < 2; index++) {
    add_number(2)
    add_barrier()
}
info.startCountdown(time_left)
info.setScore(0)

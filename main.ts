function prepare_tilemap () {
    scene.setBackgroundColor(13)
    tiles.loadMap(tiles.createMap(tilemap`screen`))
    scene.centerCameraAt(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + tiles.tileWidth() / 4)
}
function get_empty_spot () {
    location = tiles.getTileLocation(randint(1, 6), randint(1, 6))
    while (grid.getSprites(location).length > 0) {
        location = tiles.getTileLocation(randint(1, 6), randint(1, 6))
    }
    return location
}
function has_empty_spot () {
    for (let index = 0; index <= 5; index++) {
        if (grid.rowSprites(index + 1).length < 6) {
            return true
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
let num_y = 0
let num_as_str = ""
let text_sprite: TextSprite = null
let tile: Sprite = null
let location: tiles.Location = null
stats.turnStats(true)
prepare_tilemap()
for (let index = 0; index < 2; index++) {
    add_number(2)
}
forever(function () {
    if (has_empty_spot()) {
        add_number(2)
    } else {
        game.over(false)
    }
    pause(2000)
})

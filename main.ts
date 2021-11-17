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
    images.printCenter(tile.image, convertToText(num), 4, 15)
    sprites.setDataNumber(tile, "value", num)
}
let tile: Sprite = null
let location: tiles.Location = null
stats.turnStats(true)
prepare_tilemap()
add_number(2)

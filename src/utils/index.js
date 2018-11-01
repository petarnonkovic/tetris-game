/**
 * Create empty grid for drawing game pieces
 * @param w Width of grid
 * @param h Heigth of grid
 * @returns {Array}
 */
export function createGameGrid(w, h) {
    let grid = []
    while (h--) {
        grid.push(Array(w).fill(0))
    }

    return grid
}

/**
 * Returns random color from passed array of colors
 * @param colors Array of colors
 * @returns {String}
 */
/*
export function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

export function distance(x1, y1, x2, y2) {
// calculate points distance
const xDist = x2 - x1
const yDist = y2 - y1

// return distance(hypotenuse)
return Math.sqrt(Math.pow(xDist * 2) + Math.pow(yDist * 2))
}

export function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min)
}
*/


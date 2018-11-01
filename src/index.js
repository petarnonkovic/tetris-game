import {
    createGameGrid
} from './utils'
import {
    colorMap
} from './utils/colorMap'
import getTetraminoMatrix from './utils/tetraminos'

// canvas container
const container = document.querySelector('#container')

/**
 * Game Object
 * @type {{canvas: HTMLElement, start: Game.start, clear: Game.clear}}
 */
const Game = {
    canvas: document.createElement('canvas'),
    animationFrameId: null,
    dropCounter: 0,
    dropInterval: 1000,
    lastRefreshTime: 0,
    score: 0,
    area: {
        matrix: createGameGrid(20, 30),
        offset: { x: 0, y: 0 }
    },
    piece: {
        matrix: null,
        offset: { x: 0, y: 0 }
    },
    start: function() {
        // set canvas dimensions
        this.canvas.width = container.clientWidth
        this.canvas.height = container.clientHeight
        // get context
        this.context = this.canvas.getContext('2d')
        // scale canvas context
        this.context.scale(20, 20)
        // insert canvas into container div
        container.appendChild(this.canvas)
        // reset piece to starting point
        this.resetGamePiece()
        // run animation loop
        animate()
    },
    clear: function() {
        this.context.fillStyle = colorMap[0][0]
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    resetGamePiece() {
        const components = 'IJLOSTZ'
        this.piece.matrix = getTetraminoMatrix(components[components.length * Math.random() | 0])
        this.piece.offset.x = (this.area.matrix[0].length / 2 | 0) - (this.piece.matrix[0].length / 2 | 0)
        this.piece.offset.y = 0
        if (collide(this.area.matrix, this.piece)) {
            this.area.matrix.forEach(row => row.fill(0))
            // reset score
            this.score = 0
        }
    }
}

// Definition
function areaSwipe() {
    const gameArea = Game.area.matrix
    let rowCount = 1
    outer: for (let y = gameArea.length - 1; y > 0; y--) {
        for (let x = 0; x < gameArea[y].length; x++) {
            if (gameArea[y][x] === 0) {
                continue outer
            }
        }

        let row = gameArea.splice(y, 1)[0].fill(0)
        gameArea.unshift(row)
        y++

        // set score
        Game.score += rowCount * 10
        rowCount *= 2
    }
}

function drawScore(context, score) {
    context.fillStyle = colorMap[0][1]
    context.textAlign= "end"
    context.font="0.05rem Arial"
    context.fillText(`Score: ${score} `, 20, 1)
}

function drawComponent(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                Game.context.fillStyle = colorMap[value]
                Game.context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1, 1
                )
            }
        })
    })
}

function collide(gameArea, gamePiece) {
    let { matrix, offset } = gamePiece
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (
                matrix[y][x] !== 0 &&
                (gameArea[y + offset.y] &&
                gameArea[y + offset.y][x + offset.x]) !== 0
            ) {
                return true
            }
        }
    }
    return false
}

function merge(gameArea, gamePiece) {
    gamePiece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                gameArea[y + gamePiece.offset.y][x + gamePiece.offset.x] = value
            }
        })
    })
}

// component movement
function componentDrop() {
    Game.piece.offset.y++
    if (collide(Game.area.matrix, Game.piece)) {
        Game.piece.offset.y--
        merge(Game.area.matrix, Game.piece)
        Game.resetGamePiece()
        areaSwipe()
    }
    Game.dropCounter = 0
}

function componentMove(offset) {
    Game.piece.offset.x += offset
    if (collide(Game.area.matrix, Game.piece)) {
        Game.piece.offset.x -= offset
    }
}

// component rotation
function componentRotate(dir) {
    // current game piece
    let component = Game.piece
    // cache position x on rotate
    let positionX = component.offset.x
    // game grid
    let area = Game.area.matrix
    let offset = 1
    rotate(component.matrix, dir)
    while (collide(area, component)) {
        component.offset.x += offset
        offset = -(offset + (offset > 0 ? 1 : -1))
        if (offset > component.matrix[0].length) {
            rotate(component.matrix, -dir)
            component.offset.x = positionX
            return
        }
    }
}

function rotate(matrix, direction) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ]
        }
    }
    // check direction and complete rotation
    if (direction > 0) {
        matrix.forEach(row => row.reverse())
    } else {
        matrix.reverse()
    }
}


// Implementation
function draw() {
    // clear game area
    Game.clear()


    // draw game area
    drawComponent(Game.area.matrix, Game.area.offset)
    // draw game components
    drawComponent(Game.piece.matrix, Game.piece.offset)

    // draw game score
    drawScore(Game.context, Game.score)

}

// Animation loop Game.animationFrameId =
function animate(time = 0) {
    let deltaTime = time - Game.lastRefreshTime
    Game.lastRefreshTime = time
    Game.dropCounter += deltaTime
    // if interval is passed drop down one
    if (Game.dropCounter > Game.dropInterval) {
        componentDrop()
    }

    // init game components and start loop
    draw()
    requestAnimationFrame(animate)
}

// controler event handlers
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            componentMove(-1)
            break
        case 39:
            componentMove(1)
            break
        case 40:
            componentDrop()
            break
        case 38:
            // rotate to right
            componentRotate(1)
            // rotate to left
            // componentRotate(-1)
            break
    }
})




document.addEventListener('DOMContentLoaded', () => {
    Game.start()
})

/**
 * Returns drawing map of tetramino by type
 * @param type String letter of tetramino look
 * @returns {number[][]}
 */
export default function(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
            break
        case 'O':
            return [
                [2, 2],
                [2, 2]
            ]
        case 'Z':
            return [
                [3, 3, 0],
                [0, 3, 3],
                [0, 0, 0]
            ]
        case 'S':
            return [
                [0, 4, 4],
                [4, 4, 0],
                [0, 0, 0]
            ]
        case 'I':
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ]
        case 'L':
            return [
                [0, 6, 0],
                [0, 6, 0],
                [0, 6, 6]
            ]
        case 'J':
            return [
                [0, 7, 0],
                [0, 7, 0],
                [7, 7, 0]
            ]
    }
}

export const NUMBER_OF_ROWS = 9
export const NUMBER_OF_COLUMNS = 9
export const BOX_SIZE_HEIGHT = 3
export const BOX_SIZE_WIDTH = 3
export const NUMBER_OF_ELEMENTS_ON_BOARD = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS
export const DIFFICULTY_EASY = 25
export const DIFFICULTY_MEDIUM = 20
export const DIFFICULTY_TOUGH = 15
export const TYPE_USER = 0
export const TYPE_GENERATED = 1
const EMPTY_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
const EMPTY_USER_BOARD = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}]
]
export function createSudokoBoard () {
  let board = EMPTY_BOARD.map((boardRow) => boardRow.slice())
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    values = Shuffle(values)
    let backtrackCounter = 0
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      for (let index = 0; index < values.length; index++) {
        let value = values[index]
        if (isValidMove(board, i, j, value)) {
          board[i][j] = value
          values = values.filter((v) => v !== value)
          break
        } else if (NUMBER_OF_COLUMNS - j <= 3 >= values.length) {
          backtrackCounter++
          let initialIndex = j
          let backtrack
          for (backtrack = 1; initialIndex - backtrack >= 0 && backtrack <= backtrackCounter; backtrack++) {
            j = initialIndex - backtrack
            values = values.concat(board[i][j])
            board[i][j] = 0
          }
          j = initialIndex - backtrack
          if (backtrackCounter >= NUMBER_OF_COLUMNS - 1) {
            backtrackCounter = 0
            i = i - 1
            for (let l = 0; l < NUMBER_OF_COLUMNS; l++) {
              board[i][l] = 0
            }
            values = Shuffle(values)
          }
          break
        } else if (index === values.length - 1) {
          backtrackCounter++
          let initialIndex = j
          let backtrack
          for (backtrack = 1; initialIndex - backtrack >= 0 && backtrack <= backtrackCounter; backtrack++) {
            j = initialIndex - backtrack
            values = values.concat(board[i][j])
            board[i][j] = 0
          }
          j = initialIndex - backtrack
          if (backtrackCounter >= NUMBER_OF_COLUMNS - 1) {
            backtrackCounter = 0
            i = i - 1
            for (let l = 0; l < NUMBER_OF_COLUMNS; l++) {
              board[i][l] = 0
            }
            values = Shuffle(values)
          }
          break
        }
      }
    }
  }
  return board
}

export function getGameBoard (solution, difficulty = DIFFICULTY_EASY) {
  let board = EMPTY_USER_BOARD.map((boardRow) => boardRow.slice())
  for (let i = 0; i < difficulty; i++) {
    let x = Math.floor(Math.random() * 9)
    let y = Math.floor(Math.random() * 9)
    board[x][y] = {value: solution[x][y], type: TYPE_GENERATED}
  }
  return board
}

function Shuffle (array) {
  var currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

export function isValidMove (board, row, column, value) {
  return isValidBox(board, row, column, value) && isValidRow(board, row, column, value) && isValidColumn(board, row, column, value)
}

export function isValidBox (board, row, column, value) {
  let boxRow = Math.floor(row / BOX_SIZE_WIDTH) * BOX_SIZE_WIDTH
  let boxColumn = Math.floor(column / BOX_SIZE_HEIGHT) * BOX_SIZE_HEIGHT
  for (let i = boxRow; i < boxRow + BOX_SIZE_WIDTH; i++) {
    for (let j = boxColumn; j < boxColumn + BOX_SIZE_HEIGHT; j++) {
      if (board[i][j] === value && row !== i && column !== j) {
        return false
      }
    }
  }
  return true
}

export function isGameOver (board) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      if (!board[i][j] || board[i][j] <= 0) {
        return false
      }
    }
  }
  return true
}

export function isValidRow (board, row, column, value) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[row][i] === value && i !== column) {
      return false
    }
  }
  return true
}

export function isValidColumn (board, row, column, value) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[i][column] === value && i !== row) {
      return false
    }
  }
  return true
}

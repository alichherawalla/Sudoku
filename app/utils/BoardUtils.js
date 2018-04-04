export const NUMBER_OF_ROWS = 9
export const NUMBER_OF_COLUMNS = 9
export const BOX_SIZE_HEIGHT = 3
export const BOX_SIZE_WIDTH = 3
export const NUMBER_OF_ELEMENTS_ON_BOARD = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS

export function createSudokoBoard () {
  let board = [
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
          j = initialIndex - backtrackCounter > 0 ? initialIndex - backtrackCounter - 1 : -1
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
          j = initialIndex - backtrackCounter > 0 ? initialIndex - backtrackCounter - 1 : -1
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
  printBoard(board)
  return board
}

function printBoard (board) {
  let str = ''
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      str = str + '\t'
    }
    str = str + '\n'
  }
  console.log(str)
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
  return isValidBox(board, row, column, value) && isValidRow(board, row, value) && isValidColumn(board, column, value)
}

export function isValidBox (board, row, column, value) {
  let boxRow = Math.floor(row / BOX_SIZE_WIDTH) * BOX_SIZE_WIDTH
  let boxColumn = Math.floor(column / BOX_SIZE_HEIGHT) * BOX_SIZE_HEIGHT
  for (let i = boxRow; i < boxRow + BOX_SIZE_WIDTH; i++) {
    for (let j = boxColumn; j < boxColumn + BOX_SIZE_HEIGHT; j++) {
      if (board[i][j] === value) {
        return false
      }
    }
  }
  return true
}

export function isValidRow (board, row, value) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[row][i] === value) {
      return false
    }
  }
  return true
}

export function isValidColumn (board, column, value) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    if (board[i][column] === value) {
      return false
    }
  }
  return true
}

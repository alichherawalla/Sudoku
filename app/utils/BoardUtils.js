export const NUMBER_OF_ROWS = 9
export const NUMBER_OF_COLUMNS = 9
export const BOX_SIZE_HEIGHT = 3
export const BOX_SIZE_WIDTH = 3
export const NUMBER_OF_ELEMENTS_ON_BOARD = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS

export function createSudokoBoard () {
  let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    values = Shuffle(values)
    let backtrackCounter = 0
    for (let j = 0; j < NUMBER_OF_ROWS; j++) {
      let value = values[0]
      let counter = 0
      while (!isValidMove(board, i, j, value)) {
        counter++
        if (counter % NUMBER_OF_ROWS === 0) {
          backtrackCounter++
          backtrackCounter = j === 0 ? backtrackCounter : backtrackCounter % j
          let initialIndex = j
          if (j === 0) {
            values = shiftArrayRight(values)
            value = values[0]
          } else {
            for (let backtrack = 1; backtrack <= backtrackCounter; backtrack++) {
              j = initialIndex - backtrack
              values.unshift(board[i][j])
              board[i][j] = 0
            }
          }
        }
        values = shiftArrayRight(values)
        value = values[0]
      }
      board[i][j] = value
      values = values.filter((v) => v !== value)
    }
  }
  printBoard(board)
  return board
}

function shiftArrayRight (arr1) {
  let arr = arr1.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    let temp = arr[i]
    arr[i] = arr[i - 1]
    arr[i - 1] = temp
  }
  return arr
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

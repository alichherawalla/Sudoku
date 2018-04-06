/*
 *
 * Board reducer
 *
 */

import { fromJS } from 'immutable'
import { UPDATE_BOARD, UPDATE_GAME, NEW_GAME } from './constants'
import { createSudokoBoard, getGameBoard, DIFFICULTY_EASY } from '../../utils/BoardUtils'
let solution = createSudokoBoard()
let board = getGameBoard(solution)
const initialState = fromJS({
  solution,
  board,
  score: 0,
  best: 0,
  difficulty: DIFFICULTY_EASY
})

function boardReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return state.set('game', action.game)
    case UPDATE_BOARD:
      return state.set('board', action.board)
    case NEW_GAME:
      let solution = createSudokoBoard()
      let board = getGameBoard(solution.slice(), action.difficulty)
      return fromJS({
        solution,
        board,
        score: 0,
        best: 0,
        difficulty: action.difficulty
      })
    default:
      return state
  }
}

export default boardReducer

/*
 *
 * Board reducer
 *
 */

import { fromJS } from 'immutable'
import { DONT_SHOW_INTRO_TOAST, RESET_BOARD, UPDATE_CLEAN_BOARD, UPDATE_BOARD, UPDATE_GAME, NEW_GAME } from './constants'
import { getFinishedBoard, createSudokoBoard, getGameBoard, DIFFICULTY_EASY } from '../../utils/BoardUtils'
let solution = createSudokoBoard()
let board = getGameBoard(solution)
const initialState = fromJS({
  solution,
  board,
  initialBoard: board,
  numberOfGames: 1,
  gamesWon: 0,
  difficulty: DIFFICULTY_EASY,
  isGameOver: false,
  showIntroToast: true
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
        initialBoard: board,
        gamesWon: state.get('gamesWon'),
        numberOfGames: state.get('numberOfGames') + 1,
        difficulty: action.difficulty,
        isGameOver: false,
        showIntroToast: false
      })
    case DONT_SHOW_INTRO_TOAST:
      return state.set('showIntroToast', false)
    case UPDATE_CLEAN_BOARD:
      board = getFinishedBoard(state.get('board'))
      return fromJS({
        solution,
        board,
        initialBoard: board,
        gamesWon: state.get('gamesWon') + 1,
        numberOfGames: state.get('numberOfGames'),
        difficulty: state.get('difficulty'),
        isGameOver: true,
        showIntroToast: false
      })
    case RESET_BOARD:
      return state.set('board', state.get('initialBoard'))
    default:
      return state
  }
}

export default boardReducer

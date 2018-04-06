/*
 *
 * Board actions
 *
 */

import { UPDATE_BOARD, UPDATE_GAME, NEW_GAME } from './constants'

export function updateGame (game) {
  return {
    type: UPDATE_GAME,
    game: game
  }
}
export function updateBoard (board) {
  return {
    type: UPDATE_BOARD,
    board
  }
}
export function requestNewGame (difficulty) {
  return {
    type: NEW_GAME,
    difficulty
  }
}

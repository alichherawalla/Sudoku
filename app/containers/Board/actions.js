/*
 *
 * Board actions
 *
 */

import { RESET_BOARD, UPDATE_CLEAN_BOARD, UPDATE_BOARD, UPDATE_GAME, NEW_GAME } from './constants'

export function updateGame (game) {
  return {
    type: UPDATE_GAME,
    game
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
export function updateCleanBoard () {
  return {
    type: UPDATE_CLEAN_BOARD
  }
}
export function resetBoard () {
  return {
    type: RESET_BOARD
  }
}

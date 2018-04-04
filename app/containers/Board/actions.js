/*
 *
 * Board actions
 *
 */

import { UPDATE_GAME, NEW_GAME } from './constants'

export function updateGame (game) {
  return {
    type: UPDATE_GAME,
    game: game
  }
}
export function requestNewGame (game) {
  return {
    type: NEW_GAME
  }
}

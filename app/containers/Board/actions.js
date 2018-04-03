/*
 *
 * Board actions
 *
 */

import {
  UPDATE_GAME
} from './constants'

export function defaultAction (game) {
  return {
    type: UPDATE_GAME,
    game: game
  }
}

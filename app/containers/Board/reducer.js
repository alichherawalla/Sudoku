/*
 *
 * Board reducer
 *
 */

import { fromJS } from 'immutable'
import { UPDATE_GAME } from './constants'
import { createSudokoBoard } from '../../utils/BoardUtils'

const initialState = fromJS({
  board: createSudokoBoard(),
  score: 0,
  best: 0
})

function boardReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_GAME:
      return state.set('game', action.game)
    default:
      return state
  }
}

export default boardReducer

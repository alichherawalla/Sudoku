import { createSelector } from 'reselect'

/**
 * Direct selector to the board state domain
 */
const selectBoardDomain = (state) => state.get('board')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Board
 */

const makeSelectGame = () => createSelector(
  selectBoardDomain,
  (substate) => substate.toJS()
)

export default makeSelectGame
export {
  selectBoardDomain
}

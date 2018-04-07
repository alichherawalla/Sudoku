import transit from 'transit-immutable-js'
import { fromJS } from 'immutable'
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state') //eslint-disable-line
    if (serializedState === null) {
      return undefined
    }
    return fromJS(transit.fromJSON(serializedState))
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = transit.toJSON(state)
    localStorage.setItem('state', serializedState) //eslint-disable-line
  } catch (err) {
  }
}

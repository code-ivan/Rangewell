import { combineReducers } from 'redux'

import { reducer as blog } from './modules/Blog'
import { reducer as landing } from './modules/Landing'

const reducer = combineReducers({
  blog,
  landing
})

export default reducer

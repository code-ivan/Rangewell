import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'

const FETCH_INTRODUCER_REQUEST = 'landing/FETCH_INTRODUCER_REQUEST'
const FETCH_INTRODUCER_SUCCESS = 'landing/FETCH_INTRODUCER_SUCCESS'
const FETCH_INTRODUCER_FAILURE = 'landing/FETCH_INTRODUCER_FAILURE'


const introducers = (state = [], action) => {
  switch (action.type) {
  case FETCH_INTRODUCER_SUCCESS:
    return action.response
  }
  return state
}
const reducer = combineReducers({
  introducers
})

const fetchAction = (url, types) => dispatch => {
  const [REQUEST, SUCCESS, FAILURE] = types

  if (__SERVER__) {
    url = `http://localhost:3000${ url }`
  }

  dispatch({
    type: REQUEST
  })

  return fetch(url)
    .then(
      response => response.json()
    )
    .then(
      response => dispatch({
        type: SUCCESS,
        response
      }),
      error => dispatch({
        type: FAILURE,
        message: error.message
      })
    )
}

export const fetchIntroducers = () => fetchAction(
  '/api/introducers',
  [FETCH_INTRODUCER_REQUEST, FETCH_INTRODUCER_SUCCESS, FETCH_INTRODUCER_FAILURE]
)

export const getIntroducers = state => state.landing.introducers

export default reducer

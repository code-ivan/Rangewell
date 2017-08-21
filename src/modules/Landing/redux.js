import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'

const FETCH_INTRODUCERS_REQUEST = 'landing/FETCH_INTRODUCERS_REQUEST'
const FETCH_INTRODUCERS_SUCCESS = 'landing/FETCH_INTRODUCERS_SUCCESS'
const FETCH_INTRODUCERS_FAILURE = 'landing/FETCH_INTRODUCERS_FAILURE'

const FETCH_INTRODUCER_REQUEST = 'landing/FETCH_INTRODUCER_REQUEST'
const FETCH_INTRODUCER_SUCCESS = 'landing/FETCH_INTRODUCER_SUCCESS'
const FETCH_INTRODUCER_FAILURE = 'landing/FETCH_INTRODUCER_FAILURE'


//reducer
const introducers = (state = [], action) => {
  switch (action.type) {
    case FETCH_INTRODUCERS_SUCCESS:
      return action.response
    }
  return state
}
const introducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INTRODUCER_REQUEST:
      return 'loading'
    case FETCH_INTRODUCER_SUCCESS:
      return action.response
    case FETCH_INTRODUCER_FAILURE:
      return null
  }
  return state
}

//reducers
const reducer = combineReducers({
  introducers,
  introducer
})

//dispatcher
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


//actions
export const fetchIntroducers = () => fetchAction(
  '/api/introducers',
  [FETCH_INTRODUCERS_REQUEST, FETCH_INTRODUCERS_SUCCESS, FETCH_INTRODUCERS_FAILURE]
)
export const fetchIntroducer = slug => fetchAction(
  `/api/introducers/${ slug }`,
  [FETCH_INTRODUCER_REQUEST, FETCH_INTRODUCER_SUCCESS, FETCH_INTRODUCER_FAILURE]
)

export const getIntroducers = state => state.landing.introducers

export const getIntroducer = (state, slug) => {
  const { introducer } = state.landing // eslint-disable-line no-shadow

  return introducer && introducer.alias === slug ? introducer : null
}

export const getLoading = state => state.landing.introducer === 'loading'


export default reducer

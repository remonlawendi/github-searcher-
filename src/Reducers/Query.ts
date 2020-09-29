import {
  SELECT_QUERY,
  INVALIDATE_QUERY,
  REQUEST_RESULTS,
  RECEIVE_RESULTS
} from '../Actions'
import { GHEntity } from '../Types'

interface ResultsAction {
    type: string,
    results: [],
    receivedAt: any
    query: string,
    entity: string,
}


function results(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action: ResultsAction
) {
  switch (action.type) {
    case INVALIDATE_QUERY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_RESULTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.results,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export const selectedQuery = (state = '', action: ResultsAction) => {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query
    default:
      return state
  }
}

export const selectedEntity = (state = GHEntity.USERS, action: ResultsAction) => {
  switch (action.type) {
    case SELECT_QUERY:
      return action.entity
    default:
      return state
  }
}

export const resultsByQuery = (state: any = {}, action: ResultsAction) => {
  switch (action.type) {
    case INVALIDATE_QUERY:
    case RECEIVE_RESULTS:
    case REQUEST_RESULTS:
      return Object.assign({}, state, {
        [action.entity]: {
          ...state[action.entity],
          [action.query]: results(state[action.query], action)
        }
      })
    default:
      return state
  }
}


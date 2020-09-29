import fetch from 'cross-fetch'
import { Dispatch } from "redux"
import { GHEntity } from './Types'

export const REQUEST_RESULTS = 'REQUEST_RESULTS'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'
export const SELECT_QUERY = 'SELECT_QUERY'
export const SELECT_ENTITY = 'SELECT_ENTITY'
export const INVALIDATE_QUERY = 'INVALIDATE_QUERY'

export function selectQuery(query: string, entity: GHEntity) {
  return {
    type: SELECT_QUERY,
    query,
    entity,
  }
}

export function invalidateQuery(query: string, entity: GHEntity) {
  return {
    type: INVALIDATE_QUERY,
    query,
    entity
  }
}

function requestResults(query: string, entity: GHEntity) {
  return {
    type: REQUEST_RESULTS,
    query,
    entity
  }
}

function receiveResults(query: string, entity: GHEntity, json: any) {
  return {
    type: RECEIVE_RESULTS,
    query,
    entity,
    results: json?.items?.map((child: any) => child),
    receivedAt: Date.now()
  }
}

function fetchResults(query: string, entity: GHEntity) {
  return (dispatch: Dispatch) => {
    dispatch(selectQuery(query, entity))
    return fetch(`https://api.github.com/search/${entity}?q=${query}`)
      .then(response => response.json())
      .then(json => dispatch(receiveResults(query, entity, json)))
  }
}

function shouldFetchResults(state: any, query: string, entity: GHEntity) {
  const results = state.resultsByQuery[entity] && state.resultsByQuery[entity][query]
  if (!results) {
    return true
  } else if (results.isFetching) {
    return false
  } else {
    return results.didInvalidate
  }
}

export function fetchResultsIfNeeded(query: string, entity: GHEntity) {
  return (dispatch: Dispatch, getState: Function) => {
    if (shouldFetchResults(getState(), query, entity)) {
      return dispatch(fetchResults(query, entity) as any)
    }
  }
}
import { combineReducers } from 'redux'
import { resultsByQuery, selectedQuery, selectedEntity} from './Query'

const rootReducer = combineReducers({
  resultsByQuery,
  selectedQuery,
  selectedEntity,
})

export default rootReducer
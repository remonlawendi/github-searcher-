import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './Reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState: any) {
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(persistedReducer, preloadedState, composeEnhancers(
    applyMiddleware(thunkMiddleware))
    )
  return {
   store,
   persistor: persistStore(store as any) // Bug link https://github.com/rt2zz/redux-persist/issues/1140
  }
}
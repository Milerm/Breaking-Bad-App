import { combineReducers } from 'redux'
import { libraryReducer } from './libraryReducer'
import { quoteReducer } from './quoteReducer'

export const rootReducer = combineReducers({
  library: libraryReducer,
  quote: quoteReducer
})

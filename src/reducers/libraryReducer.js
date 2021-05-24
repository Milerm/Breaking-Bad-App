import { types } from '../types/types'

const initialState = {
  libraries: [
    {
      id: new Date().getTime(),
      name: 'Biblioteca 1'
    },
    {
      id: new Date().getTime() - 1234,
      name: 'Biblioteca 2'
    }
  ],
  quotes: []
}

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.libraryAddLibrary:
      return {
        ...state,
        libraries: [...state.libraries, action.payload]
      }

    case types.libraryAddQuote:
      return {
        ...state,
        quotes: [...state.quotes, action.payload]
      }

    default:
      return state
  }
}

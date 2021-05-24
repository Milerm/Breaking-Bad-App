import { types } from '../types/types'

export const libraryAddLibrary = (library) => ({
  type: types.libraryAddLibrary,
  payload: library
})

export const libraryAddQuote = (quote) => ({
  type: types.libraryAddQuote,
  payload: quote
})

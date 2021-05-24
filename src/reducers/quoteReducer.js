import { types } from '../types/types'

const initialState = {
  comments: [],
  qualifications: []
}

export const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.quoteAddComment:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }

    case types.quoteAddQualification:
      return {
        ...state,
        qualifications: [...state.qualifications, action.payload]
      }

    default:
      return state
  }
}

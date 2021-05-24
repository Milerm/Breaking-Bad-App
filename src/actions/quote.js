import { types } from '../types/types'

export const quoteAddComment = (comment) => ({
  type: types.quoteAddComment,
  payload: comment
})

export const quoteAddQualification = (qualification) => ({
  type: types.quoteAddQualification,
  payload: qualification
})

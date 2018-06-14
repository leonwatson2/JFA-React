import { createPromiseActionsFor } from "./actions/utils";

export const officerActionsTypes = {
  ...createPromiseActionsFor('LOAD_OFFICERS')
}

export const loadOfficers = ()=> ({
  type: officerActionsTypes.LOAD_OFFICERS
})
const defaultState = {
  officers:[]
}

export const officerReducer = (state = defaultState, action)=>{
  switch (action.type) {
    case officerActionsTypes.LOAD_OFFICERS_PENDING:
      return {
          ...state
        }
    case officerActionsTypes.LOAD_OFFICERS_FULFILLED:
      return {
        ...state,
        officers: action.payload
        }
    case officerActionsTypes.LOAD_OFFICERS_REJECTED:
      return {
          ...state
        }
    default:
      return state
  }
}

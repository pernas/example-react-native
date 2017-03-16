
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions'

let assign = (state, next) => Object.assign({}, state, next)

const INITIAL_STATE = {
  pending: false,
  success: false,
  error: null
}

const loginReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case LOGIN_START: {
      return assign(INITIAL_STATE, { pending: true })
    }
    case LOGIN_SUCCESS: {
      return assign(INITIAL_STATE, { success: true })
    }
    case LOGIN_ERROR: {
      let { payload } = action
      return assign(INITIAL_STATE, { error: payload })
    }
    default:
      return state
  }
}

export default loginReducer

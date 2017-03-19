import { combineReducers } from 'redux'
import login from './login'
import * as A from '../actions'
// import { walletReducer, blockchainDataReducer } from 'dream-wallet/lib/reducers'
const dreamWalletReducers = require('dream-wallet/src/reducers')
import * as R from 'ramda'

// import { SAVE_SESSION, PANEL_SWITCH } from '../actions'
// import { merge } from 'ramda'
// import { reducer as formReducer } from 'redux-form'

const rehydrated = (state = false, action) => {
  let { type } = action
  switch (type) {
    case A.REHYDRATION_COMPLETE: {
      return true
    }
    default:
      return state
  }
}


const INIT = 0
const counter = (state = INIT, action) => {
  let { type } = action
  switch (type) {
    case 'COUNT_UP': {
      return state + 1
    }
    case 'COUNT_DOWN': {
      return state - 1
    }
    default:
      return state
  }
}

const CREDENTIALS_INITIAL_STATE = {
  guid: null,
  sharedKey: null,
  password: null,
  xpub: null
}

const credentials = (state = CREDENTIALS_INITIAL_STATE, action) => {
  let { type, payload } = action
  switch (type) {
    case A.PERSIST_CREDENTIALS: {
      return payload
    }
    default:
      return state
  }
}

// const session = (state = {}, action) => {
//   let { type } = action
//   switch (type) {
//     case SAVE_SESSION: {
//       return merge(state, action.payload)
//     }
//     default:
//       return state
//   }
// }
//
// const panel = (state = 'login', action) => {
//   let { type, payload } = action
//   switch (type) {
//     case PANEL_SWITCH: {
//       return payload
//     }
//     default:
//       return state
//   }
// }

// const reducers = ({wpath, dpath}) => combineReducers({
//   panel: panel,
//   form: formReducer,
//   session: session,
//   loginState: login,
//   [dpath]: blockchainDataReducer,
//   [wpath]: walletReducer
// })

const reducers = ({wpath, dpath}) => combineReducers({
  rehydrated: rehydrated,
  counter: counter,
  loginState: login,
  credentials: credentials,
  [dpath]: dreamWalletReducers.blockchainDataReducer,
  [wpath]: dreamWalletReducers.walletReducer
})

export default reducers

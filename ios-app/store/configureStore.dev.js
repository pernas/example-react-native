global.self = global
// import createLogger from 'redux-logger'
import { identity } from 'ramda'
import { createStore, applyMiddleware, compose } from 'redux'
import red from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas'
// import { helloSaga } from '../sagas'
// import persistState from 'redux-localstorage'
// import Immutable from 'immutable-ext'
// import { Socket } from 'dream-wallet/lib/network'
// import { walletSyncMiddleware, walletSocketMiddleware } from 'dream-wallet/lib/middleware'
const network = require('dream-wallet/lib/network')
import * as C from '../config'


const configureStore = () => {
  // const socket = new Socket()
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    // { serialize: { immutable: Immutable } }) || compose
  const api = network.createWalletApi({ rootUrl: C.ROOT_URL
                              , apiUrl: C.API_BLOCKCHAIN_INFO
                              , apiCode: C.API_CODE})
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    red({wpath: C.WALLET_IMMUTABLE_PATH, dpath: C.BLOCKCHAIN_DATA_PATH}),
    compose(
      // persistState('session'),
      applyMiddleware(
        // walletSyncMiddleware({ api: api, wpath: C.WALLET_IMMUTABLE_PATH}),
        // walletSocketMiddleware({ socket }),
        sagaMiddleware
        // createLogger()
      )
    )
  )

  sagaMiddleware.run(rootSaga({ api: api
                              , wpath: C.WALLET_IMMUTABLE_PATH
                              , dpath: C.BLOCKCHAIN_DATA_PATH}))
  // sagaMiddleware.run(helloSaga)
  return {
    ...store
    // runSaga: sagaMiddleware.run
  }
}

export default configureStore

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

import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'
// persistStore(store, {storage: AsyncStorage})

import createEncryptor from 'redux-persist-transform-encrypt';

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
      ),
      autoRehydrate()
    )
  )

  const encryptor = createEncryptor({
    secretKey: 'my-super-secret-key'
  });

  persistStore(store,
              { storage: AsyncStorage,
                whitelist: ['credentials'],
                transforms: [encryptor]
              }
              // , () => { console.warn('rehydration complete') }
            // ).purge() // clean the stored state
            )

  sagaMiddleware.run(rootSaga({ api: api
                              , wpath: C.WALLET_IMMUTABLE_PATH
                              , dpath: C.BLOCKCHAIN_DATA_PATH}))

  return {
    ...store
    // runSaga: sagaMiddleware.run
  }
}

export default configureStore

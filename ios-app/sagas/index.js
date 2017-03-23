
import { takeEvery, call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
import * as actions from '../actions'
import * as walletActions from 'dream-wallet/lib/actions'
import { getWalletContext, getXpubs } from 'dream-wallet/lib/selectors'
import { merchantXpub } from '../selectors'
const crypto = require('crypto');
import { encryptSecPass, decryptSecPass } from 'dream-wallet/lib/WalletCrypto'

export const rootSaga = ({ dpath, wpath, api } = {}) => {

  const loginSaga = function* (action) {
    let { pin } = action.payload
    const selectCredentials = state => state.credentials
    const credentials = yield select(selectCredentials)
    // TODO :: mising a lot of error control or missing pin
    try {
      const response = yield call(api.getPinValue, credentials.pinEntry, pin)
      const remoteKey = response.success
      const guid = decryptSecPass(remoteKey, 5000, credentials.localKey, credentials.guid)
      const sharedKey = decryptSecPass(remoteKey, 5000, credentials.localKey, credentials.sharedKey)
      const password = decryptSecPass(remoteKey, 5000, credentials.localKey, credentials.password)
      // let wallet = yield call(api.downloadWallet, credentials.guid, credentials.sharedKey, undefined, credentials.password)
      let wallet = yield call(api.downloadWallet, guid, sharedKey, undefined, password)
      yield put(walletActions.loadWallet(wallet))
      yield put(walletActions.requestWalletData(getWalletContext(wallet).toJS()))
      yield put(actions.loginSuccess())
      // this was the old saga that was persisting data just after login in the first time
      // const xpubs = getXpubs(wallet)
      // credentials.xpub = xpubs.toJS()[0] // this maybe should be default or to be set by user
      // yield put(actions.persistCredentials(credentials))
    } catch (error) {
      yield put(actions.loginError(error))
    }
  }

  const merchantWalletSaga = function* (action) {
    const xpub = yield select(merchantXpub)
    if( xpub !== '' && xpub !== null && xpub !== undefined) {
      yield put(walletActions.requestWalletData(xpub))
      // this should be handled by an infinite scroll
      // yield put(walletActions.requestTxs(xpub))
    }
  }
  const walletSignUpSaga = function* (action) {
    // pin is not comming in this action
    const {guid, sharedKey, pin, email, password} = action.payload
    const selectWallet = state => state[wpath]
    const wallet = yield select(selectWallet)
    const xpubs = getXpubs(wallet)
    const pinEntry = crypto.randomBytes(32).toString('hex')
    const localKey = crypto.randomBytes(32).toString('hex')
    const remoteKey = crypto.randomBytes(32).toString('hex')
    // TODO :: control pin-failure here
    const response = yield call(api.createPinEntry, pinEntry, remoteKey, pin)
    // response.code === 0 -> success (1,2 other kind of failures)

    const credentials = {
      xpub: xpubs.toJS()[0], // this maybe should be default or to be set by user
      guid: encryptSecPass(remoteKey, 5000, localKey, guid), // enc
      sharedKey: encryptSecPass(remoteKey, 5000, localKey, sharedKey), // enc
      password: encryptSecPass(remoteKey, 5000, localKey, password), //enc
      pinEntry, // plain
      localKey // plain
    }
    yield put(actions.persistCredentials(credentials))
    yield put(actions.loginSuccess())
  }

  return function* () {
    yield [
      // here you can put an array of sagas in forks
      fork(WalletSagas.rootSaga({api, dpath, wpath}))
    ];
    yield takeEvery(actions.LOGIN_START, loginSaga)
    yield takeEvery(actions.REHYDRATION_COMPLETE, merchantWalletSaga)
    yield takeEvery(walletActions.WALLET_NEW_SUCCESS, walletSignUpSaga)
  }
}

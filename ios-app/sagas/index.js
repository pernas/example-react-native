
import {takeEvery, call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
import * as actions from '../actions'
import * as walletActions from 'dream-wallet/lib/actions'
import { getWalletContext, getXpubs } from 'dream-wallet/lib/selectors'
import { merchantXpub } from '../selectors'

export const rootSaga = ({ dpath, wpath, api } = {}) => {

  const loginSaga = function* (action) {
    let credentials = action.payload
    try {
      let wallet = yield call(api.downloadWallet, credentials.guid, credentials.sharedKey, undefined, credentials.password)
      yield put(walletActions.loadWallet(wallet))
      yield put(walletActions.requestWalletData(getWalletContext(wallet).toJS()))
      yield put(actions.loginSuccess())
      const xpubs = getXpubs(wallet)
      credentials.xpub = xpubs.toJS()[0] // this maybe should be default or to be set by user
      yield put(actions.persistCredentials(credentials))
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
    const selectWallet = state => state[wpath]
    const wallet = yield select(selectWallet)
    const xpubs = getXpubs(wallet)
    const credentials = {
      xpub: xpubs.toJS()[0], // this maybe should be default or to be set by use
      guid: wallet.get('walletImmutable').get('guid'),
      sharedKey: wallet.get('walletImmutable').get('sharedKey'),
      password: wallet.get('password')
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


import {takeEvery, call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
import * as actions from '../actions'
import * as walletActions from 'dream-wallet/lib/actions'
import { getWalletContext, getXpubs } from 'dream-wallet/lib/selectors'

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

  return function* () {
    yield [
      // here you can put an array of sagas in forks
      fork(WalletSagas.rootSaga({api, dpath, wpath}))
    ];
    yield takeEvery(actions.LOGIN_START, loginSaga)
  }
}

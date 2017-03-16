
import {takeEvery, call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
import * as actions from '../actions'
import * as walletActions from 'dream-wallet/lib/actions'
import { getWalletContext } from 'dream-wallet/lib/selectors'

export const rootSaga = ({ dpath, wpath, api } = {}) => {

  const loginSaga = function* (action) {
    console.warn('LOGIN SAGA STARTED')
    const credentials = action.payload
    try {
      let wallet = yield call(api.downloadWallet, credentials.guid, credentials.sharedKey, undefined, credentials.password)
      yield put(walletActions.loadWallet(wallet))
      yield put(walletActions.requestWalletData(getWalletContext(wallet).toJS()))
      yield put(actions.loginSuccess())
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

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as currencies from './currencies'
import Transactions from './Transactions'
import Balance from './Balance'
import { createSelector } from 'reselect'
import { identity } from 'ramda'
import { BLOCKCHAIN_DATA_PATH } from '../config'
import { connect } from 'react-redux'
import { getTransactions, getAddrInfo } from 'dream-wallet/lib/selectors'
import { Map } from 'immutable-ext'
import sb from 'satoshi-bitcoin';

class TransactionContainer extends Component {
  constructor (props) {
    super(props)
    let currency = 'btc'
    this.state = { currency }
  }

  toggleCurrency () {
    let currency = this.state.currency === 'btc' ? 'fiat' : 'btc'
    this.setState({ currency })
  }

  render () {
    let { currency } = this.state
    let currencyObj = currencies[currency]
    const satoshis = this.props.info.final_balance ? this.props.info.final_balance : 0
    const balance = sb.toBitcoin(satoshis)
    return (
      <View>
        <Balance key={0} amount={balance} currency={currencyObj} onToggle={this.toggleCurrency.bind(this)} />
        <Transactions key={1} txs={this.props.txs} currency={currencyObj} />
      </View>
    )
  }
}

const processTx = tx => {
  // there is also 'transferred' type
  const type = tx.get('result') > 0 ? 'received' : 'sent'
  return Map({
    hash: tx.get('hash'),
    amount: sb.toBitcoin(tx.get('result')),
    type: type,
    time: tx.get('time')
  })
}

const transactionsSelector = (xpub) => createSelector(
  [ getTransactions(BLOCKCHAIN_DATA_PATH)(xpub) ],
  (data) => data.map(processTx)
)

const mapStateToProps = (state) => {
  const xpub = state.credentials.xpub
  const txs = transactionsSelector(xpub)(state)
  const info = state[BLOCKCHAIN_DATA_PATH].get('walletInfo')
  return ({
    xpub: xpub,
    txs: txs.toJS(),
    info: info.toJS(),
    rehydrated: state.rehydrated
  })
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionContainer)

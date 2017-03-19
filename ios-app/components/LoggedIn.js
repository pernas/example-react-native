import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'

// import stylesApp from './styles/styles'
// import colors from './styles/colors'
import * as actions from '../actions'
import * as C from '../config'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

class LoggedIn extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const info = this.props.data.get('walletInfo').toJS();
    return (
      <View>
        <Text> guid: { this.props.payload.get('walletImmutable').get('guid') } </Text>
        <Text> transactions: { info.n_tx } </Text>
        <Text> Balance: { info.final_balance } </Text>
        <Text> Login pending: { this.props.loginState.pending.toString() }</Text>
        <Text> Login success: { this.props.loginState.success.toString() }</Text>
        <Text> Login error: { this.props.loginState.error }</Text>
        <Text> Credentials: { JSON.stringify(this.props.credentials, null, 2) }</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  payload: state[C.WALLET_IMMUTABLE_PATH],
  data: state[C.BLOCKCHAIN_DATA_PATH],
  loginState: state.loginState,
  credentials: state.credentials
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedIn)

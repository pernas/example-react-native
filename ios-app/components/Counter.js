import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'

import * as actions from '../actions'
import * as C from '../config'
import { connect } from 'react-redux'

let countUp = () => ({ type: 'COUNT_UP' })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

class Counter extends Component {
  constructor (props) {
    super(props)
  }

  countUp () {
    const credentials = {
      guid: 'f9df366a-3fc3-4826-827f-fb3c1e8ce616',
      sharedKey: '00efae13-985b-4858-81ad-71bd8b5ac863',
      password: '100 cent'
    }
    this.props.dispatch(actions.loginStart(credentials))
    this.props.dispatch(countUp())
  }

  render () {
    const info = this.props.data.get('walletInfo').toJS();
    return (
      <View style={styles.container}>
        <Text> { this.props.counter } </Text>
        <Text> guid: { this.props.payload.get('walletImmutable').get('guid') } </Text>
        <Text> transactions: { info.n_tx } </Text>
        <Text> Balance: { info.final_balance } </Text>
        <Button onPress={this.countUp.bind(this)} title='Up' />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
  payload: state[C.WALLET_IMMUTABLE_PATH],
  data: state[C.BLOCKCHAIN_DATA_PATH]
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

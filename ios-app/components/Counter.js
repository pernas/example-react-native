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
let countDown = () => ({ type: 'COUNT_DOWN' })

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
    this.props.dispatch(countUp())
  }
  countDown () {
    this.props.dispatch(countDown())
  }

  render () {
    return (
      <View>
        <Text> { this.props.counter } </Text>
        <Button onPress={this.countUp.bind(this)} title='Up' />
        <Button onPress={this.countDown.bind(this)} title='Down' />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

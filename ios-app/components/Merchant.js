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
import QRCode from 'react-native-qrcode';


class Merchant extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const msg = this.props.credentials.xpub ? this.props.credentials.xpub : ""
    return (
      <View>
        <Text> I AM THE MERCHANT COMPONENT </Text>
        <Text> {this.props.credentials.xpub} </Text>
        {/* <QRCode value='hola' /> */}
        <QRCode
          value={msg}
          size={200}
          bgColor='blue'
          fgColor='white'/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  credentials: state.credentials,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merchant)

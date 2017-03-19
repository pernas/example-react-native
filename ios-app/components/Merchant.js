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
import colors from './styles/colors'
import appStyles from './styles/styles'

let styles = StyleSheet.create({
  qr: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    // flexDirection: 'row',
    justifyContent: 'center'
  }
})

class Merchant extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const msg = this.props.credentials.xpub ? this.props.credentials.xpub : ""
    return (
      <View style={styles.qr}>
        <Text> MERCHANT COMPONENT </Text>
        {/* <Text> {this.props.credentials.xpub} </Text> */}
        {/* <QRCode value='hola' /> */}
        <QRCode
          value={msg}
          size={200}
          bgColor='black'
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

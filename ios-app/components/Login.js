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
import * as wActions from 'dream-wallet/lib/actions'
import * as C from '../config'
import { connect } from 'react-redux'
import LoggedIn from './LoggedIn'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

class Login extends Component {
  constructor (props) {
    super(props)
  }

  login () {
    const credentials = {
      guid: 'f9df366a-3fc3-4826-827f-fb3c1e8ce616',
      sharedKey: '00efae13-985b-4858-81ad-71bd8b5ac863',
      password: '100 cent'
    }
    this.props.dispatch(actions.loginStart(credentials))
  }

  create () {
    const credentials = {
      email: 'jaume@blockchain.com',
      password: 'mypassword'
    }
    this.props.dispatch(wActions.newWallet(credentials))
  }


  render () {
    if(!this.props.loginState.success) {
      return (
        <View>
          <Button onPress={this.login.bind(this)} title='Login' />
          <Button onPress={this.create.bind(this)} title='Create' />
        </View>
      )
    }
    else {
      return (
        <View>
          <LoggedIn />
        </View>
      )
    }
  }
}

const mapStateToProps = state => ({
  loginState: state.loginState,
  credentials: state.credentials
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native'

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
    this.state = {
      email: '',
      password: '',
      pinSet: '',
      // guid: 'f9df366a-3fc3-4826-827f-fb3c1e8ce616',
      // sharedKey: '00efae13-985b-4858-81ad-71bd8b5ac863',
      // logPass: '100 cent',
      pin: ''
    }
  }

  login () {
    const credentials = {
      // guid: this.state.guid,
      // sharedKey: this.state.sharedKey,
      // password: this.state.logPass,
      pin: this.state.pin
    }
    this.props.dispatch(actions.loginStart(credentials))
  }

  create () {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      pin: this.state.pinSet
    }
    this.props.dispatch(wActions.newWallet(credentials))
  }

  renderLogin () {
    return (
    <View>
      <View>
        <Text>Login success: {this.props.loginState.success.toString()} </Text>
        <Text>Login pending: {this.props.loginState.pending.toString()}</Text>
        <Text>Login error:  {this.props.loginState.error}</Text>
      </View>
      <View>
        {/* <TextInput
          style={{height: 40}}
          autoCorrect={false}
          value={this.state.guid}
          keyboardType='default'
          placeholder="guid"
          autoCapitalize='none'
          onChangeText={(guid) => this.setState({guid})}
        />
        <TextInput
          style={{height: 40}}
          value={this.state.sharedKey}
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={false}
          placeholder="sharedKey"
          autoCapitalize='none'
          onChangeText={(sharedKey) => this.setState({sharedKey})}
        />
        <TextInput
          style={{height: 40}}
          value={this.state.logPass}
          autoCorrect={false}
          keyboardType='default'
          secureTextEntry={true}
          placeholder="password"
          autoCapitalize='none'
          onChangeText={(logPass) => this.setState({logPass})}
        /> */}
        <TextInput
          style={{height: 40}}
          autoCorrect={false}
          keyboardType='numeric'
          secureTextEntry={true}
          placeholder="pin"
          autoCapitalize='none'
          maxLength={4}
          onChangeText={(pin) => this.setState({pin})}
        />

        <Button onPress={this.login.bind(this)} title='Login' />
      </View>
    </View>
  )
  }

  renderSignup () {
    return (
    <View>
      <TextInput
        style={{height: 40}}
        autoCorrect={false}
        keyboardType='email-address'
        placeholder="email"
        autoCapitalize='none'
        onChangeText={(email) => this.setState({email})}
      />
      <TextInput
        style={{height: 40}}
        autoCorrect={false}
        keyboardType='default'
        secureTextEntry={true}
        placeholder="password"
        autoCapitalize='none'
        onChangeText={(password) => this.setState({password})}
      />
      <TextInput
        style={{height: 40}}
        autoCorrect={false}
        keyboardType='numeric'
        secureTextEntry={true}
        placeholder="pin"
        autoCapitalize='none'
        maxLength={4}
        onChangeText={(pinSet) => this.setState({pinSet})}
      />
      <Button onPress={this.create.bind(this)} title='Sign up' />
    </View>
    )
  }


  render () {
    if(!this.props.loginState.success) {
      if(this.props.credentials.xpub) {
        return this.renderLogin()
      } else {
        return this.renderSignup()
      }
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

import '../global';
import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore.dev'
import Counter from './components/Counter'
// import { createStore, applyMiddleware, compose } from 'redux'
// import reducers from '../reducers'
// import walletExample from '../reducers/index';
// const r = require('../reducers')

class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        {/* <Text> hola </Text> */}
        <Counter/>
      </Provider>
    )
  }
}

export default App

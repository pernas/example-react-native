import '../global';
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore.dev'
import Main from './components/Main'


class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <Main/>
      </Provider>
    )
  }
}


export default App

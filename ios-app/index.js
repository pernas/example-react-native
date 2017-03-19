import '../global';
import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore.dev'
import Counter from './components/Counter'
import Login from './components/Login'
import Merchant from './components/Merchant'
import TransactionContainer from './components/TransactionContainer'
import Swiper from 'react-native-swiper';
import Header from './components/Header'


let styles = StyleSheet.create({
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

const header =
  <View>
    <StatusBar barStyle='light-content' />
    <Header> something here </Header>
  </View>

const pairWallet =
  <View style={styles.wrapper}>
    {header}
    <Text> You must pair a wallet </Text>
  </View>

const swiper =
  <View>
    {header}
    <Swiper style={styles.wrapper} showsButtons={false} loop={false} index={1}>
      <View style={{ flex: 1 }}>
        <Login/>
      </View>
      <View style={{ flex: 1 }}>
        <Merchant/>
      </View>
      <View style={{ flex: 1 }}>
        <TransactionContainer />
      </View>
    </Swiper>
  </View>

const storeWrapper = component =>
  <Provider store={configureStore()}>
    {component}
  </Provider>

class App extends Component {
  render () {
    if (false) {
      return pairWallet
    } else {
      return storeWrapper(swiper)
    }
  }
}

export default App

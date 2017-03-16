import '../global';
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore.dev'
import Counter from './components/Counter'
import Login from './components/Login'
import Merchant from './components/Merchant'
import Swiper from 'react-native-swiper';

let styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <Swiper style={styles.wrapper} showsButtons={false}>
          <View style={styles.slide1}>
            <Login/>
          </View>
          <View style={styles.slide2}>
            <Merchant/>
          </View>
          <View style={styles.slide3}>
            <Counter/>
          </View>
        </Swiper>


      </Provider>
    )
  }
}

export default App

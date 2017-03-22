import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Login from './Login'
import Merchant from './Merchant'
import TransactionContainer from './TransactionContainer'
import Swiper from 'react-native-swiper'
import Header from './Header'
import Request from './Request'

console.disableYellowBox = true

let styles = StyleSheet.create({
  wrapper: {
  },
  swipeView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 72
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
    <Login />
  </View>

const swiper =
  <View style={{flex: 1}}>
    {header}
    <Swiper showsButtons={false} showsPagination={false} loop={false} index={3}>
      <View style={styles.swipeView}>
        <Login />
      </View>
      <View style={styles.swipeView}>
        <Merchant />
      </View>
      <View style={styles.swipeView}>
        <TransactionContainer />
      </View>
      <View style={styles.swipeView}>
        <Request />
      </View>
    </Swiper>
  </View>

class Main extends Component {
  render () {
    if (!this.props.credentials.xpub) {
      return pairWallet
    } else {
      return swiper
    }
  }
}

const mapStateToProps = state => ({
  credentials: state.credentials
})

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Main)

// export default App

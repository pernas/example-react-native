import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Counter from './Counter'
import Login from './Login'
import Merchant from './Merchant'
import TransactionContainer from './TransactionContainer'
import Swiper from 'react-native-swiper';
import Header from './Header'


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
    <Login/>
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
  credentials: state.credentials,
})


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Main)

// export default App

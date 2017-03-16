// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
// global.self = global
// import { ADDRESS_ADD, addAddress } from 'dream-wallet/src/actions'
// // import { rootSaga } from 'dream-wallet/src/sagas'
// const rootSaga = require('dream-wallet/src/sagas').rootSaga
// // const c = require('dream-wallet/lib/network')
//
// // import { createWalletApi } from 'dream-wallet/src/network'
// import * as Lens from 'dream-wallet/src/lens'
// import foo, { HELLO } from './Test'
// // const crypto = require('dream-wallet/src/WalletCrypto/utils')
// const crypto = require('dream-wallet/src/WalletCrypto')
// // const crypto = require('crypto');
//
// const m = crypto.encryptSecPass('sk', 10, 'pw', 'msg')
// // const crypto = require('dream-wallet/src/sagas')
// const a = require('dream-wallet/lib/network')
// const r1 = require('dream-wallet/src/reducers')
//
// // const DreamWallet = require('dream-wallet')
// // const a = require('dream-wallet/src/sagas')
// // const crypto = a
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// import ReactNativeExamples from './rn';
//
// class ReactNativify extends Component {
// 
//   render() {
//     var result = 'hola'
//     const x = addAddress('hola', 'adeu')
//     // const api = a.createWalletApi()
//     // const p = api.getWallet('f9df366a-3fc3-4826-827f-fb3c1e8ce616','00efae13-985b-4858-81ad-71bd8b5ac863','100 cent')
//     // p.then((r) => {result = r})
//     return (
//       <View style={styles.container}>
//         {/* <Text>{ r1.blockchainDataReducer.toString() }</Text> */}
//         {/* <Text>{ JSON.stringify(crypto, null, 2) }</Text> */}
//         {/* <Text>{ rootSaga.toString() }</Text> */}
//         {/* <Text> { result } </Text> */}
//         <Text> { m } </Text>
//         <Text> { ADDRESS_ADD } </Text>
//         <Text> { foo.baz } </Text>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <ReactNativeExamples />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('ReactNativify', () => ReactNativify);



import { AppRegistry } from 'react-native'
// import App from './ios-app'
const App = require('./ios-app').default
AppRegistry.registerComponent('ReactNativify', () => App)

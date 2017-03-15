import React, { Component } from 'react';
import { Text, View } from 'react-native';

import './global';

import cryptoExample from './crypto_example';
import bitcoinExample from './bitcoin_example';
import httpExample from './http_example';
import walletExample from './wallet_example';

export default class ReactNativeExamples extends Component {

  state = {
    crypto: null,
    bitcoin: null,
    http: null,
    wallet: null
  };

  componentDidMount() {
    process.nextTick(() => {
      cryptoExample().then((crypto) => this.setState({crypto}));
      bitcoinExample().then((bitcoin) => this.setState({bitcoin}));
      httpExample().then((http) => this.setState({http}));
      walletExample().then((wallet) => this.setState({wallet}));
    });
  }

  _renderResult(result) {
    if (result === null) {
      return 'waiting...';
    }
    if (result) {
      return result;
    }
    return 'failed.';
  }

  render() {
    return (
      <View>
        <Text>Crypto: {this._renderResult(this.state.crypto)}</Text>
        <Text>Bitcoin: {this._renderResult(this.state.bitcoin)}</Text>
        <Text>HTTP: {this._renderResult(this.state.http)}</Text>
        <Text>Wallet: {this._renderResult(this.state.wallet)}</Text>
      </View>
    );
  }
}

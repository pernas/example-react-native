import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight } from 'react-native'
import Keyboard from 'react-native-keyboard'
import SlideUp from './SlideUp'
import colors from './styles/colors'
import QrCode from 'react-native-qrcode'

const styles = StyleSheet.create({
  slide: {
    flex: 1
  },
  receive: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRow: {
    width: '80%',
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  input: {
    flexGrow: 4,
    fontSize: 32,
    textAlign: 'center'
  },
  actionBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 12,
    backgroundColor: colors.trueBlue
  },
  actionText: {
    fontSize: 20
  },
  cancelButton: {
    width: '60%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    backgroundColor: colors.danger
  }
})

const isNum = (n) => !isNaN(n)
const isString = (s) => typeof s === 'string'
const takeDigits = (s, max) => s.split('').filter(isNum).slice(0, max).join('')

const makeBitcoinUrl = (address, amount) => `bitcoin:${address}?amount=${amount}`

class Request extends Component {
  constructor (props) {
    super(props)
    this.state = { amount: '', isReceiving: false }
  }

  handleInput (text) {
    let delimeter = '.'
    let [ints, fracs] = text.split(delimeter)
    let amount = takeDigits(ints) + (isString(fracs) ? delimeter + takeDigits(fracs, 2) : '')
    this.setState({ amount })
  }

  handleDelete () {
    this.handleInput(this.state.amount.slice(0, -1))
  }

  handleKeyPress (key) {
    this.handleInput(this.state.amount + key)
  }

  render () {
    let { amount } = this.state

    let receiveView = () => (
      <View style={[styles.slide, styles.receive]}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 28}}>${parseFloat(amount, 10).toFixed(2)}</Text>
          <Text style={{fontSize: 18}}>1 BTC</Text>
        </View>
        <QrCode value={makeBitcoinUrl('somebitcoinaddress', amount)} size={256} />
        <Text style={{fontSize: 18}}>Waiting For Payment</Text>
        <TouchableHighlight onPress={() => this.setState({ isReceiving: false })} underlayColor={colors.transparent}>
          <View style={styles.cancelButton}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </View>
        </TouchableHighlight>
      </View>
    )

    return (
      <View style={styles.slide}>
        <View style={styles.top}>
          <View style={styles.inputRow}>
            <View style={{flexGrow: 1}} />
            <TextInput
              style={styles.input}
              value={this.state.amount.toString()}
            />
            <Text style={{fontSize: 20}}>USD</Text>
          </View>
        </View>
        <View style={styles.actionBar}>
          <Button
            style={styles.actionText}
            onPress={() => this.setState({ isReceiving: true })}
            title='Charge'
            color='white'
            disabled={isNaN(parseFloat(amount))}
          />
        </View>
        <Keyboard
          keyboardType='decimal-pad'
          onDelete={this.handleDelete.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <SlideUp show={this.state.isReceiving} duration={600}>
          {receiveView()}
        </SlideUp>
      </View>
    )
  }
}

export default Request

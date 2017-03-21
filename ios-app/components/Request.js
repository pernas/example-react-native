import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'
import Keyboard from 'react-native-keyboard'
import SlideUp from './SlideUp'
import colors from './styles/colors'

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 60,
    fontSize: 32,
    width: '80%',
    marginLeft: '10%',
    borderColor: 'gray',
    borderWidth: 1,
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
  }
})

const isNum = (n) => !isNaN(n)
const isString = (s) => typeof s === 'string'
const takeDigits = (s, max) => s.split('').filter(isNum).slice(0, max).join('')

class Request extends Component {
  constructor (props) {
    super(props)
    this.state = { num: '', isReceiving: false }
  }

  handleInput (text) {
    let delimeter = '.'
    let [ints, fracs] = text.split(delimeter)
    let num = takeDigits(ints) + (isString(fracs) ? delimeter + takeDigits(fracs, 2) : '')
    this.setState({ num })
  }

  handleDelete () {
    this.handleInput(this.state.num.slice(0, -1))
  }

  handleKeyPress (key) {
    this.handleInput(this.state.num + key)
  }

  render () {
    return (
      <View style={styles.slide}>
        <View style={styles.top}>
          <Text>Amount</Text>
          <TextInput
            style={styles.input}
            value={this.state.num.toString()}
          />
        </View>
        <View style={styles.actionBar}>
          <Button
            style={styles.actionText}
            onPress={() => this.setState({ isReceiving: true })}
            title='Charge'
            color='white'
          />
        </View>
        <Keyboard
          keyboardType='decimal-pad'
          onDelete={this.handleDelete.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <SlideUp show={this.state.isReceiving} duration={800}>
          <View style={styles.slide}>
            <Button
              onPress={() => this.setState({ isReceiving: false })}
              title='Close'
            />
          </View>
        </SlideUp>
      </View>
    )
  }
}

export default Request

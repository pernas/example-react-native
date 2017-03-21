import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import Keyboard from 'react-native-keyboard'

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

const isNum = (n) => !isNaN(n)
const isString = (s) => typeof s === 'string'
const takeDigits = (s, max) => s.split('').filter(isNum).slice(0, max).join('')

class Request extends Component {
  constructor (props) {
    super(props)
    this.state = { num: '' }
  }

  handleInput (text) {
    let delimeter = '.'
    let [ints, fracs] = text.split(delimeter)
    let num = takeDigits(ints) + (isString(fracs) ? delimeter + takeDigits(fracs, 2) : '')
    this.setState({ num })
  }

  render () {
    return (
      <View style={styles.slide}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          value={this.state.num.toString()}
          onChangeText={this.handleInput.bind(this)}
        />
      </View>
    )
  }
}

export default Request

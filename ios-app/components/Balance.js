import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import colors from './styles/colors'
import IconButton from './IconButton'
import appStyles from './styles/styles'

const styles = StyleSheet.create({
  balance: {
    height: 92,
    paddingTop: 4,
    backgroundColor: colors.trueBlue,
    alignItems: 'center'
  }
})

const Balance = ({ currency, amount, onToggle }) => {
  let amountString = currency.render(currency.calc(amount))
  return (
    <View style={styles.balance}>
      <TouchableHighlight underlayColor={colors.transparent} onPress={onToggle}>
        <Text style={[appStyles.white, appStyles.large]}>{amountString}</Text>
      </TouchableHighlight>
      {/* <IconButton name='chevron-right' size={14} style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8 }}> */}
        {/* <Text style={[appStyles.white, appStyles.medium, { marginRight: 8, paddingBottom: 2, paddingLeft: 14 }]}>Total Balance</Text> */}
      {/* </IconButton> */}
    </View>
  )
}

export default Balance

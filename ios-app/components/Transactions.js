import React, { Component } from 'react'
import { View, Text, ListView, StyleSheet } from 'react-native'
import colors from './styles/colors'
import appStyles from './styles/styles'

let styles = StyleSheet.create({
  tx: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amount: {
    marginVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: 'center'
  }
})

const Transaction = ({ tx, amount, currency }) => {
  let color = colors[tx.type]
  let amountString = currency.render(amount)
  const day = new Date(tx.time*1000)
  return (
    <View style={styles.tx}>
      <View>
        <Text style={appStyles.small}> {day.toDateString()} </Text>
        <Text style={[appStyles.medium, { fontWeight: 'bold', color, marginTop: 8 }]}>
          {tx.type.toUpperCase()}
        </Text>
      </View>
      <View style={[styles.amount, { backgroundColor: color }]}>
        <Text style={[appStyles.white, { fontSize: 16 }]}>{amountString}</Text>
      </View>
    </View>
  )
}

class Transactions extends Component {
  constructor (props) {
    super(props)
    let { txs, currency } = this.props
    let rowHasChanged = (r1, r2) => r1[0].hash !== r2[0].hash || r1[1] !== r2[1]
    let dataSource = new ListView.DataSource({ rowHasChanged })
    dataSource = Transactions.cloneDataSource(txs, currency, dataSource)
    this.state = { dataSource }
  }

  componentWillReceiveProps (props) {
    let { txs, currency } = props
    let { dataSource } = this.state
    dataSource = Transactions.cloneDataSource(txs, currency, dataSource)
    this.setState({ dataSource })
  }

  static cloneDataSource (txs, currency, dataSource) {
    let nextTxs = txs.map(tx => [tx, currency.calc(tx.amount)])
    return dataSource.cloneWithRows(nextTxs)
  }

  render () {
    let { currency } = this.props
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={([tx, amount]) => <Transaction tx={tx} amount={amount} currency={currency} />}
      />
    )
  }
}

export default Transactions

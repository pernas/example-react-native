import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import colors from './styles/colors'

const styles = StyleSheet.create({
  nav: {
    height: 72,
    backgroundColor: colors.trueBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  navText: {
    color: 'white',
    fontSize: 24,
    marginTop: 16
  }
})

class Header extends Component {
  render () {
    // let title = this.props.children
    return (
      <View style={styles.nav}>
        {/* <IconButton name='bars' size={24} onPress={this.props.onMenu} /> */}
        {/* {title ? <Text style={styles.navText}>{title}</Text> : null} */}
        {/* <IconButton name='qrcode' size={24} /> */}
      </View>
    )
  }
}

export default Header

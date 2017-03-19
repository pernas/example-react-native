import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from './styles/colors'

const styles = StyleSheet.create({
  icon: {
    marginTop: 16,
    marginLeft: 8
  },
  verticalIcon: {
    width: 120,
    flexDirection: 'column'
  }
})

const IconButton = ({ name, vertical, children, ...props }) => (
  <Icon.Button
    name={name}
    style={vertical ? styles.verticalIcon : styles.icon}
    backgroundColor={colors.transparent}
    underlayColor={colors.transparent}
    {...props}
  >
    {children}
  </Icon.Button>
)

export default IconButton

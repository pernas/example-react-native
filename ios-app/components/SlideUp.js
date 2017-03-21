import React, { Component } from 'react'
import { StyleSheet, Animated, Easing } from 'react-native'

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

class SlideUp extends Component {
  constructor (props) {
    super(props)
    this.state = { anim: new Animated.Value(props.show ? 0 : 1) }
  }

  componentWillReceiveProps (props) {
    let { show, duration, easing = Easing.inOut(Easing.quad) } = props
    let animConfig = { toValue: show ? 0 : 1, duration, easing }
    Animated.timing(this.state.anim, animConfig).start()
  }

  render () {
    let animation = {
      top: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
      })
    }

    return (
      <Animated.View style={[styles.view, animation]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default SlideUp

import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import throttle from 'lodash.throttle'

const withDimension = ({
  transform = ((width, height) => ({ containerWidth: width, containerHeight: height })),
  containerStyle = ({
    width: '100%',
    height: '100%',
    padding: 0,
    border: 0,
  }),
  getHeight = ((elem) => elem.getBoundingClientRect().height),
  getWidth = ((elem) => elem.getBoundingClientRect().width),
  wait = 200,
} = {}) => (BaseComponent) => class extends Component {
  static displayName = wrapDisplayName(BaseComponent, 'withDimension')

  state = {
    containerWidth: null,
    containerHeight: null,
  }

  componentDidMount() {
    if (window && window.addEventListener) {
      this.updateDimensions()
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    if (window && window.removeEventListener) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleResize() {
    return window.requestAnimationFrame(() => throttle(this.updateDimensions, wait))
  }

  updateDimensions() {
    const elem = this.refs.withDimensionContainer

    this.setState({
      containerWidth: getWidth(elem),
      containerHeight: getHeight(elem),
    })
  }

  render() {
    return (
      <div
        ref={'withDimensionContainer'}
        style={containerStyle}
      >
        <BaseComponent
          {...transform(this.state.containerWidth, this.state.containerHeight)}
          {...this.props}
        />
      </div>
    )
  }
}

export default withDimension

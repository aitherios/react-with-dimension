/** @module react-with-dimension */

import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import debounce from 'lodash.debounce'

/**
  * Debounced React high order component to expose container width and height.
  *
  * @param {Function} $0.transform data transformation function, receives (width, height)
  * @param {Object} $0.containerStyle style object to be added in wrapper container
  * @param {Function} $0.getHeight receives (element) and returns it's height
  * @param {Function} $0.getWidth receives (element) and returns it's width
  * @param {Number} $0.wait event listening debounce wait time in milliseconds
  */
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
      this.debouncedUpdate = debounce(this.updateDimensions, wait)
      this.updateDimensions()
      window.addEventListener('resize', this.debouncedUpdate)
    }
  }

  componentWillUnmount() {
    if (window && window.removeEventListener) {
      window.removeEventListener('resize', this.debouncedUpdate)
    }
  }

  updateDimensions = () => {
    const update = () => {
      const elem = this.refs.withDimensionContainer

      this.setState({
        containerWidth: getWidth(elem),
        containerHeight: getHeight(elem),
      })
    }

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => update())
    } else {
      update()
    }
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

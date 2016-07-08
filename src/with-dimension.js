import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import debounce from 'lodash.debounce'

const defaultGetHeight = (elem = {}) => {
  if (elem.getBoundingClientRect) {
    return elem.getBoundingClientRect().height
  }
  return elem.clientHeight
}

const defaultGetWidth = (elem = {}) => {
  if (elem.getBoundingClientRect) {
    return elem.getBoundingClientRect().width
  }
  return elem.clientWidth
}

const defaultTransform = (width, height) => ({ containerWidth: width, containerHeight: height })

const defaultContainerStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0,
}

const withDimension = ({
  transform = defaultTransform,
  containerStyle = defaultContainerStyle,
  getHeight = defaultGetHeight,
  getWidth = defaultGetWidth,
  wait = 200,
} = {}) => (BaseComponent) => class extends Component {
  static displayName = wrapDisplayName(BaseComponent, 'withDimension')

  state = {
    containerWidth: null,
    containerHeight: null,
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window !== null && window.addEventListener) {
      this.debouncedUpdate = debounce(this.updateDimensions, wait)
      this.updateDimensions()
      window.addEventListener('resize', this.debouncedUpdate, { passive: true })
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null && window.removeEventListener) {
      window.removeEventListener('resize', this.debouncedUpdate, { passive: true })
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

    if (typeof window !== 'undefined' && window !== null && window.requestAnimationFrame) {
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

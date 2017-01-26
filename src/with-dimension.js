import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import debounce from 'lodash.debounce'

const defaultGetHeight = (elem = {}) => {
  if (elem && elem.clientHeight) {
    return elem.clientHeight
  }
  if (elem && elem.getBoundingClientRect) {
    return elem.getBoundingClientRect().height
  }
  return undefined
}

const defaultGetWidth = (elem = {}) => {
  if (elem && elem.clientWidth) {
    return elem.clientWidth
  }
  if (elem && elem.getBoundingClientRect) {
    return elem.getBoundingClientRect().width
  }
  return undefined
}

const defaultTransform = (width, height) => ({ containerWidth: width, containerHeight: height })

const defaultContainerStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0,
}

const defaultDebounceOptions = {
  leading: false,
  trailing: true,
  maxWait: 800,
}

const withDimension = ({
  transform = defaultTransform,
  containerStyle = defaultContainerStyle,
  getHeight = defaultGetHeight,
  getWidth = defaultGetWidth,
  wait = 200,
  debounceOptions = defaultDebounceOptions,
} = {}) => (BaseComponent) => class extends Component {
  static displayName = wrapDisplayName(BaseComponent, 'withDimension')

  state = {
    containerWidth: null,
    containerHeight: null,
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window !== null && window.addEventListener) {
      this.canUpdate = true
      this.debouncedUpdate = debounce(this.updateDimensions, wait, debounceOptions)
      window.addEventListener('resize', this.debouncedUpdate, { passive: true })
      this.debouncedUpdate()
    }
  }

  componentDidUpdate() {
    if (this.debouncedUpdate) {
      this.debouncedUpdate()
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && window !== null && window.removeEventListener) {
      this.canUpdate = false
      window.removeEventListener('resize', this.debouncedUpdate, { passive: true })
    }
  }

  update = (elem) => {
    this.setState({
      containerWidth: getWidth(elem),
      containerHeight: getHeight(elem),
    })
  }

  updateDimensions = () => {
    const elem = this.refs.withDimensionContainer

    if (!this.canUpdate) { return }
    if (this.state.containerWidth === getWidth(elem)
      && this.state.containerHeight === getHeight(elem)
    ) { return }

    if (typeof window !== 'undefined' && window !== null && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => this.update(elem))
    } else {
      this.update(elem)
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

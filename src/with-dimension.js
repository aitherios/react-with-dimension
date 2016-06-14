import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import debounce from 'lodash.debounce'

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

jest.unmock('../with-dimension')
jest.mock('lodash.debounce', () => ((param) => param))

import React from 'react'
import WithDimension from '../with-dimension'
import { mount } from 'enzyme'

describe('WithDimension()(Component)', () => {
  let subject
  const Header = ({ title }) => (<h1>{title}</h1>)
  Header.propTypes = { title: React.PropTypes.string }

  describe('when composing with default transform function', () => {
    const Decorated = WithDimension()(Header)

    beforeEach(() => { subject = mount(<Decorated title={'My title'} />) })

    it('renders', () => { expect(subject).toBeTruthy() })
    it('renders inner component', () => { expect(subject.find(Header).length).toBe(1) })
    it('defines a displayName', () => {
      expect(Decorated.displayName).toBe('withDimension(Header)')
    })
    it('injects properties containerHeight and containerWidth', () => {
      expect(subject.find(Header).prop('containerHeight')).toBe(0)
      expect(subject.find(Header).prop('containerWidth')).toBe(0)
    })
  })

  describe('when composing with a custom transform function', () => {
    const Decorated = WithDimension({
      transform: (width, height) => ({ largeness: width, tallness: height }),
    })(Header)

    beforeEach(() => { subject = mount(<Decorated title={'My title'} />) })

    it('injects largeness and tallness property', () => {
      expect(subject.find(Header).prop('largeness')).toBe(0)
      expect(subject.find(Header).prop('tallness')).toBe(0)
    })
  })
})

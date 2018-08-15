/* eslint-disable react/jsx-no-bind */
import * as React from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import HotKeys from '../hot-keys'

class Assertions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assertions: []
    }
    this.handleHotKey = this.handleHotKey.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.assertions.length > state.assertions.length) {
      const newAssertions = props.assertions.slice(state.assertions.length)
      return {
        assertions: [
          ...state.assertions,
          ...newAssertions.map(text => ({
            originalText: text,
            text,
            selected: false
          }))
        ]
      }
    }

    return state
  }

  toggleAssertion(selectedIndex) {
    this.setState({
      assertions: this.state.assertions.map((assertion, index) => {
        if (index === selectedIndex) {
          return { ...assertion, selected: !assertion.selected }
        } else {
          return assertion
        }
      })
    })
  }

  changeAssertion(changedIndex, newText) {
    this.setState({
      assertions: this.state.assertions.map((assertion, index) => {
        if (index === changedIndex) {
          return { ...assertion, text: newText }
        } else {
          return assertion
        }
      })
    })
  }

  handleHotKey(hotKey) {
    const { onRelationship } = this.props
    const { assertions } = this.state

    if (hotKey === 'ctrl-2') {
      const selectedAssertions = assertions
        .filter(({ selected }) => selected)
        .map(({ text }) => text)

      if (selectedAssertions.length > 0) {
        onRelationship(selectedAssertions)

        this.setState({
          assertions: assertions.map(assertion => ({
            ...assertion,
            selected: false
          }))
        })
      }
    }
  }

  render() {
    const { className } = this.props
    const { assertions } = this.state

    return (
      <div className={cx('assertions', className)}>
        <HotKeys onHotKey={this.handleHotKey} />

        {assertions.map(({ originalText, selected, text }, index) => (
          <input
            key={originalText}
            className={cx('assertion', { selected })}
            onDoubleClick={() => this.toggleAssertion(index)}
            onChange={e => this.changeAssertion(index, e.target.value)}
            value={text}
          />
        ))}
      </div>
    )
  }
}

const StyledAssertions = styled(Assertions)`
  .assertion {
    border: 1px solid #ccc;
    display: block;
    width: 100%;
  }

  .assertion.selected {
    border-color: #aeeeee;
    outline-color: #aeeeee;
  }

  .assertion + .assertion {
    margin-top: 15px;
  }
`

export default StyledAssertions

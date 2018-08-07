/* eslint-disable react/jsx-no-bind */
import * as React from 'react'
import cx from 'classnames'
import styled from 'styled-components'

class Assertions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assertions: []
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
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

  handleKeyDown(e) {
    const { onRelationship } = this.props
    const { assertions } = this.state

    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault()

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

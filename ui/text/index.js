import * as React from 'react'
import cx from 'classnames'
import styled from 'styled-components'
import HotKeys from '../hot-keys'

class Text extends React.Component {
  constructor(props) {
    super(props)
    this.state = { saved: false }
    this.input = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleHotKey = this.handleHotKey.bind(this)
  }

  handleHotKey(hotKey) {
    const { onAssertion } = this.props
    const { saved } = this.state

    if (hotKey === 'ctrl-1') {
      const selection = window.getSelection()
      if (saved && selection.type === 'Range') {
        const range = selection.getRangeAt(0)
        onAssertion(range.toString())

        const span = document.createElement('span')
        span.className = 'assertion'
        range.surroundContents(span)

        selection.removeAllRanges()
      }
    }
  }

  handleSubmit() {
    this.setState({ saved: true })
  }

  render() {
    const { className } = this.props
    const { saved } = this.state

    return (
      <div className={cx('text', className)}>
        <HotKeys onHotKey={this.handleHotKey} />
        <div className="input" ref={this.input} contentEditable={!saved} />
        {!saved && (
          <button className="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        )}
      </div>
    )
  }
}

const StyledText = styled(Text)`
  .input[contenteditable='true'] {
    border: 1px solid #ccc;
  }

  .assertion {
    background-color: #aeeeee;
  }

  .submit {
    float: right;
    margin-top: 15px;
  }
`

export default StyledText

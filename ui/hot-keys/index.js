import * as React from 'react'

export default class HotKeys extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(event) {
    const { onHotKey } = this.props

    const keys = []
    if (event.ctrlKey) keys.push('ctrl')
    if (event.altKey) keys.push('alt')
    if (event.metaKey) keys.push('meta')
    keys.push(event.key)

    onHotKey(keys.join('-'))
  }

  render() {
    return null
  }
}

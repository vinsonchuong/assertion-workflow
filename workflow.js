import * as React from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import Text from './text'
import Assertions from './assertions'
import Relationships from './relationships'

class Workflow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assertions: [],
      relationships: []
    }
    this.handleOnAssertion = this.handleOnAssertion.bind(this)
    this.handleOnRelationship = this.handleOnRelationship.bind(this)
  }

  handleOnAssertion(assertion) {
    this.setState({
      assertions: [...this.state.assertions, assertion]
    })
  }

  handleOnRelationship(assertions) {
    this.setState({
      relationships: [...this.state.relationships, { assertions }]
    })
  }

  render() {
    const { className } = this.props
    const { relationships, assertions } = this.state

    return (
      <div className={cx('workflow', className)}>
        <Relationships relationships={relationships} />
        <Assertions
          assertions={assertions}
          onRelationship={this.handleOnRelationship}
        />
        <Text onAssertion={this.handleOnAssertion} />
      </div>
    )
  }
}

const StyledWorkflow = styled(Workflow)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;

  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 16px;
`

export default StyledWorkflow

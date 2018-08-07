/* eslint-disable react/jsx-no-bind, react/no-array-index-key */
import * as React from 'react'
import cx from 'classnames'
import styled from 'styled-components'

class Relationships extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      relationships: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.relationships.length > state.relationships.length) {
      const newRelationships = props.relationships.slice(
        state.relationships.length
      )
      return {
        relationships: [
          ...state.relationships,
          ...newRelationships.map(relationship => ({
            ...relationship,
            text: ''
          }))
        ]
      }
    }

    return state
  }

  changeRelationship(changedIndex, newText) {
    this.setState({
      relationships: this.state.relationships.map((relationship, index) => {
        if (index === changedIndex) {
          return { ...relationship, text: newText }
        } else {
          return relationship
        }
      })
    })
  }

  render() {
    const { className } = this.props
    const { relationships } = this.state

    return (
      <div className={cx('relationships', className)}>
        {relationships.map(({ selected, text }, index) => (
          <input
            key={index}
            className="relationship"
            onChange={e => this.changeRelationship(index, e.target.value)}
            value={text}
          />
        ))}
      </div>
    )
  }
}

const StyledRelationships = styled(Relationships)`
  .relationship {
    border: 1px solid #ccc;
    display: block;
    width: 100%;
  }

  .relationship.selected {
    border-color: #aeeeee;
    outline-color: #aeeeee;
  }

  .relationship + .relationship {
    margin-top: 15px;
  }
`

export default StyledRelationships

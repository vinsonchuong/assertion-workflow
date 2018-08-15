import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

export default function(Component, selectors, actions) {
  return connect(
    createStructuredSelector(selectors),
    actions
  )(Component)
}

/**
*
* BoardElement
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { TYPE_GENERATED } from '../../utils/BoardUtils'
import styled from 'styled-components'
import Colors from '../../color'
const EmptyBoardElementDiv = styled.div`
background-color: ${Colors.EmptyBoardElementbackgroundColor};
color: white;
width: 40px;
height: 40px;
text-align: center;
padding: 5px;
line-height: 30px;
font-size: 15px;
`
const FilledBoardElementDiv = styled(EmptyBoardElementDiv)`
background-color: ${Colors.FilledBoardElementbackgroundColor};
`

class BoardElement extends React.Component {
  render () {
    let borderElementStyle = this.props.getBoardItemStyle(this.props.row, this.props.column, 'black')
    if (this.props.type === TYPE_GENERATED) {
      return (
        <FilledBoardElementDiv style={borderElementStyle}>{this.props.value}</FilledBoardElementDiv>
      )
    } else {
      return (
        <EmptyBoardElementDiv onClick={(evt) => this.props.handleBoardElementClick(evt.target, this.props.row, this.props.column)} style={borderElementStyle}>{this.props.value}</EmptyBoardElementDiv>
      )
    }
  }
}

BoardElement.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleBoardElementClick: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(
  withConnect
)(BoardElement)

/**
*
* BoardElement
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { BOX_SIZE_HEIGHT, BOX_SIZE_WIDTH, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, TYPE_GENERATED } from '../../utils/BoardUtils'
import styled from 'styled-components'
import Colors from '../../color'
const EmptyBoardElementDiv = styled.div`
background-color: ${Colors.EmptyBoardElementbackgroundColor};
border: 1px solid black;
color: white;
width: 40px;
height: 40px;
text-align: center;
padding: 5px;
`
const FilledBoardElementDiv = styled(EmptyBoardElementDiv)`
background-color: ${Colors.FilledBoardElementbackgroundColor};
`
let clickedBoardItem
class BoardElement extends React.Component {
  handleBoardElementClick = (evt) => {
    if (clickedBoardItem) {
      clickedBoardItem.target.style = this.getBoardItemStyle(clickedBoardItem.row, clickedBoardItem.column)
      console.log('clickedBoardItem')
      console.log(evt.target.style)
    }
    console.log('new board item')
    evt.target.style.borderColor = 'white'
    console.log(evt.target.style)
    clickedBoardItem = {target: evt.target, row: this.props.row, column: this.props.column}
  }

  getBoardItemStyle = (row, column) => {
    let borderElementStyle = {}
    if ((row % BOX_SIZE_HEIGHT) === 2 && row !== NUMBER_OF_ROWS - 1) {
      borderElementStyle['borderBottom'] = '1px solid ' + Colors.BorderColor
    }
    if ((row % BOX_SIZE_HEIGHT) === 0 && row !== 0) {
      borderElementStyle['borderTop'] = '1px solid ' + Colors.BorderColor
    }
    if ((column % BOX_SIZE_WIDTH) === 2 && column !== NUMBER_OF_COLUMNS - 1) {
      borderElementStyle['borderRight'] = '1px solid ' + Colors.BorderColor
    }
    if ((column % BOX_SIZE_WIDTH) === 0 && column !== 0) {
      borderElementStyle['borderLeft'] = '1px solid ' + Colors.BorderColor
    }
    return borderElementStyle
  }
  render () {
    let borderElementStyle = this.getBoardItemStyle(this.props.row, this.props.column)
    if (this.props.type === TYPE_GENERATED) {
      return (
        <FilledBoardElementDiv style={borderElementStyle}>{this.props.value}</FilledBoardElementDiv>
      )
    } else {
      return (
        <EmptyBoardElementDiv onClick={this.handleBoardElementClick} style={borderElementStyle}>{this.props.value}</EmptyBoardElementDiv>
      )
    }
  }
}

BoardElement.propTypes = {
  dispatch: PropTypes.func.isRequired
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

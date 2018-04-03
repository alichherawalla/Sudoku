/**
*
* BoardElement
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { BOX_SIZE_HEIGHT, BOX_SIZE_WIDTH, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from '../../utils/BoardUtils'
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
class BoardElement extends React.Component {
  render () {
    let borderElementStyle = {}
    if ((this.props.row % BOX_SIZE_HEIGHT) === 2 && this.props.row !== NUMBER_OF_ROWS - 1) {
      borderElementStyle['borderBottom'] = '1px solid ' + Colors.BorderColor
    }
    if ((this.props.row % BOX_SIZE_HEIGHT) === 0 && this.props.row !== 0) {
      borderElementStyle['borderTop'] = '1px solid ' + Colors.BorderColor
    }
    if ((this.props.column % BOX_SIZE_WIDTH) === 2 && this.props.column !== NUMBER_OF_COLUMNS - 1) {
      borderElementStyle['borderRight'] = '1px solid ' + Colors.BorderColor
    }
    if ((this.props.column % BOX_SIZE_WIDTH) === 0 && this.props.column !== 0) {
      borderElementStyle['borderLeft'] = '1px solid ' + Colors.BorderColor
    }
    if (this.props.value !== 0) {
      return (
        <FilledBoardElementDiv style={borderElementStyle}>{this.props.value}</FilledBoardElementDiv>
      )
    } else {
      return (
        <EmptyBoardElementDiv style={borderElementStyle}>{this.props.value}</EmptyBoardElementDiv>
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

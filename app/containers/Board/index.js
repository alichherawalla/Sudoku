/**
 *
 * Board
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import injectReducer from 'utils/injectReducer'
import makeSelectGame from './selectors'
import reducer from './reducer'
import Colors from '../../color'
import HorizontallyAlignedComponent from '../../components/HorizontallyAlignedComponent/'
import BoardElement from '../BoardElement'
import styled from 'styled-components'

const BoardContainer = styled.div`
background-color: ${Colors.BoardBackgroundColor};
border: 2px solid black;
`
export class Board extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <BoardContainer >
        {
          this.props.game.board.map((row, rowIndex) => {
            return <HorizontallyAlignedComponent key={rowIndex}>
              {
                row.map((boardElement, columnIndex) => {
                  return <BoardElement key={columnIndex} row={rowIndex} column={columnIndex} value={this.props.game.board[rowIndex][columnIndex]} />
                })
              }
            </HorizontallyAlignedComponent>
          })
        }
      </BoardContainer>
    )
  }
}

Board.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  game: makeSelectGame()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'board', reducer })

export default compose(
  withReducer,
  withConnect
)(Board)

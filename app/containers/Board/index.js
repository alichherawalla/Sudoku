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
import styled from 'styled-components'

import injectReducer from 'utils/injectReducer'
import makeSelectGame from './selectors'
import reducer from './reducer'
import Colors from '../../color'
import HorizontallyAlignedComponent from '../../components/HorizontallyAlignedComponent/'
import BoardElement from '../BoardElement'
import LeftAlignedChild from '../../components/LeftAlignedChild'
import CenteredSection from '../App/CenteredSection'
import ParentToLeftRightAligned from '../../components/ParentToLeftRightAligned'
import H1 from '../../components/H1'
import {NUMBER_OF_ROWS} from '../../utils/BoardUtils'
import { requestNewGame } from './actions'

const BoardContainer = styled.div`
background-color: ${Colors.BoardBackgroundColor};
border: 2px solid black;
`

const Button = styled.div`
margin: 5px;
padding: 5px;
cursor: pointer;
color : #4592E6;
`

const BoardWrapper = styled.div`
height: 100%;
width: 100%;
`

export class Board extends React.Component { // eslint-disable-line react/prefer-stateless-function
  downloadSolution = () => {
    var element = document.createElement('a')
    let str = '[\n'
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      str += ' [' + this.props.game.board[i] + ']\n'
    }
    str += ']'
    var file = new Blob([str], {type: 'text/plain'}) //eslint-disable-line
    element.href = URL.createObjectURL(file) // eslint-disable-line
    element.download = 'sudoku_solution.txt'
    element.click()
  }
  render () {
    return (
      <BoardWrapper>
        <ParentToLeftRightAligned>
          <LeftAlignedChild><H1>Sudoku</H1></LeftAlignedChild>
        </ParentToLeftRightAligned>
        <BoardContainer >
          {
            this.props.game.board.map((row, rowIndex) => {
              return <HorizontallyAlignedComponent key={rowIndex}>
                {
                  row.map((boardElement, columnIndex) => {
                    return <BoardElement key={columnIndex} row={rowIndex} column={columnIndex} type={this.props.game.board[rowIndex][columnIndex].type} value={this.props.game.board[rowIndex][columnIndex].value} />
                  })
                }
              </HorizontallyAlignedComponent>
            })
          }
        </BoardContainer>
        <HorizontallyAlignedComponent>
          <CenteredSection>
            <Button onClick={this.props.requestNewGame}>New Game</Button>
            <Button onClick={this.downloadSolution}>Download solution</Button>
            <Button>Reset</Button>
          </CenteredSection>
        </HorizontallyAlignedComponent>
      </BoardWrapper>
    )
  }
}

Board.propTypes = {
  dispatch: PropTypes.func.isRequired,
  requestNewGame: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  game: makeSelectGame()
})

function mapDispatchToProps (dispatch) {
  return {
    requestNewGame: () => {
      dispatch(requestNewGame())
    },
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'board', reducer })

export default compose(
  withReducer,
  withConnect
)(Board)

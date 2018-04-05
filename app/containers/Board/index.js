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
import ReactDOM from 'react-dom'
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
import { TYPE_GENERATED, BOX_SIZE_HEIGHT, BOX_SIZE_WIDTH, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, TYPE_USER, isValidMove } from '../../utils/BoardUtils'
import { updateBoard, requestNewGame } from './actions'
import { KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN } from '../../utils/constants'

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
let clickedBoardItem
export class Board extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyPress)
  }
  getBoardItemStyle = (row, column, color) => {
    let borderElementStyle = {
      borderBottom: '1px solid ' + color,
      borderTop: '1px solid ' + color,
      borderRight: '1px solid ' + color,
      borderLeft: '1px solid ' + color
    }
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

  handleBoardElementClick = (element, row, column) => {
    if (clickedBoardItem) {
      let boardElementStyle = this.getBoardItemStyle(clickedBoardItem.row, clickedBoardItem.column, 'black')
      clickedBoardItem.target.style.borderRight = boardElementStyle.borderRight
      clickedBoardItem.target.style.borderBottom = boardElementStyle.borderBottom
      clickedBoardItem.target.style.borderTop = boardElementStyle.borderTop
      clickedBoardItem.target.style.borderLeft = boardElementStyle.borderLeft
    }
    let boardElementStyle = this.getBoardItemStyle(row, column, 'white')
    element.style.borderRight = boardElementStyle.borderRight
    element.style.borderBottom = boardElementStyle.borderBottom
    element.style.borderTop = boardElementStyle.borderTop
    element.style.borderLeft = boardElementStyle.borderLeft
    clickedBoardItem = {target: element, row: row, column: column}
  }

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
  handleKeyPress = (evt) => {
    let boardArray = this.props.game.board.map((boardRow) => boardRow.slice().map((element) => element.value ? element.value : 0))
    let board = this.props.game.board.map((boardRow) => boardRow.slice())
    if (clickedBoardItem && evt.keyCode >= 49 && evt.keyCode <= 57) {
      try {
        let value = parseInt(evt.key)
        if (isValidMove(boardArray, clickedBoardItem.row, clickedBoardItem.column, value)) {
          board[clickedBoardItem.row][clickedBoardItem.column] = {type: TYPE_USER, value: value}
          this.props.updateGame(board)
        }
      } catch (err) {
        console.log(err)
        console.log(evt)
      }
    } else if (clickedBoardItem && evt.keyCode >= 37 && evt.keyCode <= 40) {
      let row = clickedBoardItem.row
      let column = clickedBoardItem.column
      switch (evt.keyCode) {
        case KEY_LEFT:
          for (column = clickedBoardItem.column - 1; column >= 0; column--) {
            if (board[row][column].type !== TYPE_GENERATED) {
              this.handleBoardElementClick(ReactDOM.findDOMNode(this.refs[row + '' + column]), row, column)
              break
            }
          }
          break
        case KEY_UP:
          for (row = clickedBoardItem.row - 1; row >= 0; row--) {
            if (board[row][column].type !== TYPE_GENERATED) {
              this.handleBoardElementClick(ReactDOM.findDOMNode(this.refs[row + '' + column]), row, column)
              break
            }
          }
          break
        case KEY_RIGHT:
          for (column = clickedBoardItem.column + 1; column <= NUMBER_OF_COLUMNS - 1; column++) {
            if (board[row][(column)].type !== TYPE_GENERATED) {
              this.handleBoardElementClick(ReactDOM.findDOMNode(this.refs[row + '' + column]), row, column)
              break
            }
          }
          break
        case KEY_DOWN:
          for (row = clickedBoardItem.row + 1; row <= NUMBER_OF_ROWS - 1; row++) {
            if (board[row][column].type !== TYPE_GENERATED) {
              this.handleBoardElementClick(ReactDOM.findDOMNode(this.refs[row + '' + column]), row, column)
              break
            }
          }
          break
      }
      // this.handleBoardElementClick(ReactDOM.findDOMNode(this.refs[row + '' + column]), row, column)
    } else {
      // do something here
    }
  }
  render () {
    return (
      <BoardWrapper>
        <ParentToLeftRightAligned>
          <LeftAlignedChild><H1>Sudoku</H1></LeftAlignedChild>
        </ParentToLeftRightAligned>
        <BoardContainer>
          {
            this.props.game.board.map((row, rowIndex) => {
              return <HorizontallyAlignedComponent key={rowIndex}>
                {
                  row.map((boardElement, columnIndex) => {
                    return <BoardElement
                      getBoardItemStyle={this.getBoardItemStyle}
                      handleBoardElementClick={this.handleBoardElementClick}
                      key={columnIndex}
                      row={rowIndex}
                      column={columnIndex}
                      ref={rowIndex + '' + columnIndex}
                      type={this.props.game.board[rowIndex][columnIndex].type}
                      value={this.props.game.board[rowIndex][columnIndex].value} />
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
    updateGame: (board) => {
      dispatch(updateBoard(board))
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

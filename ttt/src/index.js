// Tic Tac Toe with time travel and extras

// Display the location for each move in the format (col, row) in the move history list.
// Bold the currently selected item in the move list.
// Rewrite Board to use two loops to make the squares instead of hardcoding them.
// Add a toggle button that lets you sort the moves in either ascending or descending order.
// When someone wins, highlight the three squares that caused the win.
// When no one wins, display a message about the result being a draw.

// Thanks to Kevin Wang 
// https://medium.com/@thekevinwang/react-%EF%B8%8F-tic-tac-toe-%EF%B8%8F%E2%83%A3-extras-88e68f025772

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    //Square components receive values from the Board
    // and inform Board when they are clicked
      return (
        <button 
            className={"square " + (props.isWinning ? "square--winning" : null)} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
      );
    }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            isWinning={this.props.winningSquares.includes(i)}
            key={"square " + i} 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        // loops make a board, instead hardcoding
        <div>
          <div className="board-row">
            {
                Array(3).fill(null).map((_, i) => {
                    const row = Array(3).fill(null).map((_, j) => this.renderSquare(3 * i + j));
                    return (
                        <div key={i} className="board-row">
                            {row}
                        </div>
                    );
                })
            }   
            </div>
          </div>
      );
    }
}

    // passes a function from Board to Square to Game
    // Square calls the function from Board when Square is clicked
    // Board passes which Square was clicked to Game
  class Game extends React.Component {
    // all React component classes that have  constructor
    // should start with a super(props) call
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isDescending: true,
        };
    }
    
    handleClick(i) {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3],
        ];

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // now sets state to include location as well
        this.setState({
            history: history.concat([{
               squares: squares,
               location: locations[i] 
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
 
    sortHistory() {
        this.setState({
            isDescending: !this.state.isDescending
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + " @ " + history[move].location:
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {/* if any button’s move matches Game‘s state.stepNumber,
                         return a bold desc, or else just return a regular desc. */}
                        {move == this.state.stepNumber ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });

      let status;
      if (winner) {
          status = 'Winner: ' + winner.player + " @ " + winner.line;
      } else if (!current.squares.includes(null)) {
            status = 'draw';
      } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                winningSquares={winner ? winner.line : []}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />

          </div>
          <div className="game-info">
            <div>{status}</div>
            
            <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
            <button onClick={() => this.sortHistory()}>
                Sort by: {this.state.isDescending ? "Descending" : "Ascending"}
            </button>

          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }
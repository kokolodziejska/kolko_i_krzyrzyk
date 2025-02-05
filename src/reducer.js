const initialState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  nextMove: 1,
  timeLeft: 15,
  winner: null,
};

export function actionClickedButton(r, c) {
  return {
    type: "CLICKED",
    r,
    c,
  };
}

export function actionRestart() {
  return {
    type: "RESTART",
  };
}

export function actionTimer() {
  return {
    type: "TIMER",
  };
}

function findWinner(board) {
  let sp = -0,
    sl = 0;

  for (let i = 0; i < 3; i++) {
    let sr = board[i].reduce((a, b) => a + b);
    let sc = board.map((r) => r[i]).reduce((a, b) => a + b);
    sp += board[i][i];
    sl += board[i][2 - i];

    if (sr == 3 || sc == 3 || sp == 3 || sl == 3) return "x";
    if (sr == -3 || sc == -3 || sp == -3 || sl == -3) return "0";
  }
  return null;
}

export default reductor = (state = initialState, action) => {
  if (action.type == "CLICKED") {
    let newBoard = structuredClone(state.board);
    newBoard[action.r][action.c] = state.nextMove;

    let winner = findWinner(newBoard);
    state = {
      ...state,
      board: newBoard,
      nextMove: state.nextMove * -1,
      winner,
      timeLeft: 15,
    };
  } else if (action.type == "RESTART") {
    state = structuredClone(initialState);
  } else if (action.type == "TIMER") {
    if (!state.winner) {
      if (state.timeLeft <= 0) {
        state = {
          ...state,
          winner: "Partia nie rozgerana!",
        };
      } else {
        state = { ...state, timeLeft: state.timeLeft - 1 };
      }
    }
  }

  return state;
};

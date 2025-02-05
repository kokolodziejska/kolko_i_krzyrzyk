import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "./board";
import { actionRestart, actionTimer } from "./reducer";
import { useEffect } from "react";

export default function App() {
  let board = useSelector((state) => state?.board);
  let winner = useSelector((state) => state.winner);
  let timeLeft = useSelector((state) => state.timeLeft);
  let dispatch = useDispatch();

  const clickMe = () => {
    dispatch({ type: "INC" });
  };

  const onRestart = () => {
    dispatch(actionRestart());
  };

  useEffect(() => {
    let t = setTimeout(() => {
      dispatch(actionTimer());
    }, 1000);
    return () => clearTimeout(t);
  });

  return (
    <div className="App">
      <h1>Kółko i krzyżyk</h1>
      {winner ? (
        <div>Zwycięzca: {winner}</div>
      ) : (
        <div>Pozostało czasu: {timeLeft} s</div>
      )}
      <button onClick={onRestart}> Restart </button>
      <Board board={board} winner={winner} />
    </div>
  );
}

import { useDispatch } from "react-redux";
import { actionClickedButton } from "./reducer";

export function Board({ board, winner }) {
  let dispatch = useDispatch();
  let onClicked = (r, c) => {
    dispatch(actionClickedButton(r, c));
  };

  return (
    <table id="board">
      <tbody>
        {board.map((r, ridx) => (
          <tr key={ridx}>
            {r.map((c, cidx) => (
              <td key={cidx}>
                {c > 0 ? (
                  "x"
                ) : c < 0 ? (
                  "o"
                ) : winner ? (
                  ""
                ) : (
                  <button onClick={() => onClicked(ridx, cidx)}> ....</button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import React, { useState } from "react";
import { boardSize } from "../../../constants";
import { Player } from "../../../interfaces";
import { isGameOver } from "../../../utils/game";
import "./styles.scss";

const classNameMap = { x: "boardCellCross", o: "boardCellCircle" };
const initialMatrix = Array(boardSize).fill(Array(boardSize).fill(null));

const Board = () => {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [turn, setTurn] = useState(Math.random() > 0.5 ? "x" : "o");
  const [winningPlayer, setWinningPlayer] = useState<Player | undefined>();

  const handleCellClick = (x: number, y: number) => {
    if (matrix[x][y]) return;
    if (winningPlayer) return;
    const newMatrix = matrix.map((row, i) => {
      if (i !== x) return row;
      return row.map((cell, j) => {
        if (j !== y) return cell;
        return turn;
      });
    });
    setMatrix(newMatrix);
    setWinningPlayer(isGameOver(newMatrix, [x, y]));
    setTurn(turn === "x" ? "o" : "x");
  };

  return (
    <section>
      {winningPlayer && (
        <div className="text-white flex justify-center items-center w-100">
          <span className="mr-3 flex">Winner:</span>
          <div
            className={classNameMap[winningPlayer]}
            style={{ margin: 0, height: "1.5em", width: "1.5em" }}
          />
        </div>
      )}
      <div className="board">
        {matrix.map((row, x) => {
          return (
            <div key={`row_${x}`} className="boardRow">
              {row.map((cell, y) => {
                return (
                  <div
                    key={`cell_${x}_${y}`}
                    className="boardCol cursor-pointer"
                    onClick={() => {
                      handleCellClick(x, y);
                    }}
                  >
                    <div className={classNameMap[cell]} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Board;

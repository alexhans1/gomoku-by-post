import { winningThreshhold } from "../constants";
import { Matrix, Player, Position } from "../interfaces";

const findStreak = (
  matrix: Matrix,
  originalPosition: Position,
  position: Position,
  arr: [Player, Position][],
  direction: Directions,
  checkOpposite = true
): [Player, Position][] => {
  const [newEntry, newPosition] = getNeighbor(matrix, position, direction);
  if (arr[0][0] === newEntry) {
    const newArr: [Player, Position][] = [...arr, [newEntry, newPosition]];
    if (newArr.length === winningThreshhold) {
      return newArr;
    }
    return findStreak(
      matrix,
      originalPosition,
      newPosition,
      newArr,
      direction,
      checkOpposite
    );
  }
  if (checkOpposite) {
    return findStreak(
      matrix,
      originalPosition,
      originalPosition,
      arr,
      oppositeDirections[direction],
      false
    );
  }
  return arr;
};

export const isGameOver = (
  matrix: Matrix,
  newField: Position
): [Player, Position[]] | undefined => {
  const [newX, newY] = newField;
  let initialStreak: [Player, Position][] = [
    [matrix[newX][newY], [newX, newY]],
  ];
  for (const direction in oppositeDirections) {
    const streak = findStreak(
      matrix,
      newField,
      newField,
      initialStreak,
      direction as Directions
    );
    if (streak.length === winningThreshhold) {
      return [streak[0][0], streak.map(([, pos]) => pos)];
    }
  }
  return undefined;
};

const directions = {
  top: [0, 1],
  topRight: [1, 1],
  right: [1, 0],
  bottomRight: [1, -1],
  bottom: [0, -1],
  bottomLeft: [-1, -1],
  left: [-1, 0],
  topLeft: [-1, 1],
};
const oppositeDirections = {
  top: "bottom",
  topRight: "bottomLeft",
  right: "left",
  bottomRight: "topLeft",
};
type Directions = keyof typeof directions;
const getNeighbor = (
  matrix: Matrix,
  pos: Position,
  direction: Directions
): [Player | undefined, Position] => {
  const dx = directions[direction][0];
  const dy = directions[direction][1];
  if (!matrix[pos[0] - dy]) return [null, null];
  return [matrix[pos[0] - dy][pos[1] + dx], [pos[0] - dy, pos[1] + dx]];
};

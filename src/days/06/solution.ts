import { grid } from '@lib/parsing';

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
} as const;

type Direction = typeof directions;
const nextDir: (keyof Direction)[] = ['up', 'right', 'down', 'left'];

const createRecord = (currentPos: [number, number]) => currentPos.join('-');

const createRecordWithDir = (currentPos: [number, number], direction: keyof Direction) =>
  [...currentPos, direction].join('-');

const isLooping = (pos: [number, number], direction: keyof Direction, visited: Set<string>) =>
  visited.has(createRecordWithDir(pos, direction));

const visit = (
  currentPos: [number, number],
  direction: keyof Direction,
  matrix: string[][],
  visited: Set<string>,
): Set<string> => {
  const [nextRow, nextCol] = [currentPos[0] + directions[direction][0], currentPos[1] + directions[direction][1]];
  const block = matrix[nextRow]?.[nextCol];

  return block
    ? block === '#'
      ? visit(currentPos, nextDir[(nextDir.indexOf(direction) + 1) % 4], matrix, visited)
      : visit([nextRow, nextCol], direction, matrix, visited.add(createRecord(currentPos)))
    : visited.add(createRecord(currentPos));
};

const matrixToString = (matrix: string[][]) => matrix.map((row) => row.join('')).join('\n');

const visitLoop = (
  currentPos: [number, number],
  direction: keyof Direction,
  matrix: string[][],
  visited: Set<string>,
): number => {
  const [nextRow, nextCol] = [currentPos[0] + directions[direction][0], currentPos[1] + directions[direction][1]];
  const block = matrix[nextRow]?.[nextCol];

  return isLooping(currentPos, direction, visited)
    ? 1
    : block
      ? block === '#' || block === '0'
        ? visitLoop(currentPos, nextDir[(nextDir.indexOf(direction) + 1) % 4], matrix, visited)
        : visitLoop([nextRow, nextCol], direction, matrix, visited.add(createRecordWithDir(currentPos, direction)))
      : 0;
};

export const part1 = (data: string) => {
  const matrix = grid(data);
  const row = matrix.findIndex((row) => row.some((char) => char === '^'));
  const col = matrix[row].findIndex((char) => char === '^');

  return visit([row, col], 'up', matrix, new Set()).size;
};

export const part2 = (data: string) => {
  const matrix = grid(data);
  const startRow = matrix.findIndex((row) => row.some((char) => char === '^'));
  const startCol = matrix[startRow].findIndex((char) => char === '^');

  const visited = visit([startRow, startCol], 'up', matrix, new Set());
  const visitedCoords = [...visited]
    .map((str) => str.split('-').slice(0, 2).map(Number))
    .filter(([row, col]) => !(row === startRow && col === startCol));

  return visitedCoords.reduce((count, [ri, ci]) => {
    matrix[ri][ci] = '0';
    count += visitLoop([startRow, startCol], 'up', matrix, new Set());
    matrix[ri][ci] = '.';
    return count;
  }, 0);
};

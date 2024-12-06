import { grid } from '@lib/parsing';

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
} as const;

type Direction = typeof directions;
const nextDir: (keyof Direction)[] = ['up', 'right', 'down', 'left'];

const visit = (
  currentPos: [number, number],
  direction: keyof Direction,
  matrix: string[][],
  visited: Set<string>,
): Set<string> => {
  console.log(currentPos, direction);

  const [nextRow, nextCol] = [currentPos[0] + directions[direction][0], currentPos[1] + directions[direction][1]];
  const block = matrix[nextRow]?.[nextCol];

  return block
    ? block === '#'
      ? visit(currentPos, nextDir[(nextDir.indexOf(direction) + 1) % 4], matrix, visited)
      : visit([nextRow, nextCol], direction, matrix, visited.add(currentPos.join('-')))
    : visited.add(currentPos.join('-'));
};

export const part1 = (data: string) => {
  const matrix = grid(data);
  const row = matrix.findIndex((row) => row.some((char) => char === '^'));
  const col = matrix[row].findIndex((char) => char === '^');

  return visit([row, col], 'up', matrix, new Set()).size;
};

export const part2 = (data: string) => {};

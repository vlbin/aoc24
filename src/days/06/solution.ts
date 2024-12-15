import { some } from '@fp-lib/array';
import { updateAt } from '@fp-lib/grid';
import { grid } from '@fp-lib/parsing';
import type { Grid } from '@fp-lib/types';

const directions = ['up', 'right', 'down', 'left'] as const;

type Direction = (typeof directions)[number];

const directionMap: Record<Direction, [number, number]> = {
    up: [-1, 0],
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
};

const getNextDir = (direction: Direction) => directions[(directions.indexOf(direction) + 1) % 4];

const createRecord = (currentPos: Readonly<[number, number]>) => currentPos.join('-');

const createRecordWithDir = (currentPos: Readonly<[number, number]>, direction: Direction) =>
    [...currentPos, direction].join('-');

const parseRecordWithDir = (record: string) => record.split('-').slice(0, 2).map(Number);

const isLooping = (pos: Readonly<[number, number]>, direction: Direction, visited: ReadonlySet<string>) =>
    visited.has(createRecordWithDir(pos, direction));

const visitedTiles = (
    [row, col]: Readonly<[number, number]>,
    direction: Direction,
    matrix: Grid<string>,
    visited: Readonly<Set<string>>,
): Set<string> => {
    const [rowMod, colMod] = directionMap[direction];
    const [nextRow, nextCol] = [row + rowMod, col + colMod];
    const nextTile = matrix[nextRow]?.[nextCol];

    if (!nextTile) return visited.add(createRecord([row, col]));

    return nextTile === '#'
        ? visitedTiles([row, col], getNextDir(direction), matrix, visited)
        : visitedTiles([nextRow, nextCol], direction, matrix, visited.add(createRecord([row, col])));
};

const loopCount = (
    [row, col]: Readonly<[number, number]>,
    direction: Direction,
    matrix: Grid<string>,
    visited: Readonly<Set<string>>,
): number => {
    const [rowMod, colMod] = directionMap[direction];
    const [nextRow, nextCol] = [row + rowMod, col + colMod];
    const nextTile = matrix[nextRow]?.[nextCol];

    if (!nextTile) {
        return 0;
    }

    if (isLooping([row, col], direction, visited)) {
        return 1;
    }

    return nextTile === '#'
        ? loopCount([row, col], getNextDir(direction), matrix, visited)
        : loopCount([nextRow, nextCol], direction, matrix, visited.add(createRecordWithDir([row, col], direction)));
};

const matrixWithBlock = (ri: number, ci: number, matrix: Grid<string>) => updateAt(ri, ci)(() => '#')(matrix);

export const part1 = (data: string) => {
    const matrix = grid(data);
    const row = matrix.findIndex((row) => row.some((char) => char === '^'));
    const col = matrix[row].findIndex((char) => char === '^');

    return visitedTiles([row, col], 'up', matrix, new Set()).size;
};

export const part2 = (data: string) => {
    const matrix = grid(data);
    const startRow = matrix.findIndex(some((char) => char === '^'));
    const startCol = matrix[startRow].findIndex((char) => char === '^');

    const visited = visitedTiles([startRow, startCol], 'up', matrix, new Set());
    const visitedCoords = [...visited]
        .map(parseRecordWithDir)
        .filter(([row, col]) => !(row === startRow && col === startCol));

    return visitedCoords.reduce((count, [ri, ci]) => {
        count += loopCount([startRow, startCol], 'up', matrixWithBlock(ri, ci, matrix), new Set());
        return count;
    }, 0);
};

import { coords } from '@lib/parsing';
import type { Coordinate } from '@lib/types';

type Coord = Coordinate<string>;

type Node = {
  row: number;
  col: number;
  value: number;
  children: Node[];
};

const isReachable = (r1: number, r2: number, c1: number, c2: number) =>
  (r1 === r2 && Math.abs(c1 - c2) === 1) || (c1 === c2 && Math.abs(r1 - r2) === 1);

const diff = (current: number, next: number) => current + 1 === next;

const findTrailHeads = (map: ReadonlyArray<Coord>): Node[] =>
  map.filter((pos) => pos[2] === '0').map(([row, col, value]) => ({ row, col, value: Number(value), children: [] }));

const buildTree = (path: ReadonlyArray<Coord>, node: Readonly<Node>): Node => {
  const possible = path.filter(([r, c, el]) => isReachable(r, node.row, c, node.col) && diff(node.value, Number(el)));

  const childNodes: Node[] = possible.map(([row, col, value]) => ({
    value: Number(value),
    row,
    col,
    children: [],
  }));

  return childNodes.length
    ? {
        ...node,
        children: childNodes.map((child) => buildTree(path, child)),
      }
    : node;
};

const printTree = ({ value, children, row, col }: Readonly<Node>): Omit<Node, 'children'>[] => {
  return [...(children.length ? children.flatMap(printTree) : [{ value, row, col }])];
};

export const part1 = (data: string) => {
  const map = coords(data);
  const trailHeads = findTrailHeads(map);

  return trailHeads.reduce((tot, head) => {
    const tree = buildTree(map, head);

    return (
      tot +
      new Set(
        printTree(tree)
          .filter((end) => end.value === 9)
          .map(({ row, col }) => `${row},${col}`),
      ).size
    );
  }, 0);
};

export const part2 = (data: string) => {
  const map = coords(data);
  const trailHeads = findTrailHeads(map);

  return trailHeads.reduce((tot, head) => {
    const tree = buildTree(map, head);

    return tot + printTree(tree).filter((end) => end.value === 9).length;
  }, 0);
};

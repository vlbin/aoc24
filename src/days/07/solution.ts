import type { BinaryFunction } from '@lib/types';
type NumericOp = BinaryFunction<number, number, number>;

const add: NumericOp = (a: number, b: number) => a + b;
const mul: NumericOp = (a: number, b: number) => a * b;
const concat: NumericOp = (a: number, b: number) => Number(`${a}${b}`);

type OpNode = {
  value: number;
  children?: OpNode[];
};

const addNum = (num: number, node: Readonly<OpNode>, ops: ReadonlyArray<NumericOp>): OpNode => {
  return {
    value: node.value,
    children: node.children
      ? node.children.map((child) => addNum(num, child, ops))
      : ops.map((op) => ({ value: op(node.value, num) })),
  };
};

const buildOpTree = (
  [num, ...nums]: ReadonlyArray<number>,
  root: Readonly<OpNode>,
  ops: ReadonlyArray<NumericOp>,
): OpNode => {
  return num === undefined ? root : buildOpTree(nums, addNum(num, root, ops), ops);
};

const printTree = ({ value, children }: Readonly<OpNode>): number[] => {
  return [...(children ? children.flatMap(printTree) : [value])];
};

const calibrationResult = (data: string, ops: ReadonlyArray<NumericOp>) => {
  const equations = data
    .split('\n')
    .map((eq) => eq.split(':'))
    .map(([ans, nums]) => [Number(ans), nums.trim().split(' ').map(Number)]) as ReadonlyArray<[number, number[]]>;

  const trees = equations.map(([ans, [num, ...nums]]) => [
    ans,
    buildOpTree(nums, { value: num }, ops),
  ]) as ReadonlyArray<[number, OpNode]>;

  return trees
    .map(([ans, tree]) => {
      const leaves = printTree(tree);
      const matching = leaves.find((leaf) => leaf === ans);
      return matching || 0;
    })
    .reduce((sum, leaf) => (sum += leaf), 0);
};

export const part1 = (data: string) => calibrationResult(data, [add, mul]);

export const part2 = (data: string) => calibrationResult(data, [add, mul, concat]);

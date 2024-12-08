import { range } from '@lib/array';

const add = (a: number, b: number) => a + b;
const mul = (a: number, b: number) => a * b;
const concat = (a: number, b: number) => Number(`${a}${b}`);

type OpNode = {
  value: number;
  left: OpNode | null;
  right: OpNode | null;
  center: OpNode | null;
};

const addNum = (num: number, node: OpNode): OpNode => {
  return {
    value: node.value,
    left: node.left ? addNum(num, node.left) : { value: mul(node.value, num), left: null, right: null, center: null },
    right: node.right
      ? addNum(num, node.right)
      : { value: add(node.value, num), left: null, right: null, center: null },
    center: node.center
      ? addNum(num, node.center)
      : { value: concat(node.value, num), left: null, right: null, center: null },
  };
};

const buildOpTree = ([num, ...nums]: number[], root: OpNode): OpNode => {
  return num === undefined ? root : buildOpTree(nums, addNum(num, root));
};

const getLeaves = (root: OpNode, leaves: number[] = []): number[] => {
  const left = root.left;
  const right = root.right;
  const center = root.center;

  const leftLeaves = left ? getLeaves(left, leaves) : [root.value];
  const rightLeaves = right ? getLeaves(right, leaves) : [root.value];
  const centerLeaves = center ? getLeaves(center, leaves) : [root.value];

  return [...leftLeaves, ...rightLeaves];
};

const printTree = ({ value, left, right, center }: OpNode): number[] => {
  return [
    ...(left === null ? [value] : []),
    ...(left ? printTree(left) : []),
    ...(right ? printTree(right) : []),
    ...(center ? printTree(center) : []),
  ];
};

export const part1 = (data: string) => {
  const equations = data
    .split('\n')
    .map((eq) => eq.split(':'))
    .map(([ans, nums]) => [Number(ans), nums.trim().split(' ').map(Number)]) as ReadonlyArray<[number, number[]]>;

  const trees = equations.map(([ans, [num, ...nums]]) => [
    ans,
    buildOpTree(nums, { value: num, left: null, right: null, center: null }),
  ]) as ReadonlyArray<[number, OpNode]>;

  return trees
    .map(([ans, tree]) => {
      const leaves = printTree(tree);
      const matching = leaves.find((leaf) => leaf === ans);
      return matching || 0;
    })
    .reduce((sum, leaf) => (sum += leaf), 0);

  // const maxCombos = Math.max(...equations.map(([_, nums]) => nums.length)) - 1;

  // // console.log(combos);

  // return equations.map(([ans, nums]) => {
  //   const combs = range(0, nums.length);
  //   const evals = combs.map((comb) => solve(nums, comb));
  //   return evals;
  // });
};

export const part2 = (data: string) => {};

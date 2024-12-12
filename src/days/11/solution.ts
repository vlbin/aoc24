import { map, range, sum } from '@lib/array';
import { spacedNumbers } from '@lib/parsing';
import { pipe } from '@lib/pipe';

type Node = {
  numVal: number;
  strVal: string;
  children: Node[];
};

const split = (stone: string) => [stone.slice(0, stone.length / 2), stone.slice(stone.length / 2)];

const transform = (node: Readonly<Node>): Node => {
  if (node.numVal === 0) {
    return {
      ...node,
      children: [
        {
          numVal: 1,
          strVal: '1',
          children: [],
        },
      ],
    };
  } else if (node.strVal.length % 2 === 0) {
    return {
      ...node,
      children: split(node.strVal).map((val) => ({
        numVal: Number(val),
        strVal: Number(val).toString(),
        children: [],
      })),
    };
  } else {
    const newVal = 2024 * node.numVal;
    return {
      ...node,
      children: [
        {
          numVal: newVal,
          strVal: newVal.toString(),
          children: [],
        },
      ],
    };
  }
};

const getNextKeys = (key: number) => {
  if (key === 0) return [1];
  else if (key.toString().length % 2 === 0) return split(key.toString()).map(Number);
  else return [key * 2024];
};

const leaves = (node: Readonly<Node>): Node[] => (node.children.length ? node.children.flatMap(leaves) : [node]);

export const part1 = (data: string) => {
  const stones: Node[] = spacedNumbers(data).map((num) => ({
    numVal: num,
    strVal: num.toString(),
    children: [],
  }));

  return range(0, 25).reduce((stones) => {
    const transformed = stones.map(transform);
    return transformed.flatMap(leaves);
  }, stones).length;
};

export const part2 = (data: string) => {
  const stones = spacedNumbers(data);

  const countMap = stones.reduce<Record<number, number>>((obj, stone) => {
    return {
      ...obj,
      [stone]: 1,
    };
  }, {});

  const finalMap = range(0, 75).reduce((map) => {
    const newKeys = Object.keys(map).flatMap((key) => getNextKeys(Number(key)));
    const newCounts = Object.entries(map).flatMap(([key, count]) => getNextKeys(Number(key)).map(() => count));

    return newKeys.reduce(
      (acc, key, idx) => ({
        ...acc,
        [key]: (acc[key] || 0) + newCounts[idx],
      }),
      {},
    );
  }, countMap);

  return Object.values(finalMap).reduce((tot, num) => tot + num, 0);
};

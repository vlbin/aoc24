import { map, sum, zip } from '../../lib/array';
import { pipe } from '../../lib/pipe';
import { split } from '../../lib/string';
import type { Tuple } from '../../lib/types';

const getLists = (data: string): Tuple<number[]> => {
  return data.split('\n').reduce<Tuple<number[]>>(
    ([list1, list2], pair) => {
      const [num1, num2] = pair.split('   ').map(Number);
      return [[...list1, num1].toSorted(), [...list2, num2].toSorted()];
    },
    [[], []],
  );
};

export const part1 = pipe(
  getLists,
  (pairs) => zip(...pairs),
  map(([a, b]) => Math.abs(a - b)),
  sum,
);

export const part2 = (data: string) => {
  const [list1, list2] = getLists(data);

  const countMap: Record<number, number> = {};

  return list1.reduce((acc, curr) => {
    const count = countMap[curr] ?? list2.filter((el) => el === curr).length;
    countMap[curr] = count;

    return acc + curr * count;
  }, 0);
};

import { count, map, sum, zip } from '@lib/array';
import { pipe } from '@lib/pipe';
import type { Tuple } from '@lib/types';

const getLists = (data: string): Tuple<number[]> =>
  data.split('\n').reduce<Tuple<number[]>>(
    ([list1, list2], pair) => {
      const [num1, num2] = pair.split('   ').map(Number);
      return [[...list1, num1].toSorted(), [...list2, num2].toSorted()];
    },
    [[], []],
  );
export const part1 = pipe(
  getLists,
  (pairs) => zip(...pairs),
  map(([a, b]) => Math.abs(a - b)),
  sum,
);

export const part2 = pipe(getLists, ([list1, list2]) => list1.map((key) => key * count(key)(list2)), sum);

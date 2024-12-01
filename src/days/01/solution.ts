import { sum } from '../../lib/array';

const getLists = (data: string) =>
  data.split('\n').reduce<number[][]>(
    ([list1, list2], pair) => {
      const [num1, num2] = pair.split('   ').map(Number);
      return [[...list1, num1].toSorted(), [...list2, num2].toSorted()];
    },
    [[], []],
  );

export const part1 = (data: string) => {
  const [list1, list2] = getLists(data);

  return sum(list1.map((el, index) => Math.abs(el - list2[index])));
};

export const part2 = (data: string) => {
  const [list1, list2] = getLists(data);

  const countMap: Record<number, number> = {};

  return list1.reduce((acc, curr) => {
    const count = countMap[curr] ?? list2.filter((el) => el === curr).length;
    countMap[curr] = count;

    return acc + curr * count;
  }, 0);
};

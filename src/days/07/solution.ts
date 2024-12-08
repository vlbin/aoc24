import { range } from '@lib/array';

const add = (a: number, b: number) => a + b;
const mul = (a: number, b: number) => a * b;

/*

0 = mul
1 = add

00 = mul mul = 0
01 = mul add = 1
10 = add mul = 2
11 = add add = 3

000 = mul mul mul = 0
001 = mul mul add = 1
001 = mul mul add = 1

*/

const ops = [mul, add];

const fromBin = (bits: number[]) =>
  bits.reduce((tot, bit, idx, bits) => {
    const pos = bits.length - idx - 1;
    return tot + Math.pow(2, pos) * bit;
  }, 0);

const toBin = (num: number, places: number, rest: number[] = []): string => {
  const val = Math.floor(num / 2);
  const rem = num % 2;

  return val === 0
    ? [...rest, rem].toReversed().join('').padStart(places, '0')
    : toBin(val, places, [...rest, num % 2]);
};

/*

6 = 110

6 / 2 = 3 (0)
3 / 2 = 1 (1)
1 / 2 = 0 (1)



*/

const solve = ([first, ...nums]: number[], comb: number) => {
  // console.log(comb, nums);

  return nums.reduce((tot, num, idx) => {
    return tot;
  }, first);
};

const combos = (places: number) => {
  const lines = range(0, Math.pow(2, places));

  return lines.map((line, i) => {
    return toBin(i, places)
      .split('')
      .map((val) => ops[Number(val)]);
  });

  console.log(lines);

  const placeList = range(0, Math.pow(2, places - 1)).map((line) => range(0, places));
  return placeList;
};

/*
[mul] 0
[add] 1


[0, 0]
[0, 1]
[1, 0]
[1, 1]

[0, 0, 0]
[0, 0, 1]
[0, 1, 0]
[1, 0, 0]


[mul,mul] 0 
[mul,add] 1
[add,mul] 2
[add,add] 3





*/

export const part1 = (data: string) => {
  // console.log(toBin(1)); // 001
  // console.log(toBin(2)); // 010
  // console.log(toBin(3)); // 011
  // console.log(toBin(4)); // 100
  // console.log(toBin(5)); // 101
  // console.log(toBin(6)); // 110
  // console.log(toBin(6)); // 110

  console.log(combos(3));
  // console.log(combos(2));

  // const equations = data
  //   .split('\n')
  //   .map((eq) => eq.split(':'))
  //   .map(([ans, nums]) => [Number(ans), nums.trim().split(' ').map(Number)]) as ReadonlyArray<[number, number[]]>;

  // const maxCombos = Math.max(...equations.map(([_, nums]) => nums.length)) - 1;

  // // console.log(combos);

  // return equations.map(([ans, nums]) => {
  //   const combs = range(0, nums.length);
  //   const evals = combs.map((comb) => solve(nums, comb));
  //   return evals;
  // });
};

export const part2 = (data: string) => {};

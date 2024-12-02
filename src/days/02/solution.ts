import { deleteAt, filter, length, map, zip } from '@lib/array';
import { numbers } from '@lib/parsing';
import { pipe } from '@lib/pipe';
import { split } from '@lib/string';

const isIncreasing = ([a, b]: number[]) => b - a > 0;

const createPairs = (report: number[]) =>
  isIncreasing(report) ? zip([null, ...report], report) : zip(report, [null, ...report]);

const isValid = (report: number[]): boolean =>
  createPairs(report).every(([a, b]) => b === null || a === null || (b - a > 0 && b - a <= 3));

const isValidRecurse = (report: number[], sliceIndex = -1): boolean =>
  sliceIndex > report.length - 1
    ? false
    : isValid(report.toSpliced(sliceIndex, 1)) || isValidRecurse(report, sliceIndex + 1);

const parse = pipe(split('\n'), map(numbers));

export const part1 = pipe(parse, filter(isValid), length);

export const part2 = pipe(
  parse,
  filter((report) => isValidRecurse(report)),
  length,
);

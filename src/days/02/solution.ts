import { filter, length, map, range, tail, zip } from '@lib/array';
import { numbers } from '@lib/parsing';
import { pipe } from '@lib/pipe';
import { split } from '@lib/string';

const isIncreasing = ([a, b]: ReadonlyArray<number>) => b - a > 0;

const createPairs = (report: ReadonlyArray<number>) =>
  isIncreasing(report) ? zip(report, tail(report)) : zip(tail(report), report);

const isValid = (report: readonly number[]): boolean => createPairs(report).every(([a, b]) => b - a > 0 && b - a <= 3);

const isValidRecurse = (report: readonly number[]): boolean =>
  range(0, report.length).some((i) => isValid(report.toSpliced(i, 1)));

const parse = pipe(split('\n'), map(numbers));

export const part1 = pipe(parse, filter(isValid), length);

export const part2 = pipe(parse, filter(isValidRecurse), length);

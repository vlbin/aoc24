import { zip } from '@lib/array';

const isValid = (report: number[]): boolean => {
  const isIncreasing = report[1] - report[0] > 0;
  const pairs = isIncreasing ? zip([null, ...report], report) : zip(report, [null, ...report]);

  return pairs.every(([a, b]) => b === null || a === null || (b - a > 0 && b - a <= 3));
};

const isValidRecurse = (report: number[], sliceIndex = -1): boolean =>
  sliceIndex > report.length - 1
    ? false
    : isValid(report.filter((_, i) => i !== sliceIndex)) || isValidRecurse(report, sliceIndex + 1);

export const part1 = (data: string) => {
  const reports = data.split('\n').map((line) => line.split(' ').map(Number));
  return reports.filter((report) => isValid(report)).length;
};

export const part2 = (data: string) => {
  const reports = data.split('\n').map((line) => line.split(' ').map(Number));
  return reports.filter((report) => isValidRecurse(report)).length;
};

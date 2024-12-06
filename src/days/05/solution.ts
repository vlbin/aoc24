import { sum } from '@lib/array';

export const getRules = (_rules: string) =>
  _rules
    .split('\n')
    .map((line) => line.split('|').map(Number))
    .reduce<Record<number, Set<number>>>((reqs, [a, b]) => {
      return {
        ...reqs,
        [b]: new Set(reqs[b] || []).add(a),
      };
    }, {});

const middleSum = (lines: number[][]) => sum(lines.map((line) => line[Math.floor(line.length / 2)]));

export const part1 = (data: string) => {
  const [_rules, _updates] = data.split('\n\n');

  const rules = getRules(_rules);

  const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

  const valid = updates.filter((update) => {
    return update.every((el, i) => {
      const before = rules[el] || [];
      const rest = update.slice(i);

      return !rest.some((elAfter) => before.has(elAfter));
    });
  });
  return middleSum(valid);
};

export const part2 = (data: string) => {
  const [_rules, _updates] = data.split('\n\n');

  const rules = getRules(_rules);

  const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

  const invalid = updates.filter((update) =>
    update.some((el, i) => {
      const before = rules[el] || [];
      const rest = update.slice(i);

      return rest.some((elAfter) => before.has(elAfter));
    }),
  );

  const sorted = invalid.map((update) =>
    update.toSorted((a, b) => {
      const beforeA = rules[a] || [];

      return beforeA.has(b) ? 1 : -1;
    }),
  );

  return middleSum(sorted);
};

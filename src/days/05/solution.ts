import { sum } from '@lib/array';

export const getRules = (_rules: string) =>
  _rules
    .split('\n')
    .map((line) => line.split('|').map(Number))
    .reduce<Record<number, number[]>>((reqs, [a, b]) => {
      return {
        ...reqs,
        [b]: (reqs[b] || []).concat(a),
      };
    }, {});

export const part1 = (data: string) => {
  const [_rules, _updates] = data.split('\n\n');

  const rules = getRules(_rules);

  const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

  const valid = updates.filter((update) => {
    return update.every((el, i) => {
      const before = rules[el] || [];
      const rest = update.slice(i);

      return !rest.some((elAfter) => before.includes(elAfter));
    });
  });
  return sum(valid.map((line) => line[Math.floor(line.length / 2)]));
};

export const part2 = (data: string) => {
  const [_rules, _updates] = data.split('\n\n');

  const rules = getRules(_rules);

  const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

  const invalid = updates.filter((update) => {
    return update.some((el, i) => {
      const before = rules[el] || [];
      const rest = update.slice(i);

      return rest.some((elAfter) => before.includes(elAfter));
    });
  });

  const sorted = invalid.map((update) => {
    return update.toSorted((a, b) => {
      const beforeA = rules[a] || [];

      return beforeA.includes(b) ? 1 : -1;
    });
  });

  return sum(sorted.map((line) => line[Math.floor(line.length / 2)]));
};

import { sum } from '@lib/array';

export const getRules = (_rules: string) =>
  _rules
    .split('\n')
    .map((line) => line.split('|').map(Number))
    .reduce<{ before: Record<number, number[]>; after: Record<number, number[]> }>(
      (reqs, [a, b]) => {
        return {
          before: {
            ...reqs.before,
            [b]: (reqs.before[b] || []).concat(a),
          },
          after: {
            ...reqs.after,
            [a]: (reqs.after[a] || []).concat(b),
          },
        };
      },
      { before: {}, after: {} },
    );

export const part1 = (data: string) => {
  const [_rules, _updates] = data.split('\n\n');

  const rules = getRules(_rules);

  const updates = _updates.split('\n').map((line) => line.split(',').map(Number));

  const valid = updates.filter((update) => {
    return update.every((el, i) => {
      const before = rules.before[el] || [];
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
      const before = rules.before[el] || [];
      const rest = update.slice(i);

      return rest.some((elAfter) => before.includes(elAfter));
    });
  });

  return invalid.map((update) => {
    return update.toSorted((a, b) => {
      const beforeA = rules.before[a] || [];
      const beforeB = rules.before[b] || [];

      console.log(update, a, beforeA);

      return 0;
    });
  });
};

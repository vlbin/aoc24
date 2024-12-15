const solve = (xt: number, yt: number, x1: number, x2: number, y1: number, y2: number): [number, number] | null => {
  const b = (x1 * yt - y1 * xt) / (y2 * x1 - x2 * y1);
  const a = (xt - b * x2) / x1;

  return Number.isInteger(a) && Number.isInteger(b) ? [a, b] : null;
};

const parse = (data: string) => {
  return data.split('\n\n').map((equation) => {
    const [eq1, eq2, target] = equation.split('\n');

    const [x1, y1] = [eq1.slice(eq1.indexOf('+') + 1, eq1.indexOf(',')), eq1.slice(eq1.lastIndexOf('+') + 1)].map(
      Number,
    );
    const [x2, y2] = [eq2.slice(eq2.indexOf('+') + 1, eq2.indexOf(',')), eq2.slice(eq2.lastIndexOf('+') + 1)].map(
      Number,
    );

    const [xt, yt] = [
      target.slice(target.indexOf('=') + 1, target.indexOf(',')),
      target.slice(target.lastIndexOf('=') + 1),
    ].map(Number);

    return [x1, x2, y1, y2, xt, yt];
  });
};

export const part1 = (data: string) => {
  const aCost = 3;
  const bCost = 1;

  const eqs = parse(data);

  return (
    eqs
      .map(([x1, x2, y1, y2, xt, yt]) => {
        return solve(xt, yt, x1, x2, y1, y2);
      })
      .filter(Boolean) as [number, number][]
  ).reduce((tot, [a, b]) => tot + (a * aCost + b * bCost), 0);
};

export const part2 = (data: string) => {
  const aCost = 3;
  const bCost = 1;

  const eqs = parse(data);

  return (
    eqs
      .map(([x1, x2, y1, y2, xt, yt]) => {
        return solve(xt + 10000000000000, yt + 10000000000000, x1, x2, y1, y2);
      })
      .filter(Boolean) as [number, number][]
  ).reduce((tot, [a, b]) => tot + (a * aCost + b * bCost), 0);
};

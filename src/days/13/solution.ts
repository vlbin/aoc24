const solve = (
  xt: number,
  yt: number,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  b: number,
): [number, number] | null => {
  const a1 = (xt - x2 * b) / x1;
  const a2 = (yt - y2 * b) / y1;

  if (a1 === a2) return [a1, b];

  if (b > 160) {
    return null;
  }

  return solve(xt, yt, x1, x2, y1, y2, b + 1);
};

/*



a = (XT - X2 * b) / X1

YT = Y1 * ((XT - X2 * b) / X1) + Y2 * b
Y2 * b = YT - Y1 * ((XT - X2 * b) / X1)
Y2 * b = YT - ((Y1*XT - Y1*X2 * Y1*b) / X1)
X1 * Y2 * b - X1 * YT = -(Y1*XT - Y1*X2 * Y1*b)
X1 * YT - X1 * Y2 * b - Y1*XT= - Y1*X2 * Y1*b











*/

const solve2 = (xt: number, yt: number, x1: number, x2: number, y1: number, y2: number): [number, number] | null => {
  const a1 = (xt - x2 * b) / x1;
  const a2 = (yt - y2 * b) / y1;

  if (a1 === a2) return [a1, b];

  if (b > 160) {
    return null;
  }

  return solve(xt, yt, x1, x2, y1, y2, b + 1);
};

export const part1 = (data: string) => {
  const aCost = 3;
  const bCost = 1;
  const eqs = data
    .split('\n\n')
    .map((equation) => {
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

      return solve(xt, yt, x1, x2, y1, y2, 0);
    })
    .filter(Boolean) as [number, number][];

  return eqs.reduce((tot, [a, b]) => tot + (a * aCost + b * bCost), 0);
};

export const part2 = (data: string) => {};

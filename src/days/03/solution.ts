const findStart = (key: string) => (seq: string) => seq.indexOf(key);

const isValidMul = (mul: string) =>
  mul.indexOf('(') === 3 &&
  mul
    .slice(4, -1)
    .split(',')
    .map(Number)
    .every((x) => x < 1000 && !isNaN(x));

const evalMul = (mul: string) =>
  mul
    .slice(4, -1)
    .split(',')
    .map(Number)
    .reduce((acc, curr) => acc * curr, 1);

const parseMul = (startIndex: number, seq: string, muls: string[]): [string[], string] => {
  const offset = startIndex + 'mul('.length;
  const endIndex = seq.slice(startIndex + 'mul('.length).indexOf(')') + offset + 1;
  const slice = seq.slice(startIndex, endIndex);
  return slice && isValidMul(slice) ? [[...muls, slice], seq.slice(endIndex)] : [muls, seq.slice(4)];
};

const parseMuls = (muls: string[], seq: string): string[] => {
  const nextMul = findStart('mul(')(seq);

  return nextMul > -1 ? parseMuls(...parseMul(nextMul, seq, muls)) : muls;
};

const parseProgram = (isEnabled: boolean, muls: string[], seq: string) => {
  return isEnabled ? {} : {};
};

export const part1 = (data: string) => parseMuls([], data).reduce((acc, curr) => acc + evalMul(curr), 0);

export const part2 = (data: string) => {};

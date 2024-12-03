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

const parseMulsWithInterrupt = (
  muls: string[],
  seq: string,
  isEnabled: boolean,
  interruptor: string,
  resetter: string,
): string[] => {
  const nextMul = findStart('mul(')(seq);
  const nextInt = interruptor ? findStart(interruptor)(seq) : -1;

  const hasNextInt = nextInt > -1 && nextInt < nextMul;

  return hasNextInt
    ? parseMulsWithInterrupt(muls, seq.slice(nextInt + interruptor.length), !isEnabled, resetter, interruptor)
    : nextMul > -1
      ? isEnabled
        ? parseMulsWithInterrupt(...parseMul(nextMul, seq, muls), isEnabled, interruptor, resetter)
        : parseMulsWithInterrupt(muls, parseMul(nextMul, seq, muls)[1], isEnabled, interruptor, resetter)
      : muls;
};

const parseProgram = (seq: string) => {
  return parseMulsWithInterrupt([], seq, true, "don't()", 'do()').reduce((acc, curr) => acc + evalMul(curr), 0);
};

export const part1 = (data: string) => parseMuls([], data).reduce((acc, curr) => acc + evalMul(curr), 0);

export const part2 = (data: string) => parseProgram(data);

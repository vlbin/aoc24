const findNext = (instr: string) => (seq: string) => seq.indexOf(instr);

const readArgs = (instr: string) =>
  instr
    .slice(instr.indexOf('(') + 1, -1)
    .split(',')
    .map(Number);

const isValidMul = (mul: string) => mul.indexOf('(') === 3 && readArgs(mul).every((x) => x < 1000 && !isNaN(x));

const evalMul = (mul: string) => readArgs(mul).reduce((acc, curr) => acc * curr, 1);

const parseInstr = (
  instr: string,
  startIndex: number,
  seq: string,
  muls: readonly string[],
): [readonly string[], string] => {
  const offset = startIndex + instr.length + 1;
  const endIndex = seq.slice(startIndex + 'mul'.length + 1).indexOf(')') + offset + 1;
  const slice = seq.slice(startIndex, endIndex);
  return slice && isValidMul(slice) ? [[...muls, slice], seq.slice(endIndex)] : [muls, seq.slice(4)];
};

const parseInstrs = (muls: readonly string[], seq: string): readonly string[] => {
  const nextMul = findNext('mul')(seq);
  return nextMul > -1 ? parseInstrs(...parseInstr('mul', nextMul, seq, muls)) : muls;
};

const parseMulsWithInterrupt = (
  muls: readonly string[],
  seq: string,
  isEnabled: boolean,
  interruptor: string,
  resetter: string,
): readonly string[] => {
  const nextMul = findNext('mul')(seq);
  const nextInt = findNext(interruptor)(seq);

  const hasNextInt = nextInt > -1 && nextInt < nextMul;

  return hasNextInt
    ? parseMulsWithInterrupt(muls, seq.slice(nextInt + interruptor.length), !isEnabled, resetter, interruptor)
    : nextMul > -1
      ? isEnabled
        ? parseMulsWithInterrupt(...parseInstr('mul', nextMul, seq, muls), isEnabled, interruptor, resetter)
        : parseMulsWithInterrupt(muls, parseInstr('mul', nextMul, seq, muls)[1], isEnabled, interruptor, resetter)
      : muls;
};

export const part1 = (data: string) => parseInstrs([], data).reduce((acc, curr) => acc + evalMul(curr), 0);

export const part2 = (data: string) =>
  parseMulsWithInterrupt([], data, true, "don't()", 'do()').reduce((acc, curr) => acc + evalMul(curr), 0);

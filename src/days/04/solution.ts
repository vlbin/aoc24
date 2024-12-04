const reverse = (arg: string) => arg.split('').toReversed().join('');

const columns = (data: string[]) =>
  data.reduce(
    (cols, line) => cols.map((col, i) => col.concat(line[i])),
    Array.from({ length: data[0].length }, () => ''),
  );

const diagonalForward = (data: string[], colIndex: number) =>
  [data[0][colIndex], data[1][colIndex + 1], data[2][colIndex + 2], data[3][colIndex + 3]].join('');

const diagonalBackward = (data: string[], colIndex: number) =>
  [data[0][colIndex + 3], data[1][colIndex + 2], data[2][colIndex + 1], data[3][colIndex]].join('');

const occurences = (line: string) => (word: string) =>
  line.split('').reduce((count, _, i, letters) => {
    const slice = letters.slice(i, i + word.length).join('');

    return count + (slice === word || reverse(slice) === word ? 1 : 0);
  }, 0);

const searchLines = (lines: string[]) => (word: string) =>
  lines.reduce((count, line) => count + occurences(line)(word), 0);

export const part1 = (data: string) => {
  const rows = data.split('\n');

  const diags = rows.reduce<string[]>((diags, row, rowIndex) => {
    return rowIndex + 4 > rows.length
      ? diags
      : diags.concat(
          ...row
            .split('')
            .flatMap((_, colIndex) => [
              diagonalForward(rows.slice(rowIndex, rowIndex + 4), colIndex),
              diagonalBackward(rows.slice(rowIndex, rowIndex + 4), colIndex),
            ]),
        );
  }, []);

  const diagCount = diags.reduce((count, diag) => count + (diag === 'XMAS' || reverse(diag) === 'XMAS' ? 1 : 0), 0);

  return searchLines([...rows, ...columns(rows)])('XMAS') + diagCount;
};

export const part2 = (data: string) => {};

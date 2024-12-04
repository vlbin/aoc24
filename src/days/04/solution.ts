import { range } from '@lib/array';

const reverse = (arg: string) => arg.split('').toReversed().join('');

const columns = (data: string[]) =>
  data.reduce(
    (cols, line) => cols.map((col, i) => col.concat(line[i])),
    Array.from({ length: data[0].length }, () => ''),
  );

const diagonalForward = (data: string[], colIndex: number, length: number) =>
  range(0, length)
    .map((i) => data[i][colIndex + i])
    .join('');

const diagonalBackward = (data: string[], colIndex: number, length: number) =>
  range(0, length)
    .map((i) => data[i][colIndex - i])
    .join('');

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
              diagonalForward(rows.slice(rowIndex, rowIndex + 4), colIndex, 4),
              diagonalBackward(rows.slice(rowIndex, rowIndex + 4), colIndex, 4),
            ]),
        );
  }, []);

  const diagCount = diags.reduce((count, diag) => count + (diag === 'XMAS' || reverse(diag) === 'XMAS' ? 1 : 0), 0);

  return searchLines([...rows, ...columns(rows)])('XMAS') + diagCount;
};

export const part2 = (data: string) => {
  const rows = data.split('\n');

  return rows.reduce((count, row, rowIndex) => {
    const as = (
      row
        .split('')
        .map((el, colIndex) => (el === 'A' ? [rowIndex, colIndex] : null))
        .filter(Boolean) as Array<[number, number]>
    ).filter(
      ([rowIndex, colIndex]) => rowIndex > 0 && colIndex > 0 && rowIndex < rows.length - 1 && colIndex < row.length - 1,
    );

    return (
      count +
      as.filter(([rowIndex, colIndex]) => {
        const forward = diagonalForward(rows.slice(rowIndex - 1, rowIndex + 2), colIndex - 1, 3);
        const backward = diagonalBackward(rows.slice(rowIndex - 1, rowIndex + 2), colIndex + 1, 3);

        return ['MAS', 'SAM'].includes(forward) && ['MAS', 'SAM'].includes(backward);
      }).length
    );
  }, 0);
};

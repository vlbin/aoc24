import { map, range } from '@fp-lib/array';
import { pipe } from '@fp-lib/pipe';
import { split } from '@fp-lib/string';

const reverse = (arg: string) => arg.split('').toReversed().join('');

const columns = (data: readonly string[]) =>
    data.reduce(
        (cols, line) => cols.map((col, i) => col.concat(line[i])),
        Array.from({ length: data[0].length }, () => ''),
    );

const diagonalForward = (data: readonly string[], colIndex: number, length: number) =>
    range(0, length)
        .map((i) => data[i][colIndex + i])
        .join('');

const diagonalBackward = (data: readonly string[], colIndex: number, length: number) =>
    range(0, length)
        .map((i) => data[i][colIndex - i])
        .join('');

const occurences = (line: string) => (word: string) =>
    line.split('').reduce((count, _, i, letters) => {
        const slice = letters.slice(i, i + word.length).join('');

        return count + (slice === word || reverse(slice) === word ? 1 : 0);
    }, 0);

const searchLines = (lines: readonly string[]) => (word: string) =>
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

const checkWord = (word: string) => ['MAS', 'SAM'].includes(word);

export const part2 = (data: string) => {
    const matrix = pipe(split('\n'), map(split('')))(data);

    const as = matrix
        .flatMap((line, ri) => line.map((el, ci) => (el === 'A' ? [ri, ci] : [-1, -1])))
        .filter(([ri, ci]) => ri > 0 && ci > 0 && ri < matrix.length - 1 && ci < matrix[0].length - 1);

    return as.filter(
        ([ri, ci]) =>
            checkWord(`${matrix[ri - 1][ci - 1]}${matrix[ri][ci]}${matrix[ri + 1][ci + 1]}`) &&
            checkWord(`${matrix[ri - 1][ci + 1]}${matrix[ri][ci]}${matrix[ri + 1][ci - 1]}`),
    ).length;
};

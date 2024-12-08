import { range } from '@lib/array';
import { coords } from '@lib/parsing';

export const part1 = (data: string) => {
  const grid = coords(data);
  const nRows = data.split('\n').map((line) => line.length).length;
  const nCols = data.split('\n').find((line) => line.length)?.length ?? 0;
  const antennaLocations = grid.reduce<Record<string, [number, number][]>>((acc, [ri, ci, el]) => {
    return el === '.'
      ? acc
      : {
          ...acc,
          [el]: (acc[el] || []).concat([[ri, ci]]),
        };
  }, {});

  return new Set(
    Object.values(antennaLocations)
      .flatMap((locations) => {
        const pairs = locations
          .flatMap((a) => locations.map((b) => [a, b]))
          .filter(([[ay, ax], [by, bx]]) => !(ay === by && ax === bx));

        return pairs
          .map(([a, b]) => {
            const rowDiff = b[0] - a[0];
            const colDiff = b[1] - a[1];

            return [a[0] - rowDiff, a[1] - colDiff];
          })
          .filter(([r, c]) => {
            return r >= 0 && c >= 0 && r < nRows && c < nCols;
          });
      })
      .map((x) => x.join('-')),
  ).size;
};

export const part2 = (data: string) => {
  const grid = coords(data);
  const nRows = data.split('\n').filter((l) => l.length).length;
  const nCols = data.split('\n').find((line) => line.length)?.length ?? 0;
  const antennaLocations = grid.reduce<Record<string, [number, number][]>>((acc, [ri, ci, el]) => {
    return el === '.'
      ? acc
      : {
          ...acc,
          [el]: (acc[el] || []).concat([[ri, ci]]),
        };
  }, {});

  return new Set(
    Object.values(antennaLocations)
      .flatMap((locations) => {
        const pairs = locations
          .flatMap((a) => locations.map((b) => [a, b]))
          .filter(([[ay, ax], [by, bx]]) => !(ay === by && ax === bx));

        return pairs
          .flatMap(([a, b]) => {
            const rowDiff = b[0] - a[0];
            const colDiff = b[1] - a[1];

            return [...range(0, Math.max(nCols, nRows)).map((i) => [a[0] - rowDiff * i, a[1] - colDiff * i])];
          })
          .filter(([r, c]) => {
            return r >= 0 && c >= 0 && r < nRows && c < nCols;
          });
      })
      .map((x) => x.join('-')),
  ).size;
};

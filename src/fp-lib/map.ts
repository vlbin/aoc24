export const CoordMap = {
  hash: (ri: number, ci: number) => `${ri},${ci}`,
  fromHash: (hash: string) => hash.split(',').map(Number),
  from: <T>(input: string, defaultValue: (element: string) => T) =>
    (
      input.split('\n').flatMap((row, ri) => row.split('').map((el, ci) => [ri, ci, el])) as [number, number, string][]
    ).reduce<Map<string, T>>(
      (map, [ri, ci, el]) => map.set(CoordMap.hash(ri, ci), defaultValue(el.toString())),
      new Map(),
    ),
};

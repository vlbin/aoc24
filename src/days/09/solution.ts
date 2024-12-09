import { range, updateAt } from '@lib/array';

const replicate = (value: string, times: number) => range(0, times).map((_) => value);

const blocks = (map: ReadonlyArray<string>) =>
  map.reduce(
    ({ id, map }, el, idx) =>
      idx % 2 === 0
        ? {
            id: id + 1,
            map: map.concat(replicate(id.toString(), Number(el))),
          }
        : { id: id, map: map.concat(replicate('.', Number(el))) },
    { id: 0, map: [] as string[] },
  );

const blocksGrouped = (map: ReadonlyArray<string>) =>
  map.reduce(
    ({ id, map }, el, idx) =>
      idx % 2 === 0
        ? {
            id: id + 1,
            map: map.concat([replicate(id.toString(), Number(el))]),
          }
        : { id: id, map: map.concat([replicate('.', Number(el))]) },
    { id: 0, map: [] as string[][] },
  );

const compress = (
  blocks: ReadonlyArray<string>,
  reordered: ReadonlyArray<string>,
  idx: number,
  targetLength: number,
): ReadonlyArray<string> => {
  if (reordered.length === targetLength) return reordered;

  const lastBlock = blocks.at(-1)!;
  const value = blocks[idx];

  if (lastBlock === '.') return compress(blocks.slice(0, -1), reordered, idx, targetLength);
  if (value === '.') return compress(blocks.slice(0, -1), reordered.concat(lastBlock), idx + 1, targetLength);

  return compress(blocks, reordered.concat(value), idx + 1, targetLength);
};

export const part1 = (data: string) => {
  const fileblocks = blocks(data.split('')).map;

  const targetLength = fileblocks.filter((block) => block !== '.').length;

  const compressed = compress(fileblocks, [], 0, targetLength);

  return compressed.reduce((acc, el, idx) => (el === '.' ? acc : acc + Number(el) * idx), 0);
};

export const part2 = (data: string) => {
  const fileblocks = blocksGrouped(data.split('')).map.filter((group) => group.length);

  const reversed = fileblocks.toReversed();
  const reordered = reversed.reduce((reordered, group) => {
    const firstFitting = fileblocks.findIndex((free) => free[0] === '.' && free.length >= group.length);

    if (firstFitting === -1) {
      return reordered;
    }

    return updateAt(firstFitting)(() => group.join('').padEnd(reordered[firstFitting].length, '.').split(''))(
      reordered,
    );
  }, fileblocks as string[][]);

  console.log(reordered);

  return;
};

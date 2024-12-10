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

const reorder = (blocks: ReadonlyArray<string[]>, idx: number, moved: Set<string>) => {
  if (idx < 0) {
    return blocks;
  }
  const block = blocks[idx];
  const firstFitting = blocks.findIndex((el, idx2) => el[0] === '.' && el.length >= block.length && idx2 < idx);

  if (block.includes('.') || firstFitting === -1 || moved.has(block[0]))
    return reorder(blocks, idx - 1, moved.add(block[0]));

  const freeLength = blocks[firstFitting].length;
  const padding = range(0, freeLength - block.length).map((_) => '.');

  const withBlock = updateAt(firstFitting)(() => block)(blocks);
  const withDots = updateAt(idx)(() => replicate('.', block.length))(withBlock);
  const withPadding = padding.length
    ? [...withDots.slice(0, firstFitting + 1), padding, ...withDots.slice(firstFitting + 1)]
    : withDots;

  return reorder(withPadding, idx - 1, moved.add(block[0]));
};

export const part1 = (data: string) => {
  const fileblocks = blocks(data.split('')).map;

  const targetLength = fileblocks.filter((block) => block !== '.').length;

  const compressed = compress(fileblocks, [], 0, targetLength);

  return compressed.reduce((acc, el, idx) => (el === '.' ? acc : acc + Number(el) * idx), 0);
};

export const part2 = (data: string) => {
  const fileblocks = blocksGrouped(data.split('')).map.filter((group) => group.length);

  console.log(fileblocks.flat());

  const reversed = reorder(fileblocks, fileblocks.length - 1, new Set()).flat();

  console.log(
    reversed.slice(0, 60).reduce((acc, el, idx) => {
      if (el !== '.') {
        console.log(['id', Number(el), 'pos', idx, 'acc', acc + Number(el) * idx]);
      }

      return el === '.' ? acc : acc + Number(el) * idx;
    }, 0),
  );

  return reversed.reduce((acc, el, idx) => (el === '.' ? acc : acc + Number(el) * idx), 0);
};

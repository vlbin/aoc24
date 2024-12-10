import { range } from '@lib/array';

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

const reorder = (blocks: ReadonlyArray<string>, idx: number, moved: Readonly<Set<string>>) => {
  if (idx < 0) return blocks;

  const id = blocks[idx];

  if (id === '.' || moved.has(id)) return reorder(blocks, idx - 1, moved);

  const startIdx = blocks.findIndex((el, i) => i <= idx && el === id && el !== '.');
  const block = blocks.slice(startIdx, idx + 1);

  const size = block.length;
  const dots = replicate('.', size);

  const moveTo = blocks.findIndex(
    (el, doti) => el === '.' && blocks.slice(doti, doti + size).every((el) => el === '.'),
  );

  if (moveTo === -1 || moveTo >= startIdx || !block.length) {
    return reorder(blocks, idx - Math.max(1, size), moved.add(id));
  }

  const withMovedFile = [...blocks.slice(0, moveTo), ...block, ...blocks.slice(moveTo + size)];
  const withDots = [...withMovedFile.slice(0, startIdx), ...dots, ...blocks.slice(startIdx + size)];

  return reorder(withDots, idx - 1, moved.add(id));
};

const checksum = (files: ReadonlyArray<string>) =>
  files.reduce((acc, el, idx) => (el === '.' ? acc : acc + Number(el) * idx), 0);

export const part1 = (data: string) => {
  const fileblocks = blocks(data.split('')).map;

  const targetLength = fileblocks.filter((block) => block !== '.').length;

  const compressed = compress(fileblocks, [], 0, targetLength);

  return checksum(compressed);
};

export const part2 = (data: string) => {
  const fileblocks = blocks(data.split('')).map;

  const ordered = reorder(fileblocks, fileblocks.length - 1, new Set());

  return checksum(ordered);

  // console.log(
  //   ordered.slice(0, 60).reduce((acc, el, idx) => {
  //     if (el !== '.') {
  //       console.log(['id', Number(el), 'pos', idx, 'acc', acc + Number(el) * idx]);
  //     }

  //     return el === '.' ? acc : acc + Number(el) * idx;
  //   }, 0),
  // );

  return;
};

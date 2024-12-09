const blocks = (map: ReadonlyArray<string>) =>
  map.reduce(
    ({ id, map }, el, idx) =>
      idx % 2 === 0
        ? { id: id + 1, map: map.concat(''.padStart(Number(el), id.toString())) }
        : { id: id, map: map.concat(''.padStart(Number(el), '.')) },
    { id: 0, map: '' },
  );

const isReordered = (blocks: string, targetLength: number) =>
  blocks.slice(blocks.indexOf('.')).length === blocks.length - targetLength;

const compress = (blocks: string, reordered: string, idx: number, targetLength: number): string => {
  if (isReordered(reordered, targetLength)) return reordered;

  const lastBlock = blocks.slice(-1);

  if (lastBlock === '.') return compress(blocks.slice(0, -1), reordered, idx, targetLength);

  if (blocks[idx] === '.') return compress(blocks.slice(0, -1), reordered.concat(lastBlock), idx + 1, targetLength);

  return compress(blocks, reordered.concat(blocks[idx]), idx + 1, targetLength);
};

export const part1 = (data: string) => {
  const fileblocks = blocks(data.split('')).map;
  const targetLength = fileblocks.split('').filter((block) => block !== '.').length;

  const compressed = compress(fileblocks, '', 0, targetLength);

  return compressed.split('').reduce((acc, el, idx) => acc + Number(el) * idx, 0);
};

export const part2 = (data: string) => {};

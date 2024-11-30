import { mkdirSync } from 'node:fs';
import template from './template';

const basePath = 'src/days';

const url = 'https://adventofcode.com/2024/day';
const day = Bun.argv[2] ? Number(Bun.argv[2]) : new Date().getDate();
const padded = day < 10 ? '0' + day : day;

const getInputData = (day: number) =>
  fetch(`${url}/${day}/input`).then((res) => res.text());

mkdirSync(`${basePath}/${padded}`);

Bun.write(`${basePath}/${padded}/test.txt`, '');

getInputData(day).then((data) => {
  Bun.write(`${basePath}/${padded}/input.txt`, data);
});

Bun.write(`${basePath}/${padded}/solution.ts`, template);

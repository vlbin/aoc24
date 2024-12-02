import { mkdirSync } from 'node:fs';
import template from './template';

const basePath = 'src/days';

const day = Bun.argv[2] ? Number(Bun.argv[2]) : new Date().getDate();
const padded = day < 10 ? '0' + day : day;

mkdirSync(`${basePath}/${padded}`);

Bun.write(`${basePath}/${padded}/test`, '');
Bun.write(`${basePath}/${padded}/input`, '');

Bun.write(`${basePath}/${padded}/solution.ts`, template);

export const numbers = (line: string) => line.split(' ').map(Number);

export const grid = (data: string) => data.split('\n').map((line) => line.split(''));

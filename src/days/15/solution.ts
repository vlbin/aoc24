const up = (map: string[][], position: [number, number]) => {
    const [pr, pc] = position;
    const moveQueue: [number, number][] = [[pr, pc]];

    for (let r = pr - 1; r >= 0; r--) {
        const el = map[r][pc];
        if (el === '#') {
            return;
        } else if (el === '.') {
            let [tmpr, tmpc] = [r, pc];
            while (moveQueue.length) {
                const [movr, movc] = moveQueue.pop()!;
                map[tmpr][tmpc] = map[movr][movc];

                tmpr = movr;
                tmpc = movc;
            }

            position[0] = pr - 1;
            map[tmpr][tmpc] = '.';

            return;
        } else if (el === 'O') {
            moveQueue.push([r, pc]);
        }
    }
};

const down = (map: string[][], position: [number, number]) => {
    const [pr, pc] = position;
    const moveQueue: [number, number][] = [[pr, pc]];

    for (let r = pr + 1; r < map.length; r++) {
        const el = map[r][pc];
        if (el === '#') {
            return;
        } else if (el === '.') {
            let [tmpr, tmpc] = [r, pc];
            while (moveQueue.length) {
                const [movr, movc] = moveQueue.pop()!;
                map[tmpr][tmpc] = map[movr][movc];

                tmpr = movr;
                tmpc = movc;
            }

            position[0] = pr + 1;
            map[tmpr][tmpc] = '.';

            return;
        } else if (el === 'O') {
            moveQueue.push([r, pc]);
        }
    }
};

const left = (map: string[][], position: [number, number]) => {
    const [pr, pc] = position;
    const moveQueue: [number, number][] = [[pr, pc]];

    for (let c = pc - 1; c >= 0; c--) {
        const el = map[pr][c];
        if (el === '#') {
            return;
        } else if (el === '.') {
            let [tmpr, tmpc] = [pr, c];
            while (moveQueue.length) {
                const [movr, movc] = moveQueue.pop()!;
                map[tmpr][tmpc] = map[movr][movc];

                tmpr = movr;
                tmpc = movc;
            }

            position[1] = pc - 1;
            map[tmpr][tmpc] = '.';

            return;
        } else if (el === 'O') {
            moveQueue.push([pr, c]);
        }
    }
};

const right = (map: string[][], position: [number, number]) => {
    const [pr, pc] = position;
    const moveQueue: [number, number][] = [[pr, pc]];

    for (let c = pc + 1; c < map[0].length; c++) {
        const el = map[pr][c];
        if (el === '#') {
            return;
        } else if (el === '.') {
            let [tmpr, tmpc] = [pr, c];
            while (moveQueue.length) {
                const [movr, movc] = moveQueue.pop()!;
                map[tmpr][tmpc] = map[movr][movc];

                tmpr = movr;
                tmpc = movc;
            }

            position[1] = pc + 1;
            map[tmpr][tmpc] = '.';

            return;
        } else if (el === 'O') {
            moveQueue.push([pr, c]);
        }
    }
};

export const part1 = (data: string) => {
    const [_map, _instrs] = data.split('\n\n');
    const map = _map
        .split('\n')
        .map((line) => line.slice(1, -1).split(''))
        .slice(1, -1);

    const instrs = _instrs.replaceAll('\n', '').split('');
    let position: [number, number] = [0, 0];
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            if (map[r][c] === '@') {
                position = [r, c];
            }
        }
    }

    console.log(map.map((l) => l.join('')).join('\n'));
    console.log('--------------');
    for (const instr of instrs) {
        if (instr === '^') {
            up(map, position);
        } else if (instr === '>') {
            right(map, position);
        } else if (instr === 'v') {
            down(map, position);
        } else if (instr === '<') {
            left(map, position);
        }
        console.log(map.map((l) => l.join('')).join('\n'));
        console.log('--------------');
    }

    let sum = 0;
    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[0].length; c++) {
            const el = map[r][c];
            if (el === 'O') {
                sum += 100 * (r + 1) + (c + 1);
            }
        }
    }
    return sum;
};

export const part2 = (data: string) => {};

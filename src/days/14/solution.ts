import { updateAt } from '@fp-lib/array';

type Robot = { pos: [number, number]; vel: [number, number] };

const MAP_W = 101;
const MAP_H = 103;

const parse = (data: string): Robot[] =>
    data.split('\n').map((line) => {
        const pos = line
            .slice(line.indexOf('=') + 1, line.indexOf(' '))
            .split(',')
            .map(Number) as [number, number];
        const vel = line
            .slice(line.lastIndexOf('=') + 1)
            .split(',')
            .map(Number) as [number, number];

        return {
            pos,
            vel,
        };
    });

const simulate = (robot: Robot, position: [number, number], second: number) => {
    if (second > 100) {
        return position;
    }

    const nextX = (position[0] + robot.vel[0] + MAP_W) % MAP_W;
    const nextY = (position[1] + robot.vel[1] + MAP_H) % MAP_H;

    return simulate(robot, [nextX, nextY], second + 1);
};

const step = (robots: Robot[], positions: [number, number][]) => {
    return positions.map((position, i) => {
        const nextX = (position[0] + robots[i].vel[0] + MAP_W) % MAP_W;
        const nextY = (position[1] + robots[i].vel[1] + MAP_H) % MAP_H;

        return [nextX, nextY];
    }) as [number, number][];
};

export const part1 = (data: string) => {
    const robots = parse(data);
    const positions = robots.map((robot) => simulate(robot, robot.pos, 1));
    const top = [0, Math.floor(MAP_H / 2) - 1];
    const bottom = [Math.ceil(MAP_H / 2), MAP_H - 1];
    const left = [0, Math.floor(MAP_W / 2) - 1];
    const right = [Math.ceil(MAP_W / 2), MAP_W - 1];

    return positions
        .reduce<number[]>(
            (quadrants, [rx, ry]) => {
                if (ry >= top[0] && ry <= top[1] && rx >= left[0] && rx <= left[1]) {
                    return updateAt(0)((el: number) => el + 1)(quadrants);
                }
                if (ry >= bottom[0] && ry <= bottom[1] && rx >= left[0] && rx <= left[1]) {
                    return updateAt(1)((el: number) => el + 1)(quadrants);
                }

                if (ry >= top[0] && ry <= top[1] && rx >= right[0] && rx <= right[1]) {
                    return updateAt(2)((el: number) => el + 1)(quadrants);
                }

                if (ry >= bottom[0] && ry <= bottom[1] && rx >= right[0] && rx <= right[1]) {
                    return updateAt(3)((el: number) => el + 1)(quadrants);
                }

                return quadrants;
            },
            [0, 0, 0, 0],
        )
        .reduce((acc, num) => acc * num, 1);
};

export const part2 = (data: string) => {
    const robots = parse(data);

    let positions = robots.map((robot) => robot.pos);

    let iters = 0;

    while (true) {
        const map = Array.from({ length: MAP_H }, () => Array.from({ length: MAP_W }, () => '.'));
        let print = false;

        for (let i = 0; i < MAP_H; i++) {
            const robotsAtLine = new Set(positions.filter(([_, y]) => y === i).map(([x]) => x));
            map[i] = map[i].map((el, i) => (robotsAtLine.has(i) ? '#' : el));

            if (map[i].join('').includes('#########') && map[i - 1]?.join('')?.includes('#########')) {
                print = true;
            }
        }

        if (print) {
            console.log(iters);
            console.log(map.map((line) => line.join('')).join('\n'));
        }

        iters++;
        positions = step(robots, positions);
    }
};

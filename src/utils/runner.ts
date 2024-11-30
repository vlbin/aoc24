type Runner = (data: string) => [unknown, unknown];
type Logger = (runner: Runner) => (data: string) => void;

const day = Bun.argv[2] === 'today' ? new Date().getDate() : Bun.argv[2];
const mode = Bun.argv[3] ?? 'input';
const padded = Number(day) < 10 ? '0' + day : day;
const solution = await import(`../days/${padded}/solution`);

const runner: Runner = (data) => [solution.part1(data), solution.part2(data)];

const logger: Logger = (fn) => (data) => {
  console.log(`\n🎄 Day ${padded}`);
  console.log('================');

  const [part1, part2] = fn(data);

  console.log('\nResults:');
  console.log('Part 1:', part1);
  console.log('Part 2:', part2);
};

Bun.file(`src/${padded}/${mode}.txt`).text().then(logger(runner));

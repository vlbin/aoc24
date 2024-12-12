import { coords, grid } from '@lib/parsing';
import type { Coordinate } from '@lib/types';

type Plot = Coordinate<{
  value: string;
  inCluster: boolean;
}>;
type Cluster = ReadonlyArray<Plot>;
type FarmMap = ReadonlyArray<ReadonlyArray<string>>;

const directions = {
  west: [0, -1],
  east: [0, 1],
  north: [-1, 0],
  south: [1, 0],
};

const getAdjacentPlots = (plot: Plot, farmMap: FarmMap): Cluster => {
  const [r, c, val] = plot;

  return Object.values(directions)
    .map(([r_, c_]) => {
      const adjacent = farmMap[r + r_]?.[c + c_];

      const coord = [r + r_, c + c_, { value: val, inCluster: true }];

      return adjacent && adjacent === val.value && !val.inCluster ? coord : [];
    })
    .filter((arr) => arr.length) as Plot[];
};

const expandCluster = (cluster: Cluster, farm: FarmMap): Cluster => {
  const lastSpot = cluster[cluster.length - 1];

  const adjacent = getAdjacentPlots(lastSpot, farm);
  if (adjacent.length) {
    return expandCluster([...cluster, ...adjacent], farm);
  } else {
    return cluster;
  }
};

const buildClusters = (clusters: Cluster[], farm: Cluster, farmMap: FarmMap) => {
  const startingPoint = farm.find(
    ([r1, c1, v1]) =>
      !clusters.some((cluster) => cluster.find(([r2, c2, v2]) => r1 === r2 && c1 === c2 && v1.value === v2.value)),
  );

  if (!startingPoint) {
    return clusters;
  }

  const cluster = expandCluster([startingPoint], farmMap);
  return buildClusters([...clusters, cluster], farm, farmMap);
};

export const part1 = (data: string) => {
  const farmMap = grid(data);
  const farm = coords(data).map(([r, c, v]) => [
    r,
    c,
    {
      value: v,
      inCluster: false,
    },
  ]) as Plot[];

  return buildClusters([], farm, farmMap);
};

export const part2 = (data: string) => {};

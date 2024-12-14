import { CoordMap } from '@lib/map';

interface Plot {
  el: string;
}

const directions = {
  west: [0, -1],
  east: [0, 1],
  north: [-1, 0],
  south: [1, 0],
};

const getAdjacentPlots = (key: string, value: Readonly<Plot>, land: ReadonlyMap<string, Plot>) => {
  const [r1, c1] = CoordMap.fromHash(key);

  return Object.values(directions)
    .map(([r2, c2]) => {
      const adjKey = CoordMap.hash(r1 + r2, c1 + c2);
      const adjacent = land.get(adjKey);

      return adjacent && adjacent.el === value.el ? [adjKey, adjacent] : undefined;
    })
    .filter(Boolean) as [string, Plot][];
};

const dfs = (
  key: string,
  values: ReadonlyArray<string>,
  adjacencyMap: Readonly<Map<string, string[]>>,
  visited: Readonly<Set<string>>,
  unvisited: Readonly<Set<string>>,
): string[] => {
  if (visited.has(key)) {
    return [];
  }

  visited.add(key);
  unvisited.delete(key);

  return [
    key,
    ...values.flatMap((value) => dfs(value, adjacencyMap.get(value) || [], adjacencyMap, visited, unvisited)),
  ];
};

const buildClusters = (
  clusters: Readonly<Set<string>[]>,
  adjacencyMap: Readonly<Map<string, string[]>>,
  unvisited: Readonly<Set<string>>,
) => {
  const nextUnvisited = unvisited.keys().next().value;

  if (!nextUnvisited) {
    return clusters;
  }

  const clusterForKey = dfs(nextUnvisited, adjacencyMap.get(nextUnvisited) || [], adjacencyMap, new Set(), unvisited);

  return buildClusters([...clusters, new Set(clusterForKey)], adjacencyMap, unvisited);
};

export const part1 = (data: string) => {
  const map = CoordMap.from(data, (el) => ({
    el: el,
  }));

  const mapEntries = Array.from(map);

  const withAdjacent = mapEntries.reduce<Map<string, string[]>>(
    (adjMap, [key, value]) =>
      adjMap.set(
        key,
        getAdjacentPlots(key, value, map).map((x) => x[0]),
      ),
    new Map(),
  );

  const entries = Array.from(withAdjacent.entries());
  const unvisited = new Set(Array.from(withAdjacent.keys()));

  const fenceMap = entries.reduce<Map<string, number>>((acc, [key, values]) => {
    return acc.set(key, 4 - values.length);
  }, new Map());

  const clusters = buildClusters([], withAdjacent, unvisited);

  return clusters.reduce((sum, cluster) => {
    return sum + cluster.size * Array.from(cluster).reduce((sum, el) => sum + (fenceMap.get(el) || 0), 0);
  }, 0);
};

export const part2 = (data: string) => {};

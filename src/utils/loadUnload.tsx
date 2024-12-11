import parseManifestToGrid from "@/utils/parseManifestToGrid";
import { ManifestEntry } from "@/utils/parseManifestToGrid";

// Returns the coordinates of the lowest cost unload container.
function findLowestCostUnload(
  grid: ManifestEntry[][],
  containersToUnload: string[]
): { row: number; col: number } {
  /* 
	Greedy search starting from top left to right, then down. If unload box found with no blocking boxes on top, then it is guaranteed to be the lowest cost box to unload.

	For every box to unload, check how many boxes are above it and add it to the cost. The cost should be the manhattan distance to the portal square + the number of blocking boxes above.

	First pass: Try to find unload box with no blocking boxes on top.
	Second pass: If first pass fails, find unload box closest to the left with least amount of blocking boxes on top.
	*/

  let containersUnloadMap: Map<string, number> = new Map<string, number>();
  for (const s of containersToUnload) {
    if (!containersUnloadMap.has(s)) {
      containersUnloadMap.set(s, 1);
    } else {
      containersUnloadMap[s] += 1;
    }
  }

  // First pass.
  for (let c = 0; c < 12; c++) {
    for (let r = 7; r >= 0; r--) {
      const currCell: ManifestEntry = grid[r][c];

      if (currCell.name == "NAN" || currCell.name == "UNUSED") {
        continue;
      }

      // Found leftmost unload container with no blocking containers on top.
      if (containersUnloadMap.has(currCell.name)) {
        return { row: r, col: c };
      } else {
        break;
      }
    }
  }

  // Second pass.
  // Assumption: All unload containers have blocking containers on top.
  let costs: { cost: number; row: number; col: number }[] = [];
  for (let r = 7; r >= 0; r--) {
    for (let c = 0; c < 12; c++) {
      const currCell: ManifestEntry = grid[r][c];

      if (containersUnloadMap.has(currCell.name)) {
        let temp_r: number = r + 1;
        let num_blocking_containers_above: number = 0;
        while (temp_r <= 7) {
          const tempCell: ManifestEntry = grid[temp_r][c];
          if (tempCell.name != "NAN" && tempCell.name != "UNUSED") {
            num_blocking_containers_above += 1;
          } else {
            break;
          }
          temp_r += 1;
        }
        costs.push({ cost: num_blocking_containers_above, row: r, col: c });
      }
    }
  }

  costs.sort(
    (
      a: { cost: number; row: number; col: number },
      b: { cost: number; row: number; col: number }
    ) => {
      return a.cost - b.cost;
    }
  );

  return { row: costs[0].row, col: costs[0].col };
}

const loadUnload = (manifest, containersToLoad, containersToUnload) => {
  let grid: ManifestEntry[][] = parseManifestToGrid(manifest);
  
	// Sample call only.
	let rc: { row: number; col: number } = findLowestCostUnload(
    grid,
    containersToUnload
  );

  const listOfMoves = [
    [
      [2, 6],
      [2, 1],
    ],
    [
      [1, 6],
      [2, 12],
    ],
    [
      [2, 5],
      [2, 11],
    ],
    [
      [1, 5],
      [3, 11],
    ],
  ]; // move [2, 6] to [2, 1], then [1, 6] to [2, 12], etc.
  return listOfMoves;
};

export default loadUnload;

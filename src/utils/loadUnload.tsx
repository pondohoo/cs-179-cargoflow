import parseManifestToGrid from "@/utils/grid_utils";
import { ManifestEntry, modifyManifestGrid } from "@/utils/grid_utils";

// Returns the coordinates of the lowest cost unload container.
function findLowestCostUnload(
  grid: ManifestEntry[][],
  containersToUnload: string[]
): { row: number; col: number; index: number } {
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
        let index: number = containersToUnload.findIndex((s) => {
          return s == currCell.name;
        });
        return { row: r, col: c, index: index };
      } else {
        break;
      }
    }
  }

  // Second pass.
  // Assumption: All unload containers have blocking containers on top.
  let costs: { cost: number; row: number; col: number; name: string }[] = [];
  for (let r = 7; r >= 0; r--) {
    for (let c = 0; c < 12; c++) {
      const currCell: ManifestEntry = grid[r][c];

      if (containersUnloadMap.has(currCell.name)) {
        let temp_r: number = r + 1;
        let num_blockingContainers_above: number = 0;
        while (temp_r <= 7) {
          const tempCell: ManifestEntry = grid[temp_r][c];
          if (tempCell.name != "NAN" && tempCell.name != "UNUSED") {
            num_blockingContainers_above += 1;
          } else {
            break;
          }
          temp_r += 1;
        }
        costs.push({
          cost: num_blockingContainers_above,
          row: r,
          col: c,
          name: currCell.name,
        });
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

  let index: number = containersToUnload.findIndex((s) => {
    return s == costs[0].name;
  });
  return { row: costs[0].row, col: costs[0].col, index: index };
}

function findBestCoordsToMoveBlockingContainer(
  col: number,
  grid: ManifestEntry[][],
  containersToUnload: string[]
): { row: number; col: number } {
  const containersToUnloadSet: Set<string> = new Set<string>(
    containersToUnload
  );

  // Search for nearest available column with no unload containers.
  let second_pass_best_row: number = -1;
  let second_pass_best_col: number = Infinity;
  let l: number = col - 1;
  let r: number = col + 1;
  while (l >= 0 && r < 12) {
    console.log(`taco find best move block curr at l r ${l} and ${r}`);
    // Check left.
    for (let i = 0; i < 8; i++) {
      const currCell: ManifestEntry = grid[i][l];
      if (
        containersToUnloadSet.has(currCell.name) &&
        second_pass_best_row == -1
      ) {
        while (i < 8 && second_pass_best_row == -1) {
          if (grid[i][l].name == "NAN" || grid[i][l].name == "UNUSED") {
            second_pass_best_row = i;
            second_pass_best_col = l;
          }
          i += 1;
        }

        break;
      }

      if (currCell.name == "NAN" || currCell.name == "UNUSED") {
        return { row: i, col: l };
      }
    }

    l -= 1;

    // Check right.
    for (let i = 0; i < 8; i++) {
      const currCell: ManifestEntry = grid[i][r];
      if (
        containersToUnloadSet.has(currCell.name) &&
        second_pass_best_row == -1
      ) {
        while (i < 8 && second_pass_best_row == -1) {
          if (grid[i][r].name == "NAN" || grid[i][r].name == "UNUSED") {
            second_pass_best_row = i;
            second_pass_best_col = r;
          }
          i += 1;
        }

        break;
      }

      if (currCell.name == "NAN" || currCell.name == "UNUSED") {
        return { row: i, col: r };
      }
    }
    r += 1;
  }

  while (l >= 0) {
    for (let i = 0; i < 8; i++) {
      const currCell: ManifestEntry = grid[i][l];
      if (
        containersToUnloadSet.has(currCell.name) &&
        second_pass_best_row == -1
      ) {
        while (i < 8 && second_pass_best_row == -1) {
          if (grid[i][l].name == "NAN" || grid[i][l].name == "UNUSED") {
            second_pass_best_row = i;
            second_pass_best_col = l;
          }
          i += 1;
        }

        break;
      }

      if (currCell.name == "NAN" || currCell.name == "UNUSED") {
        return { row: i, col: l };
      }
    }
    l -= 1;
  }

  while (r < 12) {
    for (let i = 0; i < 8; i++) {
      const currCell: ManifestEntry = grid[i][r];
      if (
        containersToUnloadSet.has(currCell.name) &&
        second_pass_best_row == -1
      ) {
        while (i < 8 && second_pass_best_row == -1) {
          if (grid[i][r].name == "NAN" || grid[i][r].name == "UNUSED") {
            second_pass_best_row = i;
            second_pass_best_col = r;
          }
          i += 1;
        }

        break;
      }

      if (currCell.name == "NAN" || currCell.name == "UNUSED") {
        return { row: i, col: r };
      }
    }
    r += 1;
  }

  return { row: second_pass_best_row, col: second_pass_best_col };
}

// Given the coordinates of a container to unload, moves all blocking containers above to another available column with no unload containers. In the case that all columns have unload containers, move blocking containers to nearest available column. Returns the updated grid after moving the blockinb containers and the formatted set of moves..
function moveBlockingContainers(
  row: number,
  col: number,
  grid: ManifestEntry[][],
  containersToUnload: string[]
): [ManifestEntry[][], number[][][]] {
  console.log("taco in movingblockingcontainers");
  let listOfMoves: number[][][] = [];
  // Check if there are any blocking containers above target container.
  if (
    row + 1 < 8 &&
    (grid[row + 1][col].name == "NAN" || grid[row + 1][col].name == "UNUSED")
  ) {
    return [grid, listOfMoves];
  } else {
    let blockingContainers: { row: number; col: number }[] = [];
    let i: number = row + 1;
    while (
      i < 8 &&
      grid[i][col].name != "NAN" &&
      grid[i][col].name != "UNUSED"
    ) {
      blockingContainers.push({ row: i, col: col });
      i += 1;
    }
    console.log("taco found blocking container");
    console.log(blockingContainers);

    let armRow: number = blockingContainers[blockingContainers.length - 1].row;
    let armCol: number = blockingContainers[blockingContainers.length - 1].col;
    while (blockingContainers.length > 0) {
      let currBlockingContainer: { row: number; col: number } =
        blockingContainers.pop();

      const bestToCoords: { row: number; col: number } =
        findBestCoordsToMoveBlockingContainer(
          currBlockingContainer.col,
          grid,
          containersToUnload
        );

      grid[bestToCoords.row][bestToCoords.col] =
        grid[currBlockingContainer.row][currBlockingContainer.col];
      if (
        !(
          armRow == currBlockingContainer.row &&
          armCol == currBlockingContainer.col
        )
      ) {
        listOfMoves.push([
          [armRow + 1, armCol + 1],
          [currBlockingContainer.row + 1, currBlockingContainer.col + 1],
        ]);
        console.log("taco arm move LOL");
      }
      listOfMoves.push([
        [currBlockingContainer.row + 1, currBlockingContainer.col + 1],
        [bestToCoords.row + 1, bestToCoords.col + 1],
      ]);
      armRow = bestToCoords.row;
      armCol = bestToCoords.col;

      grid[currBlockingContainer.row][currBlockingContainer.col].name =
        "UNUSED";
      grid[currBlockingContainer.row][currBlockingContainer.col].weight = 0;
    }
  }
  return [grid, listOfMoves];
}

// Returns the formatted move and updated grid after unloading.
function unload(
  row: number,
  col: number,
  armRow: number,
  armCol: number,
  grid: ManifestEntry[][]
): [ManifestEntry[][], number[][][]] {
  let moves: number[][][] = [];

  // Move arm to unload container coords if it is not there already.
  if (!(row == armRow && col == armCol)) {
    moves.push([
      [armRow + 1, armCol + 1],
      [row + 1, col + 1],
    ]);
  }

  // Move from target unload container to ship grid pink slot (13, 37).
  moves.push([
    [row + 1, col + 1],
    [13, 37],
  ]);

  // Move from ship grid pink slot (13, 37) to loading truck slot (15, 39).
  moves.push([
    [13, 37],
    [15, 39],
  ]);

  grid[row][col].name = "UNUSED";
  grid[row][col].weight = 0;

  return [grid, moves];
}

const loadDest = (
  grid: ManifestEntry[][],
  containersToUnload: string[]
): [number, number] | null => {
  let bestDest: { distance: number; coordinates: [number, number] | null } = {
    distance: Infinity,
    coordinates: null,
  };

  for (let col = 0; col < 12; col++) {
    let skipColumnF = false;
    for (let row = 0; row < 7; row++) {
      const cellName = grid[row][col].name;
      if (containersToUnload.includes(cellName)) {
        skipColumnF = true;
        break;
      }
    }
    if (skipColumnF) continue;
    for (let row = 0; row < 8; row++) {
      const cellName = grid[row][col].name;
      if (
        cellName === "UNUSED" &&
        (row == 0 || grid[row - 1][col].name !== "UNUSED")
      ) {
        // Check for available square in grid
        const currDistance = Math.abs(7 - row) + Math.abs(0 - col);
        if (currDistance < bestDest.distance) {
          bestDest = {
            distance: currDistance,
            coordinates: [row + 1, col + 1],
          };
          break;
        }
      }
    }
  }
  if (bestDest.coordinates === null) {
    return null;
  }

  return bestDest.coordinates;
};

const loadUnload = (
  manifest,
  containersToLoad,
  containersToUnload
): number[][][] => {
  let grid: ManifestEntry[][] = parseManifestToGrid(manifest);
  let listOfMoves: number[][][] = [];

  console.log("taco before unload while loop");
  console.log(containersToUnload.length);
  while (containersToUnload.length > 0 && containersToLoad.length > 0) {
    // Find lowest cost unload.
    let lowestCostUnloadCoords: { row: number; col: number; index: number } =
      findLowestCostUnload(grid, containersToUnload);
    console.log(`taco lowest cost ${lowestCostUnloadCoords}`);

    console.log("taco moving blocking boxes");
    // Move blocking boxes above target unload box if they exist.
    let [updatedGridAfterBlockingContainers, blockingContainerMoves]: [
      ManifestEntry[][],
      number[][][]
    ] = moveBlockingContainers(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      grid,
      containersToUnload
    );
    grid = updatedGridAfterBlockingContainers;
    for (const move of blockingContainerMoves) {
      listOfMoves.push(move);
    }
    console.log("taco finished moving blocking boxes");
    console.log(listOfMoves);

    // Unload.
    let armRow: number = lowestCostUnloadCoords.row;
    let armCol: number = lowestCostUnloadCoords.col;
    if (listOfMoves.length > 0) {
      armRow = listOfMoves[listOfMoves.length - 1][1][0] - 1;
      armCol = listOfMoves[listOfMoves.length - 1][1][1] - 1;
    }
    let [updatedGridAfterUnload, unloadMoves]: [
      ManifestEntry[][],
      number[][][]
    ] = unload(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      armRow,
      armCol,
      grid
    );
    grid = updatedGridAfterUnload;
    for (const move of unloadMoves) {
      listOfMoves.push(move);
    }
    containersToUnload.pop(lowestCostUnloadCoords.index);

    // Attempt load.
  }

  while (containersToLoad.length > 0) {}

  while (containersToUnload.length > 0) {
    // Find lowest cost unload.
    let lowestCostUnloadCoords: { row: number; col: number; index: number } =
      findLowestCostUnload(grid, containersToUnload);
    console.log(`taco lowest cost ${lowestCostUnloadCoords}`);

    console.log("taco moving blocking boxes");
    // Move blocking boxes above target unload box if they exist.
    let [updatedGridAfterBlockingContainers, blockingContainerMoves]: [
      ManifestEntry[][],
      number[][][]
    ] = moveBlockingContainers(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      grid,
      containersToUnload
    );
    grid = updatedGridAfterBlockingContainers;
    for (const move of blockingContainerMoves) {
      listOfMoves.push(move);
    }
    console.log("taco finished moving blocking boxes");
    console.log(listOfMoves);

    // Unload.
    let armRow: number = lowestCostUnloadCoords.row;
    let armCol: number = lowestCostUnloadCoords.col;
    if (listOfMoves.length > 0) {
      armRow = listOfMoves[listOfMoves.length - 1][1][0] - 1;
      armCol = listOfMoves[listOfMoves.length - 1][1][1] - 1;
    }
    let [updatedGridAfterUnload, unloadMoves]: [
      ManifestEntry[][],
      number[][][]
    ] = unload(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      armRow,
      armCol,
      grid
    );
    grid = updatedGridAfterUnload;
    for (const move of unloadMoves) {
      listOfMoves.push(move);
    }
    containersToUnload.pop(lowestCostUnloadCoords.index);
  }

  console.log("taco unload finished");
  console.log(listOfMoves);
  return listOfMoves;
  // const listOfMoves = [
  //   [
  //     [2, 6],
  //     [2, 1],
  //   ],
  //   [
  //     [1, 6],
  //     [2, 12],
  //   ],
  //   [
  //     [2, 5],
  //     [2, 11],
  //   ],
  //   [
  //     [1, 5],
  //     [3, 11],
  //   ],
  // ]; // move [2, 6] to [2, 1], then [1, 6] to [2, 12], etc.
  // return listOfMoves;
};

export default loadUnload;

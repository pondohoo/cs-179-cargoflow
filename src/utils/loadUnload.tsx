import parseManifestToGrid from "@/utils/grid_utils";
import { ManifestEntry } from "@/utils/grid_utils";

function calculateTotalCost(listOfMoves: number[][][]): number {
  let totalCost: number = 0;

  for (const move of listOfMoves) {
    // Ship to truck move.
    if (move[1][0] == 15 && move[1][1] == 39) {
      totalCost += 3 + Math.abs(move[0][0] - 8) + Math.abs(move[0][1] - 1);
    } else if (move[0][0] == 15 && move[0][1] == 39) {
      // Truck to ship move.
      totalCost += 3 + Math.abs(move[1][0] - 8) + Math.abs(move[1][1] - 1);
    } else {
      // Ship to ship move.
      totalCost +=
        Math.abs(move[0][0] - move[1][0]) + Math.abs(move[0][1] - move[1][1]);
    }
  }

  return (
    totalCost +
    (listOfMoves[0][0][0] == 15 && listOfMoves[0][0][1] == 39
      ? 2
      : Math.abs(listOfMoves[0][0][0] - 8) +
        Math.abs(listOfMoves[0][0][1] - 1) +
        1)
  );
}

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

      if (currCell.name == "UNUSED") {
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
          if (tempCell.name != "UNUSED") {
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
  row: number,
  col: number,
  grid: ManifestEntry[][],
  containersToUnload: string[]
): { row: number; col: number } {
  const containersToUnloadSet: Set<string> = new Set<string>(
    containersToUnload
  );

  // Search for nearest available column with no unload containers.
  let l: number = col - 1;
  let r: number = col + 1;
  let first_pass_best_row: number = 0;
  let first_pass_best_col: number = 0;
  let minCost: number = Infinity;

  while (l >= 0 && r < 12) {
    // Check left.  
    inner: for (let i = 0; i < 8; i++) { 
      for (let j = 0; j < 8; j++) {
        if (containersToUnloadSet.has(grid[j][l].name)) {
          break inner;
        }
      }
      const currCell: ManifestEntry = grid[i][l];
      if (currCell.name == "UNUSED") {
        const currCost: number =
          Math.abs(row - i) + Math.abs(col - l);
        if (currCost < minCost && (i == 0 || grid[i-1][l].name != "UNUSED")) {
          first_pass_best_row = i;
          first_pass_best_col = l;
          minCost = currCost;
          break;
        }
      }
    }

    l -= 1;

    // Check right.
    inner: for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (containersToUnloadSet.has(grid[j][r].name)) {
          break inner;
        }
      }
      const currCell: ManifestEntry = grid[i][r];
      if (currCell.name == "UNUSED" && (i == 0 || grid[i-1][r].name != "UNUSED")) {
        const currCost: number =
          Math.abs(row - i) + Math.abs(col - r);
        if (currCost < minCost) {
          first_pass_best_row = i;
          first_pass_best_col = r;
          minCost = currCost;
          break;
        }
      }
    }
    r += 1;
  }

  return { row: first_pass_best_row, col: first_pass_best_col };
}

function findBestLoadCoords(
  grid: ManifestEntry[][],
  containersToUnload: string[]
): { row: number; col: number } {
  const containersToUnloadSet: Set<string> = new Set<string>(
    containersToUnload
  );
  for (let c: number = 0; c < 12; c++) {
    for (let r: number = 0; r < 8; r++) {
      if (containersToUnloadSet.has(grid[r][c].name)) {
        continue;
      }

      if (grid[r][c].name == "UNUSED") {
        return { row: r, col: c };
      }
    }
  }

  return { row: -1, col: -1 };
}

// Return the updated grid and set of moves after loading a container onto the ship grid.
function load(
  row: number,
  col: number,
  name: string,
  originalGrid: ManifestEntry[][],
  listOfMoves: number[][][],
): [ManifestEntry[][], number[][][], number[]] {
  let updatedGrid: ManifestEntry[][] = JSON.parse(JSON.stringify(originalGrid));
  let moves: number[][][] = [];
  let operationList: number[] = [];

  // Check if most recent to move is not already at truck cell, then move to truck cell first.
  if (listOfMoves.length > 0) {
    let prevToCoord: number[] = listOfMoves[listOfMoves.length - 1][1];
    if (!(prevToCoord[0] == 15 && prevToCoord[1] == 39)) {
      moves.push([prevToCoord, [15, 39]]);
      operationList.push(-1); // crane
    }
  }

  // Move from truck cell (15, 39) to target cell.
  
  operationList.push(1); // pure load
  moves.push([
    [15, 39],
    [row + 1, col + 1],
  ]);

  updatedGrid[row][col].name = name;

  return [updatedGrid, moves, operationList];
}

// Given the coordinates of a container to unload, moves all blocking containers above to another available column with no unload containers. In the case that all columns have unload containers, move blocking containers to nearest available column. Returns the updated grid after moving the blockinb containers and the formatted set of moves..
function moveBlockingContainers(
  row: number,
  col: number,
  originalGrid: ManifestEntry[][],
  containersToUnload: string[],
  originalListOfMoves: number[][][]
): [ManifestEntry[][], number[][][], number[]] {
  let grid: ManifestEntry[][] = JSON.parse(JSON.stringify(originalGrid));
  let listOfMoves: number[][][] = [];
  let operationList: number[] = [];
  // Check if there are any blocking containers above target container.
  if (row + 1 < 8 && grid[row + 1][col].name == "UNUSED") {
    return [grid, listOfMoves, operationList];
  } else {
    let blockingContainers: { row: number; col: number }[] = [];
    let i: number = row + 1;
    while (i < 8 && grid[i][col].name != "UNUSED") {
      blockingContainers.push({ row: i, col: col });
      i += 1;
    }

    let armRow: number = blockingContainers[blockingContainers.length - 1].row;
    let armCol: number = blockingContainers[blockingContainers.length - 1].col;

    // Move arm to blocking container if it is not already there.
    if (
      originalListOfMoves[originalListOfMoves.length - 1] &&
      (originalListOfMoves[originalListOfMoves.length - 1][1][0] != armRow ||
      originalListOfMoves[originalListOfMoves.length - 1][1][1] != armCol)
    ) {
      listOfMoves.push([
        [
          originalListOfMoves[originalListOfMoves.length - 1][1][0],
          originalListOfMoves[originalListOfMoves.length - 1][1][1],
        ],
        [armRow + 1, armCol + 1],
      ]);
      operationList.push(-1);
    }

    while (blockingContainers.length > 0) {
      let currBlockingContainer: { row: number; col: number } =
        blockingContainers.pop();

      const bestToCoords: { row: number; col: number } =
        findBestCoordsToMoveBlockingContainer(
          currBlockingContainer.row,
          currBlockingContainer.col,
          grid,
          containersToUnload
        );

      grid[bestToCoords.row][bestToCoords.col].name =
        grid[currBlockingContainer.row][currBlockingContainer.col].name;
      grid[bestToCoords.row][bestToCoords.col].weight =
        grid[currBlockingContainer.row][currBlockingContainer.col].weight;
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
        operationList.push(-1); // crane
      }
      listOfMoves.push([
        [currBlockingContainer.row + 1, currBlockingContainer.col + 1],
        [bestToCoords.row + 1, bestToCoords.col + 1],
      ]);
      operationList.push(-2); // blocking/balance
      armRow = bestToCoords.row;
      armCol = bestToCoords.col;

      grid[currBlockingContainer.row][currBlockingContainer.col].name =
        "UNUSED";
      grid[currBlockingContainer.row][currBlockingContainer.col].weight = 0;
    }
  }
  return [grid, listOfMoves, operationList];
}

// Returns the formatted move and updated grid after unloading.
function unload(
  row: number,
  col: number,
  armRow: number,
  armCol: number,
  originalGrid: ManifestEntry[][]
): [ManifestEntry[][], number[][][], number[]] {
  let moves: number[][][] = [];
  let grid: ManifestEntry[][] = JSON.parse(JSON.stringify(originalGrid));
  let operationList: number[] = [];

  // Move arm to unload container coords if it is not there already.
  if (!(row == armRow && col == armCol)) {
    operationList.push(-1); // crane
    moves.push([
      [armRow + 1, armCol + 1],
      [row + 1, col + 1],
    ]);
  }

  // Move from target unload container coords to loading truck slot (15, 39).
  operationList.push(0); // pure unload
  moves.push([
    [row + 1, col + 1],
    [15, 39],
  ]);

  grid[row][col].name = "UNUSED";
  grid[row][col].weight = 0;

  return [grid, moves, operationList];
}

const loadUnload = (
  manifest,
  originalContainersToLoad: string[],
  originalContainersToUnload: string[]
): [number[][][], number[], number] => {
  let grid: ManifestEntry[][] = parseManifestToGrid(manifest);
  let listOfMoves: number[][][] = [];
  let isMoveLoad: number[] = [];
  let containersToUnload: string[] = JSON.parse(
    JSON.stringify(originalContainersToUnload)
  );
  let containersToLoad: string[] = JSON.parse(
    JSON.stringify(originalContainersToLoad)
  );

  while (containersToUnload.length > 0 && containersToLoad.length > 0) {
    // Find lowest cost unload.
    let lowestCostUnloadCoords: { row: number; col: number; index: number } =
      findLowestCostUnload(grid, containersToUnload);

    // Move blocking boxes above target unload box if they exist.
    let [
      updatedGridAfterBlockingContainers,
      blockingContainerMoves,
      blockingOperationList,
    ]: [ManifestEntry[][], number[][][], number[]] = moveBlockingContainers(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      grid,
      containersToUnload,
      listOfMoves
    );
    grid = updatedGridAfterBlockingContainers;
    for (const move of blockingContainerMoves) {
      listOfMoves.push(move);
    }

    for (const operation of blockingOperationList) {
      isMoveLoad.push(operation);
    }

    // Unload.
    let armRow: number = lowestCostUnloadCoords.row;
    let armCol: number = lowestCostUnloadCoords.col;
    if (listOfMoves.length > 0) {
      armRow = listOfMoves[listOfMoves.length - 1][1][0] - 1;
      armCol = listOfMoves[listOfMoves.length - 1][1][1] - 1;
    }
    let [updatedGridAfterUnload, unloadMoves, operationList]: [
      ManifestEntry[][],
      number[][][],
      number[]
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
    for (const operation of operationList) {
      isMoveLoad.push(operation);
    }
    containersToUnload.splice(lowestCostUnloadCoords.index, 1);

    // Attempt load.
    const bestLoadCoords: { row: number; col: number } = findBestLoadCoords(
      grid,
      containersToUnload
    );
    if (!(bestLoadCoords.row == -1 && bestLoadCoords.col == -1)) {
      const [updatedGrid, loadMoves, operationList]: [
        ManifestEntry[][],
        number[][][],
        number[]
      ] = load(
        bestLoadCoords.row,
        bestLoadCoords.col,
        containersToLoad[0],
        grid,
        listOfMoves
      );
      containersToLoad.splice(0, 1);
      grid = updatedGrid;
      for (const move of loadMoves) {
        listOfMoves.push(move);
      }
      for (const operation of operationList) {
        isMoveLoad.push(operation);
      }
    }
  }

  while (containersToLoad.length > 0) {
    const bestLoadCoords: { row: number; col: number } = findBestLoadCoords(
      grid,
      containersToUnload
    );
    if (!(bestLoadCoords.row == -1 && bestLoadCoords.col == -1)) {
      const [updatedGrid, loadMoves, operationList]: [
        ManifestEntry[][],
        number[][][],
        number[]
      ] = load(
        bestLoadCoords.row,
        bestLoadCoords.col,
        containersToLoad[0],
        grid,
        listOfMoves
      );
      containersToLoad.splice(0, 1);
      grid = updatedGrid;
      for (const move of loadMoves) {
        listOfMoves.push(move);
      }
      for (const operation of operationList) {
        isMoveLoad.push(operation);
      }
    }
  }

  while (containersToUnload.length > 0) {
    // Find lowest cost unload.
    let lowestCostUnloadCoords: { row: number; col: number; index: number } =
      findLowestCostUnload(grid, containersToUnload);

    // Move blocking boxes above target unload box if they exist.
    let [
      updatedGridAfterBlockingContainers,
      blockingContainerMoves,
      blockingOperationList,
    ]: [ManifestEntry[][], number[][][], number[]] = moveBlockingContainers(
      lowestCostUnloadCoords.row,
      lowestCostUnloadCoords.col,
      grid,
      containersToUnload,
      listOfMoves
    );
    grid = updatedGridAfterBlockingContainers;
    for (const move of blockingContainerMoves) {
      listOfMoves.push(move);
    }
    for (const operation of blockingOperationList) {
      isMoveLoad.push(operation);
    }

    // Unload.
    let armRow: number = lowestCostUnloadCoords.row;
    let armCol: number = lowestCostUnloadCoords.col;
    if (listOfMoves.length > 0) {
      armRow = listOfMoves[listOfMoves.length - 1][1][0] - 1;
      armCol = listOfMoves[listOfMoves.length - 1][1][1] - 1;
    }
    let [updatedGridAfterUnload, unloadMoves, operationList]: [
      ManifestEntry[][],
      number[][][],
      number[]
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
    for (const operation of operationList) {
      isMoveLoad.push(operation);
    }
    containersToUnload.splice(lowestCostUnloadCoords.index, 1);
  }

  return [listOfMoves, isMoveLoad, calculateTotalCost(listOfMoves)];
};

export default loadUnload;

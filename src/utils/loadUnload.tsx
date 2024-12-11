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

const gridUpdate = (grid: ManifestEntry[][], coordinate:{row: number, col: number}, containerName: string) => {
  let row = coordinate.row;
  let col = coordinate.col;
  grid[row][col].name = containerName;
}

const diffgridUpdate = (grid: ManifestEntry[][], coordinate: [number,number], containerName) => {
  grid[coordinate[0]][coordinate[1]].name = containerName;
}

const loadUnload = (manifest, containersToLoad, containersToUnload) => {
  let grid: ManifestEntry[][] = parseManifestToGrid(manifest);

  const loadDest = (grid: ManifestEntry[][], containersToUnload: string[]): [number,number] | null => {
    let bestDest: { distance: number; coordinates: [number,number] | null } = {
      distance: Infinity,
      coordinates: null,
    };

    for (let col = 0; col < 12; col++) {
      let skipColumnF = false;
      for (let row = 0; row < 8; row++) {
        const cellName = grid[row][col].name;
        if (containersToUnload.includes(cellName)){
          skipColumnF = true;
          break;
        }
      }
      if (skipColumnF) continue;
      for (let row = 0; row < 8; row++){
        const cellName = grid[row][col].name;
        if (cellName === "UNUSED" && (row == 0 || grid[row-1][col].name !== "UNUSED")) {
          // Check for available square in grid
          const currDistance = Math.abs(7 - row) + Math.abs(0-col);
          if (currDistance < bestDest.distance){
            bestDest = {distance: currDistance, coordinates: [row+1,col+1]};
            break;
          }
          }
        }
      }
      if (bestDest.coordinates === null){
        return null;
      }
      return bestDest.coordinates;
    };

  const truckToGrid = [[15,39],[13,37],];
  const gridToTruck = [[13,37],[15,39],];
  const listOfMoves = [];
  // DISCOVERED GRID UPDATE FUNCTION BUG/ERROR
  // grid[loadrc[0]][loadrc[1]].name = containersToLoad[0];
  // loadrc = loadDest(grid,containersToLoad);
  // listOfMoves.push([[7,1],loadrc]);
  // loadrc = loadDest(grid, containersToUnload);
  // return listOfMoves;

  // while(containersToUnload.length > 0 && containersToLoad.length > 0){
    //Update rc to lowest unload cost in current grid
    // const rc = findLowestCostUnload(grid, containersToUnload);
    // const outputUnload = [rc.row,rc.col];
    // listOfMoves.push([outputUnload,[13,37]]);

    //ADD THIS PUSH STATEMENT, once currentWeight = manifest.[currentEntry].weight is resolved
    //listOfMoves.push(gridToTruck);
    
    // gridUpdate(grid, rc, "UNUSED");
    // containersToUnload.shift();
    // let loadrc = loadDest(grid, containersToUnload);
    // let outputLoad = [loadrc.row, loadrc.col];
    
    // // Add this push statement, once the same currentWeight bug is fixed
    // // listOfMoves.push(truckToGrid);
    
    // listOfMoves.push([[13,37],[outputLoad]]);
    // gridUpdate(grid, loadrc, containersToLoad[0]);
    // containersToLoad.shift();
  // }

  // while (containersToUnload.length > 0){
  //   let rc = findLowestCostUnload(grid, containersToUnload);
  //   listOfMoves.push(truckToGrid);
  //   //Add following push statement, once currentWeight = manifest[currentEntry].weight works
  //   //listOfMoves.push(truckToGrid);
  //   listOfMoves.push([[13,37],rc]);
  //   //gridUpdate
  //   containersToUnload.shift();
  // }
  // return listOfMoves;

  // while (containersToLoad.length > 0){
  //   let loadrc = loadDest(grid, containersToUnload);
  //   listOfMoves.push(gridToTruck);
  //   //Add following push statement, once currentWeight = manifest[currentEntry].weight works
  //   //listOfMoves.push(truckToGrid);
  //   listOfMoves.push([[13,37],loadrc]);
  //   // diffgridUpdate(grid,loadrc,containersToLoad[0]);
  //   containersToLoad.shift();
  // }
  // return listOfMoves;

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

import parseManifestToGrid from "@/utils/parseManifestToGrid";
import { ManifestEntry } from "@/utils/parseManifestToGrid";

const loadUnload = (manifest, containersToLoad, containersToUnload) => {
  let grid: ManifestEntry[][] = parseManifestToGrid(manifest);

  const loadDest = (grid: ManifestEntry[][], containersToUnload: string[]): [number, number] | null => {
    let bestDest: { distance: number; coordinates: [number, number] | null } = {
      distance: Infinity,
      coordinates: null,
    };

    for (let col = 0; col < 12; col++) {
      let skipColumnF = false;
      for (let row = 0; row < 7; row++) {
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
            bestDest = {distance: currDistance, coordinates: [row + 1,col + 1]};
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
  const ListOfMoves = [[[8, 1],loadDest(grid, containersToUnload),]];
  return ListOfMoves;
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

export interface ManifestEntry {
  row: number;
  col: number;
  weight: number;
  name: string;
}

export default function parseManifestToGrid(
  manifest: ManifestEntry[]
): ManifestEntry[][] {
  let grid: ManifestEntry[][] = [];
  // First 8 x 12 entries in manifest are grid items starting from bottom row to top.
  for (let r = 0; r < 8; r++) {
    let row: ManifestEntry[] = [];
    for (let c = 0; c < 12; c++) {
      row.push(manifest[r * 12 + c]);
    }
    grid.push(row);
  }

  return grid;
}

export function modifyManifestGrid(grid: Manifest[][], manifest: ManifestEntry[]): ManifestEntry[] {
}

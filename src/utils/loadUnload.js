const loadUnload = (manifest) => {
    // Ensure manifest is an array
    if (!Array.isArray(manifest)) {
        console.error("Invalid manifest format:", manifest);
        return []; // Return an empty list if manifest is invalid
    }

    // Initialize the grid
    const rows = 8; // Grid is 8 rows
    const columns = 12; // Grid is 12 columns
    const grid = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({
            container: null,
            available: false,
            hasContainer: false,
        }))
    );

    // Populate the grid based on the manifest
    manifest.forEach(({ row, col, weight, name }) => {
        const rowIndex = row - 1; // Convert to 0-based index
        const colIndex = col - 1; // Convert to 0-based index

        if (name === "NAN") {
            // Mark as unavailable/obstacle
            grid[rowIndex][colIndex].available = false;
        } else if (name === "UNUSED") {
            // Mark as available
            grid[rowIndex][colIndex].available = true;
        } else {
            // Populate with a container
            grid[rowIndex][colIndex] = {
                container: { name, weight },
                available: false,
                hasContainer: true,
            };
        }
    });

    const containersToLoad = [["C"]];
    const containersToUnload = [["3", "2"]];
    const listOfMoves = [
        [
            [6, 2],
            [1, 2],
        ],
        [
            [6, 1],
            [12, 2],
        ],
        [
            [5, 2],
            [11, 2],
        ],
        [
            [5, 1],
            [11, 3],
        ],
    ]; // move [6, 2] to [1, 2], then [6, 1] to [8, 2], etc.

    // Logic to utilize the grid for loading/unloading can be added here as needed

    return listOfMoves;
};

export default loadUnload;

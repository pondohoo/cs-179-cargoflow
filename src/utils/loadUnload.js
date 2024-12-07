import PinkSquareAboveShip from "@/components/PinkSquareAboveShip";

const loadUnload = (manifest, containersToLoad, containersToUnload) => {
	const grid = (manifest) => {
		//Creates a 2D grid from the manifest
	}

	function cost_update(){
		//Compares manhattan cost among all unload containers. Returns the lowest.
		return;
	}

	function move_update(){
		//Updates the grid after a load or unload operation
		return;
	}

	function load_dest(){
		//Iterates through the grid, finds best column for loading containers
		return;
	}

	//Notes:
	//PinkSquareAbove Ship = row 13, col 37
	//Ship grid = 8 x 12
	//Truck = row 15 col 39
	
	// const listOfMoves = [
	// 	[
	// 		[2, 6],
	// 		[2, 1],
	// 	],
	// 	[
	// 		[1, 6],
	// 		[2, 12],
	// 	],
	// 	[
	// 		[2, 5],
	// 		[2, 11],
	// 	],
	// 	[
	// 		[1, 5],
	// 		[3, 11],
	// 	],
	// ]; // move [2, 6] to [2, 1], then [1, 6] to [2, 12], etc.
	// return listOfMoves;


};

export default loadUnload;

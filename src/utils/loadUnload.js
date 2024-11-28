const loadUnload = (manifest, containersToLoad, containersToUnload) => {
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

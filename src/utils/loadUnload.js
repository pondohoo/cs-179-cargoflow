const loadUnload = (manifest) => {
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
	return listOfMoves;
};

export default loadUnload;

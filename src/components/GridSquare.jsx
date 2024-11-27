const GridSquare = ({ entry, currentStep }) => {
	const getColor = () => {
		if (entry.row === 9) {
			return "bg-white opacity-30";
		}
		if (currentStep) {
			if (
				currentStep[1][0][1] === entry.row &&
				currentStep[1][0][0] === entry.col
			) {
				console.log(
					"currentStepRow",
					currentStep[1][0][1],
					"entryrow",
					entry.row
				);
			}
		}

		if (
			currentStep &&
			currentStep[1][0][1] === entry.row &&
			currentStep[1][0][0] === entry.col
		) {
			return "bg-ibm-orange";
		} else if(
			currentStep &&
			currentStep[1][1][1] === entry.row &&
			currentStep[1][1][0] === entry.col
		) {
			return "bg-ibm-green";
		} else if (entry.name === "NAN") {
			return "bg-ibm-gray";
		} else if (entry.name === "UNUSED") {
			return "bg-white";
		} else return "bg-ibm-pink";
	};
	return <div className={`w-8 h-8 ${getColor()} border border-black`}></div>;
};

export default GridSquare;

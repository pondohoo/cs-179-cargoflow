import { useState } from "react";

const GridSquare = ({ entry, currentStep }) => {
	const [showPopup, setShowPopup] = useState(false);

	const handleMouseEnter = () => {
		if (entry.name != "NAN" && entry.name != "UNUSED")
		{
			setShowPopup(true);
		}
	};

	const handleMouseLeave = () => {
		setShowPopup(false);
	};
	const getColor = () => {
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
	return (
		<div
			className={`w-8 h-8 ${getColor()} border border-black relative`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{showPopup && (
				<div className="absolute z-10 bg-white text-black border border-black p-1 text-xs">
					{`Name: ${entry.name}, Coordinates: (${entry.row}, ${entry.col})`}
				</div>
			)}
		</div>
	);
};


export default GridSquare;

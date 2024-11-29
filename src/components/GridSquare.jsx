import { useState } from "react";

const GridSquare = ({ entry, currentStep }) => {
	const [showPopup, setShowPopup] = useState(false);

	const handleMouseEnter = () => {
		if (entry.name != "NAN" && entry.name != "UNUSED" && entry.name != "")
		{
			setShowPopup(true);
		}
	};

	const handleMouseLeave = () => {
		setShowPopup(false);
	};
	const getColor = () => {
		if (currentStep && entry.row > 12 || entry.col > 36) {
			 {
				
			}
		}

		if (
			currentStep &&
			currentStep[1][0][0] === entry.row &&
			currentStep[1][0][1] === entry.col
		) {
			return "bg-ibm-orange";
		} else if(
			currentStep &&
			currentStep[1][1][0] === entry.row &&
			currentStep[1][1][1] === entry.col
		) {
			return "bg-ibm-green";
		} else if (
			(entry.row === 13 && entry.col === 37) ||
			(entry.row === 14 && entry.col === 38) ||
			(entry.row === 15 && entry.col === 39)
		) {
			return "bg-ibm-purple opacity-50";
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

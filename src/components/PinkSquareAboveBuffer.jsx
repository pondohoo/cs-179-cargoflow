import GridSquare from "./GridSquare"

const PinkSquareAboveBuffer = ({ currentStep }) => {
  console.log("currentStep is now for pinksquareabovebuffer", currentStep);
  const entry = {
    row: 14,
    col: 38,
    name: "",
    weight: 0,
  }
	return (
		<div>
			<GridSquare entry={entry} currentStep={currentStep} />
		</div>
	);
};

export default PinkSquareAboveBuffer
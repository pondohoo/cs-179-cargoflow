import GridSquare from "./GridSquare";

const LoadingTruck = ({ currentStep }) => {
	const entry = {
		row: 15,
		col: 39,
		name: "",
		weight: 0,
	};
	return (
		<div>
			<GridSquare entry={entry} currentStep={currentStep} />
		</div>
	);
};

export default LoadingTruck;

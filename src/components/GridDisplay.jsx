import BufferGrid from "./BufferGrid";
import Grid from "./Grid";
import LoadingTruck from "./LoadingTruck";
import StepHandler from "./StepHandler";

const GridDisplay = ({ manifest, currentStep }) => {
	return (
		<div className="flex gap-2">
			<BufferGrid manifest={manifest} currentStep={currentStep} />
			<div className="self-center">
				<LoadingTruck currentStep={currentStep} />
			</div>
			<div className="gap-2 flex-col flex">
				<Grid manifest={manifest} currentStep={currentStep} />
			</div>
		</div>
	);
};

export default GridDisplay;

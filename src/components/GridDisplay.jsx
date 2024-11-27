import BufferGrid from './BufferGrid';
import Grid from './Grid';
import StepHandler from './StepHandler';

const GridDisplay = () => {
  return (
		<div className="flex gap-2">
			<BufferGrid manifest={manifest} currentStep={currentStep} />
			<div className="gap-2 flex-col flex">
				<Grid manifest={manifest} currentStep={currentStep} />
				<StepHandler
					setManifest={setManifest}
					manifest={manifest}
					operation={operation}
					currentStep={currentStep}
					optimalSteps={optimalSteps}
					setOptimalSteps={setOptimalSteps}
					setCurrentStep={setCurrentStep}
				/>
			</div>
		</div>
	);
}

export default GridDisplay
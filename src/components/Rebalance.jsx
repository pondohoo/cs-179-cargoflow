import GridDisplay from "./GridDisplay"
import StepHandler from "./StepHandler";

const Rebalance = ({manifest,
					operation,
					currentStep,
					optimalSteps,
					setOptimalSteps,
					setCurrentStep,setManifest}) => {
  return (
    <div className="flex-col flex items-center justify-center">
      <GridDisplay
        manifest={manifest}
        currentStep={currentStep}
      />
      <StepHandler 
        manifest={manifest} 
        setManifest={setManifest} 
        operation={operation} 
        optimalSteps={optimalSteps} 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        setOptimalSteps={setOptimalSteps}
      />
    </div>
  );
}

export default Rebalance
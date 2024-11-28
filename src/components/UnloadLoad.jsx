"use client"

import { useState } from "react"
import UnloadLoadPrompt from "./UnloadLoadPrompt"
import GridDisplay from "./GridDisplay"
import StepHandler from "./StepHandler"

const UnloadLoad = ({manifest, operation, currentStep, setManifest, optimalSteps, setOptimalSteps, setCurrentStep}) => {
  console.log("manifest at unloadload stage is ", manifest)
    const [containersToLoad, setContainersToLoad] = useState([])
    const [containersToUnload, setContainersToUnload] = useState([])
    const [prompting, setPrompting] = useState(true)
  return (
		<div>
			<div className="flex flex-col">
			
				<GridDisplay manifest={manifest} currentStep={currentStep} />
				containersToLoad: {containersToLoad.join(", ")}
				<br />
				containersToUnload: {containersToUnload.join(", ")}
				{prompting ? (
					<UnloadLoadPrompt
						manifest={manifest}
						setPrompting={setPrompting}
						setContainersToLoad={setContainersToLoad}
						setContainersToUnload={setContainersToUnload}
						optimalSteps={optimalSteps}
						setOptimalSteps={setOptimalSteps}
						setCurrentStep={setCurrentStep}
						containersToLoad={containersToLoad}
						containersToUnload={containersToUnload}
					/>
				) : (
					<StepHandler
						manifest={manifest}
						setManifest={setManifest}
						operation={operation}
						optimalSteps={optimalSteps}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
						setOptimalSteps={setOptimalSteps}
					/>
				)}
			</div>
		</div>
	);
}

export default UnloadLoad
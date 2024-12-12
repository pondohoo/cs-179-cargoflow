"use client"

import { useEffect, useState } from "react"
import UnloadLoadPrompt from "./UnloadLoadPrompt"
import GridDisplay from "./GridDisplay"
import StepHandler from "./StepHandler"
import PinkSquareAboveBuffer from "./PinkSquareAboveBuffer"
import PinkSquareAboveShip from "./PinkSquareAboveShip"
import LoadingTruck from "./LoadingTruck"

const UnloadLoad = ({manifest, operation, currentStep, setManifest, optimalSteps, setOptimalSteps, setCurrentStep}) => {
  console.log("manifest at unloadload stage is ", manifest)
	const [containersToLoad, setContainersToLoad] = useState(() => {
		const savedContainersToLoad = localStorage.getItem("containersToLoad");
		return savedContainersToLoad ? JSON.parse(savedContainersToLoad) : [];
	});
    const [containersToUnload, setContainersToUnload] = useState(() => {
			const savedContainersToUnload = localStorage.getItem("containersToUnload");
			return savedContainersToUnload ? JSON.parse(savedContainersToUnload) : [];
		});
    const [prompting, setPrompting] = useState(() => {
		if (currentStep === null)
		{
			return true
		}
		else return false
	})
	useEffect(() => {
		if (containersToLoad.length > 0) {
			localStorage.setItem("containersToLoad", JSON.stringify(containersToLoad));
		}
		if (containersToUnload.length > 0) {
			localStorage.setItem("containersToUnload", JSON.stringify(containersToUnload));
		}
	}, [containersToLoad, containersToUnload]);
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
						containersToLoad={containersToLoad}
						containersToUnload={containersToUnload}
						setDone={setDone}
					/>
				)}
			</div>
		</div>
	);
}

export default UnloadLoad
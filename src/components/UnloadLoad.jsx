"use client"

import { useState } from "react"
import UnloadLoadPrompt from "./UnloadLoadPrompt"
import GridDisplay from "./GridDisplay"

const UnloadLoad = ({manifest, currentStep, optimalSteps, setOptimalSteps, setCurrentStep}) => {
  console.log("manifest at unloadload stage is ", manifest)
    const [containersToLoad, setContainersToLoad] = useState([])
    const [containersToUnload, setContainersToUnload] = useState([])
    const [prompting, setPrompting] = useState(true)
  return (
		<div>
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
				<>
					<GridDisplay manifest={manifest} currentStep={currentStep} />
					containersToLoad: {containersToLoad.join(", ")}
					<br />
					containersToUnload: {containersToUnload.join(", ")}
				</>
			)}
		</div>
	);
}

export default UnloadLoad
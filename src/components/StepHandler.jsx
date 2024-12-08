import { useEffect, useState } from "react";
import AdvanceStep from "./AdvanceStep";
 
import loadUnload from "@/utils/loadUnload";
import rebalance from "@/utils/rebalance";
 
const StepHandler = ({
	manifest,
	setManifest,
	containersToLoad = null,
	containersToUnload = null,
	operation,
	optimalSteps,
	currentStep,
	setCurrentStep,
	setOptimalSteps,
}) => {
	const [operationDuration, setOperationDuration] = useState(0);
 
	const getMoves = () => {
		if (manifest === null) {
			throw new Error("No manifest found");
		}
		const startTime = performance.now();
		let generatedOptimalSteps;
		if (operation === "rebalance") {
			generatedOptimalSteps = rebalance(manifest);
		} else {
			generatedOptimalSteps = loadUnload(manifest, containersToLoad, containersToUnload);
		}
		const endTime = performance.now();
		setOperationDuration(endTime - startTime);
		setOptimalSteps(generatedOptimalSteps);
		setCurrentStep([0, generatedOptimalSteps[0]]);
		console.log("optimalSteps", generatedOptimalSteps);
	};
 
	const handleManifestUpdate = () => {
		const currentCol = currentStep[1][0][1];
		const currentRow = currentStep[1][0][0];
		const currentEntry = (currentRow - 1) * 12 + (currentCol - 1);
		const currentWeight = manifest[currentEntry].weight;
		const currentName = manifest[currentEntry].name;
		console.log(
			"currentCol",
			currentCol,
			"currentRow",
			currentRow,
			"entry to update",
			"currentWeight",
			currentWeight,
			"currentName",
			currentName
		);
		const nextCol = currentStep[1][1][1];
		const nextRow = currentStep[1][1][0];
		const nextEntry = (nextRow - 1) * 12 + (nextCol - 1);
		console.log("nextCol", nextCol, "nextRow", nextRow);
		const newManifest = [...manifest];
		newManifest[currentEntry] = {
			...newManifest[currentCol - currentRow],
			name: "UNUSED",
			weight: 0,
		};
		newManifest[nextEntry] = {
			...newManifest[nextCol - nextRow],
			name: currentName,
			weight: currentWeight,
		};
		return newManifest;
	};
 
	const nextStep = () => {
		if (
			currentStep[0] === optimalSteps.length - 1 ||
			!currentStep ||
			!optimalSteps
		) {
			setCurrentStep(null);
			return;
		}
		setManifest(handleManifestUpdate);
		setCurrentStep([currentStep[0] + 1, optimalSteps[currentStep[0] + 1]]);
	};
 
	return (
		<div>
			<AdvanceStep
				progress={nextStep}
				optimalSteps={optimalSteps}
				manifest={manifest}
				start={getMoves}
				currentStep={currentStep}
			/>
			<p>Operation Duration: {operationDuration.toFixed(2)} ms</p>
		</div>
	);
};
 
export default StepHandler;
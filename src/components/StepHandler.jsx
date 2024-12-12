import { useEffect, useState } from "react";
import AdvanceStep from "./AdvanceStep";
import DisplayInstructions from "./DisplayInstructions";
 
import loadUnload from "@/utils/loadUnload";
import rebalance from "@/utils/rebalance";
import ExportManifest from "./ExportManifest";
 
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
	setDone,
}) => {
	const [operationDuration, setOperationDuration] = useState(0);

	const getMoves = () => {
		if (manifest === null) {
			throw new Error("No manifest found");
		}
		const startTime = performance.now();
		let generatedOptimalSteps;
		let generatedCost;
		if (operation === "rebalance") {
			const generatedOptimalStepsAndCost = rebalance(manifest);
			const { listOfMoves, cost } = generatedOptimalStepsAndCost;
			generatedOptimalSteps = listOfMoves;
			generatedCost = cost;
		} else {
			const generatedOptimalStepsAndCost = loadUnload(manifest, containersToLoad, containersToUnload);
			const { listOfMoves, cost } = generatedOptimalStepsAndCost;
			generatedOptimalSteps = listOfMoves;
			generatedCost = cost;
		}
		const endTime = performance.now();
		setOperationDuration(endTime - startTime);
		setOptimalSteps(generatedOptimalSteps);
		setCurrentStep([0, generatedOptimalSteps[0]]);
		console.log("optimalSteps", generatedOptimalSteps);
		console.log("currentstep first step is", [0, generatedOptimalSteps[0]]);
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
		console.log("newManifest", newManifest);
		newManifest[currentEntry] = {
			...newManifest[currentCol - currentRow],
			name: "UNUSED",
			weight: 0,
			row: currentRow,
			col: currentCol,
		};
		newManifest[nextEntry] = {
			...newManifest[nextCol - nextRow],
			name: currentName,
			weight: currentWeight,
			row: nextRow,
			col: nextCol,
		};
		return newManifest;
	};
 
	const nextStep = () => {
		setManifest(handleManifestUpdate);
		console.log("currentStep", currentStep);
		if (
			currentStep[0] === optimalSteps.length - 1 ||
			!currentStep ||
			!optimalSteps
		) {
			setCurrentStep(null);
			setDone(true);
			return;
		}
		setCurrentStep([currentStep[0] + 1, optimalSteps[currentStep[0] + 1]]);
	};
	
	const formatDuration = (duration) => {
		const minutes = Math.floor(duration / 60000);
		const seconds = ((duration % 60000) / 1000).toFixed(2);
		return `${minutes}m ${seconds}s`;
	};

	return (
		<div>
			<p>Operation Duration: {formatDuration(operationDuration)}</p>
			<div className="flex justify-center items-center space-x-4">
				<AdvanceStep
					progress={nextStep}
					optimalSteps={optimalSteps}
					manifest={manifest}
					start={getMoves}
					currentStep={currentStep}
				/>
				<DisplayInstructions
					optimalSteps={optimalSteps}
					currentStep={currentStep}
					manifest={manifest}
				/>
			</div>
		</div>
	);
};
 
export default StepHandler;
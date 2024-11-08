import { useEffect, useState } from "react";
import AdvanceStep from "./AdvanceStep";

import loadUnload from "@/utils/loadUnload";
import rebalance from "@/utils/rebalance";

const StepHandler = ({ manifest, operation }) => {
	const [optimalSteps, setOptimalSteps] = useState();
	if (localStorage.getItem("optimalSteps")) {
		setOptimalSteps(JSON.parse(localStorage.getItem("optimalSteps")));
	}

	const [currentStep, setCurrentStep] = useState();
	if (localStorage.getItem("currentStep")) {
		setCurrentStep(JSON.parse(localStorage.getItem("currentStep")));
	}

	useEffect(() => {
		if (optimalSteps) {
			localStorage.setItem("optimalSteps", JSON.stringify(optimalSteps));
		}
		if (currentStep) {
			localStorage.setItem("currentStep", JSON.stringify(currentStep));
		}
	}, [optimalSteps, currentStep]);
	const getMoves = () => {
		if (manifest === null) {
			throw new Error("No manifest found");
		}
		if (operation === "rebalance") {
			setOptimalSteps(rebalance(manifest));
			console.log("optimalSteps", optimalSteps);
		} else {
			setOptimalSteps(loadUnload(manifest));
			console.log("optimalSteps", optimalSteps);
		}
	};
	const nextStep = () => {
		if (currentStep[0] === optimalSteps.length - 1) {
			return;
		}
		setCurrentStep([currentStep[0] + 1, optimalSteps[currentStep[0] + 1]]);
	};
	getMoves();
	return (
		<AdvanceStep
			progress={nextStep}
			optimalSteps={optimalSteps}
			manifest={manifest}
		/>
	);
};

export default StepHandler;

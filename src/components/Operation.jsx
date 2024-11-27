"use client";

import { useEffect, useState } from "react";
import Grid from "./Grid";
import UploadManifest from "./UploadManifest";
import BufferGrid from "./BufferGrid";

import StepHandler from "./StepHandler";

const Operation = ({ operation }) => {
	const [manifest, setManifest] = useState(() => {
    const savedManifest = localStorage.getItem("manifest");
    return savedManifest ? JSON.parse(savedManifest) : null
  });
  const [optimalSteps, setOptimalSteps] = useState(() => {
		const savedOptimalSteps = localStorage.getItem("optimalSteps");
		return savedOptimalSteps ? JSON.parse(savedOptimalSteps) : null;
	});

	const [currentStep, setCurrentStep] = useState(() => {
		const savedCurrentStep = localStorage.getItem("currentStep");
		return savedCurrentStep ? JSON.parse(savedCurrentStep) : null;
	});

	const [shipName, setShipName] = useState("");

	useEffect(() => {
		if (manifest) {
			localStorage.setItem("manifest", JSON.stringify(manifest));
		}
    if (optimalSteps) {
			localStorage.setItem("optimalSteps", JSON.stringify(optimalSteps));
		}
		if (currentStep) {
			localStorage.setItem("currentStep", JSON.stringify(currentStep));
		}
	}, [manifest, optimalSteps, currentStep]);
	return (
		<div className="flex flex-col">
			{shipName && <div>Ship: {shipName.slice(0, -4)}</div>}
			{!manifest ? (
				<UploadManifest setShipName={setShipName} setManifest={setManifest} />
			) : (
				<div className="flex gap-2">
					<BufferGrid manifest={manifest} currentStep={currentStep}/>
					<div className='gap-2 flex-col flex'>
						<Grid manifest={manifest} currentStep={currentStep} />
						<StepHandler setManifest={setManifest} manifest={manifest} operation={operation} currentStep={currentStep} optimalSteps={optimalSteps} setOptimalSteps={setOptimalSteps} setCurrentStep={setCurrentStep} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Operation;

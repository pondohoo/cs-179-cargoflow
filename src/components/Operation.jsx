"use client";

import { useEffect, useState } from "react";
import UploadManifest from "./UploadManifest";

import StepHandler from "./StepHandler";
import UnloadLoad from "./UnloadLoad";
import Rebalance from "./Rebalance";
import ExportManifest from "./ExportManifest";

const Operation = ({ operation }) => {
	console.log("operation", operation);
	const [done, setDone] = useState(false);
	const [readyToExport, setReadyToExport] = useState(false);
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

	const handleFinish = () => {
		setReadyToExport(true);
	}
	return (
		<div className="flex flex-col">
			{shipName && <div>Ship: {shipName.slice(0, -4)}</div>}
			{!readyToExport ? (
				!manifest ? (
					<UploadManifest setShipName={setShipName} setManifest={setManifest} />
				) : operation === "load/unload" ? (
					<>
						{console.log("manifest at operation stage is ", manifest)}
						<UnloadLoad
							manifest={manifest}
							operation={operation}
							currentStep={currentStep}
							optimalSteps={optimalSteps}
							setOptimalSteps={setOptimalSteps}
							setCurrentStep={setCurrentStep}
							setManifest={setManifest}
							setDone={setDone}
						/>
						{done && (
							<div className="flex justify-center">
								<button
									className="bg-ibm-yellow p-2 text-black"
									onClick={handleFinish}
								>
									Finish
								</button>
							</div>
						)}
					</>
				) : (
					<>
						<Rebalance
							manifest={manifest}
							operation={operation}
							currentStep={currentStep}
							optimalSteps={optimalSteps}
							setOptimalSteps={setOptimalSteps}
							setCurrentStep={setCurrentStep}
							setManifest={setManifest}
							setDone={setDone}
						/>
						{done && (
							<div className="flex justify-center">
								<button
									className="bg-ibm-yellow p-2 text-black"
									onClick={handleFinish}
								>
									Finish
								</button>
							</div>
						)}
					</>
				)
			) : !readyToExport ? (
				<div className="flex justify-center">
					<button
						className="bg-ibm-yellow p-2 text-black"
						onClick={handleFinish}
					>
						Finish
					</button>
				</div>
			) : (
				<ExportManifest manifest={manifest} shipName={shipName} />
			)}
		</div>
	);
};

export default Operation;

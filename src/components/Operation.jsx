"use client";

import { useEffect, useState } from "react";
import UploadManifest from "./UploadManifest";

import UnloadLoad from "./UnloadLoad";
import Rebalance from "./Rebalance";
import ExportManifest from "./ExportManifest";

const Operation = ({ operation }) => {
	console.log("operation", operation);
	const [done, setDone] = useState(() => {
		const savedDone = localStorage.getItem("done");
		return savedDone ? JSON.parse(savedDone) : false;
	});
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

	const [shipName, setShipName] = useState(() => {
		return localStorage.getItem("shipName") || "";
	});

	useEffect(() => {
		if (manifest) {
			localStorage.setItem("manifest", JSON.stringify(manifest));
		}
		if (done) {
			localStorage.removeItem("currentStep");
			localStorage.setItem("done", JSON.stringify(done));
		}
    	if (optimalSteps) {
			localStorage.setItem("optimalSteps", JSON.stringify(optimalSteps));
		}
		if (currentStep) {
			localStorage.setItem("currentStep", JSON.stringify(currentStep));
		}
		if (shipName) {
			localStorage.setItem("shipName", shipName);
		}
	}, [manifest, optimalSteps, currentStep, shipName,done]);

	const handleFinish = () => {
		setReadyToExport(true);
	}
	return (
		<div className="flex flex-col">
			{shipName && <div className="text-black items-center justify-center border-2 border-black bg-white px-2 py-1 m-0 w-fit">
				Ship: {shipName.slice(0, -4)}</div>}
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
									className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
									className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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
						className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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

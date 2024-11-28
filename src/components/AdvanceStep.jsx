"use client";
import { useState } from "react";

const AdvanceStep = ({ start, currentStep, progress }) => {
	const [inProgress, setInProgress] = useState(() => {
		if (currentStep === null) {
			return false;
		} else return true;
});

  const handleStart = () => {
    setInProgress(true);
    start();
  }
	
	return (
		<>
			{!inProgress ? (
				<button onClick={handleStart} className="bg-ibm-yellow p-2 text-black">
					Start
				</button>
			) : (
				<button onClick={progress} className="bg-ibm-yellow p-2 text-black">
					Progress
				</button>
			)}
		</>
	);
};

export default AdvanceStep;

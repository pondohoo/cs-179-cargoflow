"use client";
import { useState } from "react";

const AdvanceStep = ({ start, progress }) => {
	const [inProgress, setInProgress] = useState(false);

  const handleStart = () => {
    setInProgress(true);
    start();
  }
	
	return (
		<>
			{!inProgress ? (
				<button onClick={handleStart} className="bg-ibm-yellow text-black">
					Start
				</button>
			) : (
				<button onClick={progress} className="bg-ibm-yellow text-black">
					Progress
				</button>
			)}
		</>
	);
};

export default AdvanceStep;

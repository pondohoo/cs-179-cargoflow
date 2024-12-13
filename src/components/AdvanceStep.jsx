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
  const done = localStorage.getItem("done");
	
	return (
		<>
			{!inProgress ? ( !done && (
				<button onClick={handleStart} className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
					Start
				</button>)
			) : ( currentStep ? (
				<button onClick={progress} className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">
					Progress
				</button> ) : ( console.log("fweiufhewiufhewfhewuifhewifuhweuifw"))
			)}
		</>
	);
};

export default AdvanceStep;

"use client";
import { useState } from "react";

const AdvanceStep = ({ progress }) => {
	const [inProgress, setInProgress] = useState(false);

  const start = () => {
    setInProgress(true);
    progress();
  }
	
	return (
		<>
			{!inProgress ? (
				<button onClick={start} className="bg-ibm-yellow text-black">
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

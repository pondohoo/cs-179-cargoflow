import { useEffect, useState } from "react";
import AdvanceStep from "./AdvanceStep";
import DisplayInstructions from "./DisplayInstructions";

import loadUnload from "@/utils/loadUnload";
import rebalance from "@/utils/rebalance";
import addLogEntry from "@/utils/addLogEntry";

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
  const [currentTime, setCurrentTime] = useState(() => {
		const savedCurrentTime = localStorage.getItem("currentTime");
		return savedCurrentTime ? JSON.parse(savedCurrentTime) : null;
	});
  const [generatedCost, setGeneratedCost] = useState(() => {
		const savedGeneratedCost = localStorage.getItem("generatedCost");
		return savedGeneratedCost ? JSON.parse(savedGeneratedCost) : null;
	});

  useEffect(() => {
	if (currentTime) {
		localStorage.setItem("currentTime", JSON.stringify(currentTime));
	}
	if (generatedCost) {
		localStorage.setItem("generatedCost", JSON.stringify(generatedCost));
	}},[currentTime,generatedCost])

  const getMoves = () => {
    if (manifest === null) {
      throw new Error("No manifest found");
    }
    const startTime = performance.now();
	  let generatedOptimalSteps;
	  let cost;
    if (operation === "rebalance") {
	  const generatedOptimalStepsAndCost = rebalance(manifest);
	  generatedOptimalSteps = generatedOptimalStepsAndCost[0];
	  cost = generatedOptimalStepsAndCost[1];
	  console.log("generatedOptimalSteps is", generatedOptimalSteps);
      console.log("generatedCost is", cost);
      setGeneratedCost(cost);
    } else {
      const generatedOptimalStepsAndCost = loadUnload(
        manifest,
        containersToLoad,
        containersToUnload
      );
      const listOfMoves = generatedOptimalStepsAndCost;
      generatedOptimalSteps = listOfMoves;
      // setGeneratedCost(cost);
    }
    setCurrentTime(Date.now());
    setOptimalSteps(generatedOptimalSteps);
    setCurrentStep([0, generatedOptimalSteps[0]]);
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

	if (manifest[nextEntry].name == "UNUSED")
		{ 
			addLogEntry("\"" + currentName + "\"" + " moved from position [" + currentRow + "," + currentCol + "] to position [" + nextRow + "," + nextCol + "]");
		}

    if (!(
      manifest[nextEntry] &&
      currentName != "UNUSED" &&
      manifest[nextEntry].name != "UNUSED"
    )) {
      newManifest[currentEntry] = {
        ...newManifest[currentCol - currentRow],
        name: "UNUSED",
        weight: 0,
        row: currentRow,
        col: currentCol,
      };
			if (!(nextRow == 15 && nextCol == 39)) {
				newManifest[nextEntry] = {
					...newManifest[nextCol - nextRow],
					name: currentName,
					weight: currentWeight,
					row: nextRow,
					col: nextCol,
				};
			}
    }

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

  return (
    <div>
      {generatedCost > 0 && (
        <p>
          Finish Time:{" "}
          {new Date(currentTime + generatedCost * 60000).toLocaleTimeString(
            "en-GB",
            { hour: "2-digit", minute: "2-digit" }
          )}
        </p>
      )}
      <div className="flex justify-center items-center space-x-4 mt-10">
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

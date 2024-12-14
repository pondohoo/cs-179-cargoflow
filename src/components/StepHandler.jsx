import { useEffect, useState } from "react";
import AdvanceStep from "./AdvanceStep";
import DisplayInstructions from "./DisplayInstructions";
import addLogEntry from "@/utils/addLogEntry";

import loadUnload from "@/utils/loadUnload";
import rebalance from "@/utils/rebalance";

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
  const [showWeightPopup, setShowWeightPopup] = useState(false);
  const [containerWeight, setContainerWeight] = useState("");
  const [pendingEntry, setPendingEntry] = useState(null);
  const [loadUnloadOperationList, setLoadUnloadOperationList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
	if (currentTime) {
		localStorage.setItem("currentTime", JSON.stringify(currentTime));
	}
	if (generatedCost) {
		localStorage.setItem("generatedCost", JSON.stringify(generatedCost));
	}},[currentTime,generatedCost])

  const getMoves = async () => {
    if (manifest === null) {
      throw new Error("No manifest found");
    }
    let generatedOptimalSteps;
    let cost;
    
    setIsLoading(true);
    setTimeout(() => {
      if (operation === "rebalance") {
        const generatedOptimalStepsAndCost = rebalance(manifest);
        generatedOptimalSteps = generatedOptimalStepsAndCost[0];
        if (generatedOptimalSteps.length === 0) {
          setDone(true);
          setIsLoading(false);
          return;
        }
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
        generatedOptimalSteps = generatedOptimalStepsAndCost[0];
        if (generatedOptimalSteps.length === 0) {
          setDone(true);
          setIsLoading(false);
          return;
        }
        cost = generatedOptimalStepsAndCost[2];
        setGeneratedCost(cost);
        setLoadUnloadOperationList(generatedOptimalStepsAndCost[1]);
      }
      setCurrentTime(Date.now());
      setOptimalSteps(generatedOptimalSteps);
      setCurrentStep([0, generatedOptimalSteps[0]]);
      setIsLoading(false);
    }, 0);
  };

  let loadPointer = 0;
  const alignedList = loadUnloadOperationList.map((value) => {
    if (value === 1 && loadPointer < containersToLoad.length) {
      return containersToLoad[loadPointer++];
    }
    return "";
  })
  console.log("alignedList", alignedList);

  const nextStep = () => {
    const currentCol = currentStep[1][0][1];
    const currentRow = currentStep[1][0][0];
    const currentEntry = currentRow == 15 && currentCol == 39 ? 194 : (currentRow - 1) * 12 + (currentCol - 1);
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


    // [truck, unused] [truck, ship], [ship, truck], [ship, ship], [ship, unused] (blocking)

    // list: [load=1, unload=0, crane=-1, blocking/balancing=-2]

    // ONLY LOADS: [truck, unused](load) [ship, truck](crane) [truck, unused](load) 
    // ONLY UNLOADS: [ship, truck](unload) [truck, ship](crane) [ship, truck](unload)

    // loadUnloadList:    [1, 0, 1, -1, 0, -2]
    // containersToLoad:  [A, x, B,  x, x,  x]

    if (loadUnloadOperationList[currentStep[0]] === 1) { // load (set to to containerstoload[0])      
      addLogEntry(`"${alignedList[currentStep[0]]}" is onloaded.`);
      setShowWeightPopup(true);
      setPendingEntry({
        nextEntry,
        nextRow,
        nextCol,
        containerName: alignedList[currentStep[0]],
      });
      return;
    } else if (loadUnloadOperationList[currentStep[0]] === 0) { // unload (set from to UNUSED)
      addLogEntry(`"${currentName}" is offloaded.`);
      newManifest[currentEntry] = {
        ...newManifest[currentCol - currentRow],
        name: "UNUSED",
        weight: 0,
        row: currentRow,
        col: currentCol,
      };
    } else if (loadUnloadOperationList[currentStep[0]] !== -1) { // balance/blocking (swap)
      addLogEntry(`"${currentName}" is moved from [ ${currentRow} , ${currentCol} ] to [ ${nextRow} , ${nextCol} ].`);
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
    }
    setManifest(newManifest);
    moveToNextStep();
  };

  const handleWeightSubmit = (event) => {
    event.preventDefault();
    if (!containerWeight.trim()) {
      setErrorMessage("Please enter container weight.");
      return;
    }
    if (containerWeight.length > 5) {
      setErrorMessage("Container weight should not exceed 5 digits.");
      return;
    }
    if (pendingEntry) {
      const { nextEntry, nextRow, nextCol, containerName } = pendingEntry;
      const newManifest = [...manifest];
      newManifest[nextEntry] = {
        ...newManifest[nextCol - nextRow],
        name: containerName,
        weight: containerWeight,
        row: nextRow,
        col: nextCol,
      };
      setManifest(newManifest);
      setContainerWeight("");
      setPendingEntry(null);
      setShowWeightPopup(false);
      setErrorMessage("");
      moveToNextStep();
    }
  };

  const moveToNextStep = () => {
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
  
    const nextIndex = currentStep[0] + 1;
    console.log("nextIndex", nextIndex);
    setCurrentStep([nextIndex, optimalSteps[nextIndex]]);
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl text-ibm-gray font-bold">Loading...</p>
          </div>
        </div>
      )}
      {showWeightPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl text-ibm-gray font-bold mb-4">Container Weight</h2>
            <input
              type="number"
              placeholder="Enter container weight"
              value={containerWeight}
              onChange={(e) => setContainerWeight(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-4 py-2 mb-4 w-full"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              onClick={handleWeightSubmit}
              className="px-4 py-2 bg-ibm-green text-black font-medium rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}
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
          alignedList={alignedList}
        />
      </div>
    </div>
  );
};

export default StepHandler;

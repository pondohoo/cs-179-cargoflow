const DisplayInstructions = ({ optimalSteps, currentStep, manifest, alignedList }) => {
    console.log("DisplayInstructions alignedList", alignedList);
    let currentCol, currentRow, entry, name, nextCol, nextRow, nextEntry, nextName;
    if (currentStep) {
        currentCol = currentStep[1][0][1];
        currentRow = currentStep[1][0][0];
        entry = currentRow == 15 && currentCol == 39 ? 194 : (currentRow - 1) * 12 + (currentCol - 1);
        name = manifest[entry].name;
        nextCol = currentStep[1][1][1];
        nextRow = currentStep[1][1][0];
        nextEntry = nextRow == 15 && nextCol == 39 ? 194 : (nextRow - 1) * 12 + (nextCol - 1);
        nextName = manifest[nextEntry].name;
        if (alignedList && entry == 194 && nextName == "UNUSED") {
            name = alignedList[currentStep[0]];
            console.log(" DISPLAY INSTRUCTIONS CURR STEP ", name, "INDEX", currentStep[0]);
        }
    }

    console.log("DisplayInstructions optimalSteps", optimalSteps);
    console.log("DisplayInstructions currentStep", currentStep);
    const currentStepIndex = optimalSteps?.findIndex(
        (step) => JSON.stringify(step) === JSON.stringify(currentStep?.[1])
    )
    // console.log("CURRENTSTEP INDEX", currentStepIndex);

    return (
        <div>
            {currentStep && (
                <div className="bg-ibm-gray text-white overflow-y-auto max-h-48 px-4 py-2 rounded-md shadow-lg">
                    <h3 className="font-bold text-ibm-green text-lg">Current Instruction:</h3>
                    <p className="ml-4 text-base">
                        Move <span className="font-semibold text-ibm-blue">{nextName !== "UNUSED" ? "Crane" : name}</span> {" "}
                        from position <span className="font-semibold text-ibm-yellow">{entry == 194 ? "Truck" : `[ ${currentRow} , ${currentCol} ]`}</span>{" "}
                        to position <span className="font-semibold text-ibm-yellow">{nextEntry == 194 ? "Truck" : `[ ${nextRow} , ${nextCol} ]`}</span>
                    </p>
                    <h3 className="font-bold text-ibm-pink text-lg mt-2">Upcoming Instruction(s):</h3>
                    <ol className="list-decimal ml-4 pl-5 space-y-2">
                        {optimalSteps && optimalSteps
                            .slice(currentStepIndex + 1)
                            .map((step, index) => {
                            const currCol = step[0][1];
                            const currRow = step[0][0];
                            const newCol = step[1][1];
                            const newRow = step[1][0];
                            const currEntry = currRow == 15 && currCol == 39 ? 194 : (currRow - 1) * 12 + (currCol - 1);
                            let currName = manifest[currEntry].name;
                            const newEntry = newRow == 15 && newCol == 39 ? 194 : (newRow - 1) * 12 + (newCol - 1);
                            const newName = manifest[newEntry].name;
                            if (alignedList && currEntry == 194 && newName == "UNUSED") {
                                currName = alignedList[index + 1 + currentStepIndex];
                                console.log(" DISPLAY INSTRUCTIONS NEXT STEP ", currName, "INDEX", index + 1 + currentStepIndex);
                            }
                                
                            return (
                                <li key={index} className="text-base">
                                    Move <span className="font-semibold text-ibm-blue">{newName !== "UNUSED" ? "Crane" : currName}</span> {" "}
                                    from position <span className="font-semibold text-ibm-yellow">{currEntry == 194 ? "Truck" : `[ ${ currRow } , ${ currCol } ]`}</span>{" "}
                                    to position <span className="font-semibold text-ibm-yellow">{newEntry == 194 ? "Truck" : `[ ${ newRow } , ${ newCol } ]`}</span>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default DisplayInstructions;
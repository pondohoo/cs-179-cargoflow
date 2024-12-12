const DisplayInstructions = ({ optimalSteps, currentStep, manifest }) => {
    let currentCol, currentRow, entry, name, nextCol, nextRow;
    if (currentStep) {
        currentCol = currentStep[1][0][1];
        currentRow = currentStep[1][0][0];
        entry = (currentRow - 1) * 12 + (currentCol - 1);
        name = manifest[entry].name;
        nextCol = currentStep[1][1][1];
        nextRow = currentStep[1][1][0];
    }

    console.log("DisplayInstructions optimalSteps", optimalSteps);
    console.log("DisplayInstructions currentStep", currentStep);
    const currentStepIndex = currentStep ? optimalSteps.indexOf(currentStep[1]) : -1;
    console.log("currentStepIndex", currentStepIndex);

    if(currentStepIndex === -1) {
        return null;
    }

    return (
        <div className="bg-ibm-gray text-white overflow-y-auto max-h-48 px-4 py-2 rounded-md shadow-lg">
            {currentStep && (
                <div>
                    <h3 className="font-bold text-ibm-green text-lg">Current Instruction:</h3>
                    <p className="ml-4 text-base">
                        Move <span className="font-semibold text-ibm-blue">{name}</span> {" "}
                        from position <span className="font-semibold text-ibm-yellow">[ {currentRow} , {currentCol} ]</span>{" "}
                        to position <span className="font-semibold text-ibm-yellow">[ {nextRow} , {nextCol} ]</span>
                    </p>
                </div>
            )}
            <h3 className="font-bold text-ibm-pink text-lg mt-2">Upcoming Instruction(s):</h3>
            <ol className="list-decimal ml-4 pl-5 space-y-2">
                {optimalSteps && optimalSteps
                    .filter((_, index) => index > currentStepIndex)
                    .map((step, index) => {
                    const currCol = step[0][1];
                    const currRow = step[0][0];
                    const nextCol = step[1][1];
                    const nextRow = step[1][0];
                    const entry = (currRow - 1) * 12 + (currCol - 1);
                    const name = manifest[entry].name;
                        
                    return (
                        <li key={index} className="text-base">
                            Move <span className="font-semibold text-ibm-blue">{name}</span> {" "}
                            from position <span className="font-semibold text-ibm-yellow">[ {currRow} , {currCol} ]</span>{" "}
                            to position <span className="font-semibold text-ibm-yellow">[ {nextRow} , {nextCol} ]</span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default DisplayInstructions;
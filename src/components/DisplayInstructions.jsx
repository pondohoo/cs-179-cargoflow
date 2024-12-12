const DisplayInstructions = ({ optimalSteps, currentStep, manifest }) => {
    console.log("DisplayInstructions optimalSteps ", optimalSteps);
    console.log("DisplayInstructions currentStep ", currentStep);
    console.log("DisplayInstructions manifest ", manifest);

    let currentCol, currentRow, entry, weight, name, nextCol, nextRow;
    if (currentStep) {
        currentCol = currentStep[1][0][1];
        currentRow = currentStep[1][0][0];
        entry = (currentRow - 1) * 12 + (currentCol - 1);
        name = manifest[entry].name;
        nextCol = currentStep[1][1][1];
        nextRow = currentStep[1][1][0];
    }

    return (
        <div className="bg-green-500 text-black overflow-y-auto max-h-64">
            {currentStep && (
                <div>
                    <h3>Current Step</h3>
                    <p className="">
                        Move {name} at position {currentRow},{currentCol} to position {nextRow},{nextCol}
                    </p>
                </div>
            )}
            <h3>Instructions</h3>
            <ol>
                {optimalSteps && optimalSteps.map((step, index) => {
                    const currCol = step[0][1];
                    const currRow = step[0][0];
                    const nextCol = step[1][1];
                    const nextRow = step[1][0];
                    const entry = (currRow - 1) * 12 + (currCol - 1);
                    const name = manifest[entry].name;
                    const isCurrentStep = currentStep && currentRow === currRow && currentCol === currCol;
                    const isPreviousStep = index < optimalSteps.indexOf(currentStep);
                    const isNextStep = index > optimalSteps.indexOf(currentStep) && index <= optimalSteps.indexOf(currentStep) + 2;
                    
                    if (isPreviousStep || isCurrentStep || isNextStep) {
                        return (
                            <li key={index} className={isCurrentStep ? "font-bold" : isPreviousStep ? "text-gray-500" : ""}>
                                Move {name} at position {currRow},{currCol} to position {nextRow},{nextCol}
                            </li>
                        );
                    }
                    return null;
                })}
            </ol>
        </div>
    );
};

export default DisplayInstructions;
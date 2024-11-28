const wipeState = () => {
	console.log(localStorage.getItem("operation"));
	console.log(localStorage.getItem("manifest"));
    console.log(localStorage.getItem("optimalSteps"));
    console.log(localStorage.getItem("currentStep"));
	localStorage.removeItem("operation");
	localStorage.removeItem("manifest");
	localStorage.removeItem("optimalSteps");
	localStorage.removeItem("currentStep");
	localStorage.removeItem("containersToLoad");
	localStorage.removeItem("containersToUnload");
	console.log("operation wiped");
};

export default wipeState;

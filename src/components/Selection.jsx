"use client";
import { useState} from "react";
import Operation from "./Operation";
const Selection = () => {
	const [operation, setOperation] = useState(() => {
		const savedOperation = localStorage.getItem("operation");
		return savedOperation ? savedOperation : null;
	});

	const rebalance = (e) => {
		setOperation("rebalance");
		localStorage.setItem("operation", "rebalance");
	};
	const loadUnload = (e) => {
		setOperation("load/unload");
		localStorage.setItem("operation", "load/unload");
	};

	return (
		<div>
			{!operation ? (
				<div>
					<div className="text-xl text-center">Select Operation type</div>
					<div className="flex gap-2">
						<button onClick={rebalance} className="bg-ibm-pink p-5 text-xl">
							rebalance
						</button>
						<button onClick={loadUnload} className="bg-ibm-orange p-5 text-xl">
							load/unload
						</button>
					</div>
				</div>
			) : (
				<Operation operation={operation} />
			)}
		</div>
	);
};

export default Selection;

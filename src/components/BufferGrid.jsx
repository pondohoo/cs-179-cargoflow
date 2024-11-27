"use client";
import GridSquare from "./GridSquare";

const BufferGrid = ({ currentStep }) => {
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col-reverse">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex">
						{Array.from({length: 24}).map((_, index) => (
							<div key={index}>
								<GridSquare entry={entry} currentStep={currentStep} />
							</div>
                ))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Grid;

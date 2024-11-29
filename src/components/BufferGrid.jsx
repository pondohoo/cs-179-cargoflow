"use client";
import GridSquare from "./GridSquare";
import PinkSquareAboveBuffer from "./PinkSquareAboveBuffer";

const BufferGrid = ({ manifest, currentStep }) => {
	return (
		<div className='flex-col flex items-end'>
			<PinkSquareAboveBuffer currentStep={currentStep} />
			<div className="flex justify-center items-center">
				<div className="flex flex-col-reverse">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex">
							{manifest
								.slice(96 + i * 24, 96 + (i + 1) * 24)
								.map((entry, j) => {
									return (
										<GridSquare
											currentStep={currentStep}
											key={j}
											entry={entry}
										/>
									);
								})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BufferGrid;

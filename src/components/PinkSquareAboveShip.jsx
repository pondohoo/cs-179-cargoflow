import GridSquare from "./GridSquare";

const PinkSquareAboveShip = ({ currentStep }) => {
  const entry = {
    row: 13,
    col: 37,
    name: "",
    weight: 0,
  };
  return (
    <div>
      <GridSquare entry={entry} currentStep={currentStep} />
    </div>
  );
};

export default PinkSquareAboveShip;
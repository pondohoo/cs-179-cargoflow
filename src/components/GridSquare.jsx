const GridSquare = ({entry}) => {
  const getColor = () => {
		if (entry.name === "NAN") {
			return "bg-ibm-gray";
		}
		if (entry.name === "UNUSED") {
			return "bg-white";
		}
    else return "bg-ibm-pink";
	}
  return (
	<div className={`w-8 h-8 ${getColor()} border border-black`}></div>
  )
}

export default GridSquare
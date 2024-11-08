import Operation from "@/components/Operation";

const animations = {
	start: {
		opacity: 0,
		y: 30,
	},
	end: {
		opacity: 1,
		y: 0,
	},
};

const Home = () => {
  
	return (
		<>
      <div className="bg-red-500 p-20 h-50 w-50"/>
		  <Operation/>
		</>
	);
};

export default Home;

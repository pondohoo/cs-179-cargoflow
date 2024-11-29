import { list } from "postcss";

const rebalance = (manifest) => {
	// const listOfMoves = [
	// 	[
	// 		[6, 2],
	// 		[1, 2],
	// 	],
	// 	[
	// 		[6, 1],
	// 		[12, 2],
	// 	],
	// 	[
	// 		[5, 2],
	// 		[11, 2],
	// 	],
	// 	[
	// 		[5, 1],
	// 		[11, 3],
	// 	],
	// ]; // move [6, 2] to [1, 2], then [6, 1] to [8, 2], etc.
	
	console.log("starting...");
	return greedy(manifest);
};

const balanceCheck = (manifest) => {
	let left = 0;
	let right = 0;
	let total = 0;

	for(let i = 0; i < 96; i++){
		const temp = manifest[i].weight;
		total += temp;
		if((i%12) < 6){
			left += temp;
		}
		else {
			right += temp;

		}
	}
	

	//left and right are within 10% of each other
	let dif = Math.abs((left - right)/((left+right)/2)) * 100; 

	if(left > right){
		return [dif,"left"];
	}

	//return the difference
	return [dif,"right"];
}

//finds the highest occupied box per col
const findtopbox = (manifest) => {
	let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	for(let col = 1; col < 13; col++){
		for(let row = 8; row > 0; row--){
			const boxnum = (row - 1) * 12 + (col - 1);
			if(manifest[boxnum].weight > 0){
				arr[col-1]=boxnum;
				break;
			}
		}
	}
	return arr;
}

//finds the topmost empty slot per col
const findtopempty = (manifest) => {
	let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	for(let col = 1; col < 13; col++){
		for(let row = 8; row > 0; row--){
			const boxnum = (row - 1) * 12 + (col - 1);
			if(manifest[boxnum].name != "NAN" && manifest[boxnum].weight == 0){
				arr[col-1]=boxnum;
			}
		}
	}
	return arr;
}

//find the next lowest open slot on right side
const findnextrighttop = (manifest) => {
	let arr = findtopempty(manifest);
	let smallest = 96;
	for(let i = 6; i<12; i++){
		if(arr[i]<smallest){
			smallest = arr[i];
		}
	}
	return smallest;
}

//find the next lowest open slot on left side
const findnextlefttop = (manifest) => {
	let arr = findtopempty(manifest);
	let biggest = 0;
	let row = 8;
	for(let i = 5; i>-1; i--){
		let currow = Math.floor(arr[i]/12);
		if(currow <= row){
			row = currow;
			if(arr[i]>biggest){
				biggest = arr[i];
			}
		}
	}
	return biggest;
}

const findCost = (manifest, from, to) => {
	let frm = [manifest[from].col, manifest[from].row, from];
	let too =  [manifest[to].col, manifest[to].row, to];
	let cost = 0;
	let cur = frm;

	if (frm[0] < too[0]){ //move right
		while(frm[2] != too[2]){
			if(frm[0] == too[0]){ //down movement
				if(frm[1] != too[1]){
					cur[1] -= 1;
					cur[2] -= 12;
					cost++;
				}
			}
			else{
				if(manifest[cur[2]+1].name == "UNUSED"){ //check if right is empty
					cur[0]++;
					cur[2]++;
					cost++;
				}
				else{ // move up
					cur[1]++;
					cur[2] += 12;
					cost++;
				}
			}
		}
	}
	else { //move left
		while(frm[2] != too[2]){
			if(frm[0] == too[0]){ // down movement
				if(frm[1] != too[1]){
					cur[1] -= 1;
					cur[2] -= 12;
					cost++;
				}
			}
			else{
				if(manifest[cur[2]-1].name == "UNUSED"){ // check is left is empty
					cur[0]--;
					cur[2]--;
					cost++;
				}
				else{ //move up
					cur[1]++;
					cur[2] += 12;
					cost++;
				}
			}
		}
	}
	return cost;
}



const greedy = (manifest) => {
	const listOfMoves = [

		
	];

	let curbestmove =[
		
	];

	//update to 96 after we get a 9th row
	let crane = 84; 

	//cost of movemnt
	let cost = 0; 

	let newManifest = JSON.parse(JSON.stringify(manifest));
	let bal = balanceCheck(newManifest);

	const map = {}; 
	while(bal[0] > 10){
		if(map[bal[0]]){
			map[bal[0]] += 1;
			if(map[bal[0]] > 3){
				console.log("move to sift it no work"); //change to sift after we make it!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				break;
			}
		}
		else {
			map[bal[0]] = 1;
		}

		
		
		if(bal[1] == "left"){ //left heavy
			let forced = false;
			let rightside = findnextrighttop(newManifest);
			let tempbest = JSON.parse(JSON.stringify(newManifest));
			let lefttop = findtopbox(newManifest);
			for(let i = 0; i<6; i++){
				let boxnum=lefttop[i];
				if(boxnum != -1){
					let boxname = newManifest[boxnum].name;
					let boxweight = newManifest[boxnum].weight;
					let tempManifest = JSON.parse(JSON.stringify(newManifest));
					tempManifest[boxnum] = { ...tempManifest[boxnum], name: "UNUSED", weight: 0 };
					tempManifest[rightside] = { ...tempManifest[rightside], name: boxname, weight: boxweight};
					let newbal = balanceCheck(tempManifest);
					if(!forced){
						forced = true;
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curbestmove = [
							[(boxnum%12)+1, Math.floor(boxnum/12)+1],
							[(rightside%12)+1, Math.floor(rightside/12)+1],
						]
					}
					else if(newbal[0] < bal[0]) {
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curbestmove = [
							[(boxnum%12)+1, Math.floor(boxnum/12)+1],
							[(rightside%12)+1, Math.floor(rightside/12)+1],
						]
					}
				}
			}

			//cost to move crane hand to starting box
			console.log("moving ", crane, " to ", (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1));
			cost += findCost(tempbest, crane, (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1));
			crane = (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1);
			console.log("crane moving", cost);

			//cost to move box
			console.log("moving ", crane, " to ", (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1));
			cost += findCost(tempbest, crane, (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1));
			crane = (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1);
			console.log("box moving", cost);
			newManifest = JSON.parse(JSON.stringify(tempbest));
			listOfMoves.push(curbestmove);
		}
		else { //right heavy
			let forced = false;
			let leftside = findnextlefttop(newManifest);
			let tempbest = JSON.parse(JSON.stringify(newManifest));
			let righttop = findtopbox(newManifest);
			for(let i = 6; i<12; i++){
				let boxnum=righttop[i];
				if(boxnum != -1){
					let boxname = newManifest[boxnum].name;
					let boxweight = newManifest[boxnum].weight;
					let tempManifest = JSON.parse(JSON.stringify(newManifest));
					tempManifest[boxnum] = { ...tempManifest[boxnum], name: "UNUSED", weight: 0 };
					tempManifest[leftside] = { ...tempManifest[leftside], name: boxname, weight: boxweight};
					let newbal = balanceCheck(tempManifest);
					if(!forced){
						forced = true;
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curbestmove = [
							[(boxnum%12)+1, Math.floor(boxnum/12)+1],
							[(leftside%12)+1, Math.floor(leftside/12)+1],
						]
					}
					else if(newbal[0] < bal[0]) {
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curbestmove = [
							[(boxnum%12)+1, Math.floor(boxnum/12)+1],
							[(leftside%12)+1, Math.floor(leftside/12)+1],
						]
					}
				}
			}

			//cost to move crane hand to starting box
			console.log("moving ", crane, " to ", (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1));
			cost += findCost(tempbest, crane, (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1));
			crane = (curbestmove[0][1] - 1) * 12 + (curbestmove[0][0] - 1);
			console.log("crane moving", cost);

			//cost to move box
			console.log("moving ", crane, " to ", (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1));
			cost += findCost(tempbest, crane, (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1));
			crane = (curbestmove[1][1] - 1) * 12 + (curbestmove[1][0] - 1);
			console.log("box moving", cost);
			newManifest = JSON.parse(JSON.stringify(tempbest));
			listOfMoves.push(curbestmove);
		}
	}

	console.log(cost);

	return listOfMoves;
}

const greedybuf = (manifest) => {

}

const normal = (manifest) => {

}

const normalbuf = (manifest) => {

}

const sift = (manifest) => {

}

export default rebalance;

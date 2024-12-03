import AdvanceStep from "@/components/AdvanceStep";
import { list } from "postcss";

// General function to rebalance the manifest:
// First Run Greedy, if it doesn't work, run SIFT, else if time permits, run Normal
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
	return normal(manifest);
};

// Returns the difference in weight between the left and right side of the ship, and which side is heavier
const balanceCheck = (manifest) => {
	let left = 0;
	let right = 0;
	let total = 0;

	for(let i = 0; i < 96; i++){
		const temp = manifest[i].weight;
		total += temp;
		if((i%12) < 6){ // Find which side based on column #
			left += temp;
		}
		else {
			right += temp;
		}
	}

	// Return the difference
	let dif = Math.abs((left - right) / ((left + right) / 2)) * 100; 
	return [dif, left > right ? "left" : "right"];
}

// Finds the highest occupied box per col
const findtopbox = (manifest) => {
	let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	for(let col = 1; col < 13; col++){
		for(let row = 8; row > 0; row--){
			const boxnum = (row - 1) * 12 + (col - 1);
			if(manifest[boxnum].name != "UNUSED" && manifest[boxnum].name != "NAN"){
				arr[col-1]=boxnum;
				break;
			}
		}
	}
	for(let col = 1; col < 25; col++){
		for(let row = 4; row > 0; row--){
			const boxnum = (row - 1) * 24 + (col - 1) + 96;
			if(manifest[boxnum].name != "UNUSED" && manifest[boxnum].name != "NAN"){
				arr[col+11]=boxnum;
				break;
			}
		}
	}
	return arr;
}

// Finds the lowest empty slot per col
const findtopempty = (manifest) => {
	let arr = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	for(let col = 1; col < 13; col++){
		for(let row = 8; row > 0; row--){
			const boxnum = (row - 1) * 12 + (col - 1);
			if(manifest[boxnum].name == "UNUSED" ){
				arr[col-1]=boxnum;
			}
		}
	}
	for(let col = 1; col < 25; col++){
		for(let row = 4; row > 0; row--){
			const boxnum = (row - 1) * 24 + (col - 1) + 96;
			if(manifest[boxnum].name == "UNUSED" ){
				arr[col+11]=boxnum;
			}
		}
	}
	return arr;
}

// Find the next lowest open slot on right side
//for greedy
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

// Find the next lowest open slot on left side
//for greedy
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

// Find the cost of moving a box from one slot to another
const findCost = (manifest, from, to) => {
	//col, row, boxnum
	let frm = [manifest[from].col, manifest[from].row, from];
	let too =  [manifest[to].col, manifest[to].row, to];
	let cost = 0;
	let cur = frm;

	//ship to buf
	if(from < 96 && to > 95){
		//shift to top left of ship
		cost = 9 - frm[1];
		cost += frm[0] - 1;
		cost += 4;
		cur = [36,13,215];

		//shift to position
		while(cur[2] != too[2]){
			if(cur[0] != too[0]){
				cur[0]--;
				cur[2]--;
				cost++;
			}
			else{
				cur[1]--;
				cur[2] -= 24;
				cost++;
			}
		}

	}
	//buf to ship
	else if (from > 95 && to < 96){
		//shift to top right of buf
		cost = 5 - frm[1];
		cost += 36 - frm[0];
		cost += 4;
		cur = [1, 9, 96];

		//shift to position
		while(cur[2] != too[2]){
			if(cur[0] != too[0]){
				cur[0]++;
				cur[2]++;
				cost++;
			}
			else{
				cur[1]--;
				cur[2] -= 12;
				cost++;
			}
		}
	}
	//buf to buf
	else if (from > 95 && to > 95){
		if (frm[0] < too[0]){ //move right
			while(frm[2] != too[2]){
				if(frm[0] == too[0]){ //down movement
					if(frm[1] != too[1]){
						cur[1] -= 1;
						cur[2] -= 24;
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
						cur[2] += 24;
						cost++;
						while(cur[2] > 191){
							if(cur[0] != too[0]){
								cost++;
								cur[0]++;
								cur[2]++;
							}
							else{
								cost++;
								cur[1]--;
								cur[2]-=24;
							}
						}
					}
				}
			}
		}
		else { //move left
			while(frm[2] != too[2]){
				if(frm[0] == too[0]){ // down movement
					if(frm[1] != too[1]){
						cur[1] -= 1;
						cur[2] -= 24;
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
						cur[2] += 24;
						cost++;
						while(cur[2] > 191){
							if(cur[0] != too[0]){
								cost++;
								cur[0]--;
								cur[2]--;
							}
							else{
								cost++;
								cur[1]--;
								cur[2]-=24;
							}
						}
					}
				}
			}
		}
	}
	//ship to ship
	else {
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
						while(cur[2] > 95){
							if(cur[0] != too[0]){
								cost++;
								cur[0]++;
								cur[2]++;
							}
							else{
								cost++;
								cur[1]--;
								cur[2]-=12;
							}
						}
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
						while(cur[2] > 95){
							if(cur[0] != too[0]){
								cost++;
								cur[0]--;
								cur[2]--;
							}
							else{
								cost++;
								cur[1]--;
								cur[2]-=12;
							}
						}
					}
				}
			}
		}
	}
	return cost;
}

const bufempty = (manifest) => {
	for (let i = 96; i < 192; i++){
		if(manifest[i].name != "UNUSED"){
			return false;
		}
	}
	return true;
}






const greedy = (manifest) => {
	const listOfMoves = [
		
	];

	let curbestmove =[
		
	];

	//update to 96 after we get a 9th row
	let crane = 84; 

	//cost of saved movemnts
	let cost = 0; 

	//cost of sub-movements
	let tempcost = 0;


	let curcost = 0;

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
					tempcost = cost;
					let boxname = newManifest[boxnum].name;
					let boxweight = newManifest[boxnum].weight;
					let tempManifest = JSON.parse(JSON.stringify(newManifest));
					tempManifest[boxnum] = { ...tempManifest[boxnum], name: "UNUSED", weight: 0 };
					tempManifest[rightside] = { ...tempManifest[rightside], name: boxname, weight: boxweight};
					let newbal = balanceCheck(tempManifest);
					tempcost += findCost(tempManifest, crane, boxnum);
					tempcost += findCost(tempManifest, boxnum, rightside);
					if(!forced){
						forced = true;
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curcost = tempcost;
						curbestmove = [
							//flip
							[Math.floor(boxnum/12)+1,(boxnum%12)+1],
							[Math.floor(rightside/12)+1, (rightside%12)+1],
						]
					}
					else if(newbal[0] <= bal[0] && curcost > tempcost) {
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curcost = tempcost;
						curbestmove = [
							//flip
							[Math.floor(boxnum/12)+1, (boxnum%12)+1],
							[Math.floor(rightside/12)+1, (rightside%12)+1],
						]
					}
				}
			}

			//cost to move crane hand to starting box
			console.log("moving ", crane, " to ", (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1));
			cost += findCost(tempbest, crane, (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1));
			crane = (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1);
			console.log("crane moving", cost);

			//cost to move box
			console.log("moving ", crane, " to ", (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1));
			cost += findCost(tempbest, crane, (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1));
			crane = (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1);
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
					tempcost = cost;
					let boxname = newManifest[boxnum].name;
					let boxweight = newManifest[boxnum].weight;
					let tempManifest = JSON.parse(JSON.stringify(newManifest));
					tempManifest[boxnum] = { ...tempManifest[boxnum], name: "UNUSED", weight: 0 };
					tempManifest[leftside] = { ...tempManifest[leftside], name: boxname, weight: boxweight};
					let newbal = balanceCheck(tempManifest);
					tempcost += findCost(tempManifest, crane, boxnum);
					tempcost += findCost(tempManifest, boxnum, leftside);
					if(!forced){
						forced = true;
						bal = newbal;
						curcost = tempcost;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curbestmove = [
							//flip
							[Math.floor(boxnum/12)+1, (boxnum%12)+1],
							[Math.floor(leftside/12)+1, (leftside%12)+1],
						]
					}
					else if(newbal[0] <= bal[0] && curcost > tempcost) {
						bal = newbal;
						tempbest = JSON.parse(JSON.stringify(tempManifest));
						curcost = tempcost
						curbestmove = [
							//flip
							[Math.floor(boxnum/12)+1, (boxnum%12)+1],
							[Math.floor(leftside/12)+1, (leftside%12)+1],
						]
					}
				}
			}

			//cost to move crane hand to starting box
			console.log("moving ", crane, " to ", (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1));
			cost += findCost(tempbest, crane, (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1));
			crane = (curbestmove[0][0] - 1) * 12 + (curbestmove[0][1] - 1);
			console.log("crane moving", cost);

			//cost to move box
			console.log("moving ", crane, " to ", (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1));
			cost += findCost(tempbest, crane, (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1));
			crane = (curbestmove[1][0] - 1) * 12 + (curbestmove[1][1] - 1);
			console.log("box moving", cost);
			newManifest = JSON.parse(JSON.stringify(tempbest));
			listOfMoves.push(curbestmove);
		}
	}

	console.log(cost);
	// normal(manifest);
	return listOfMoves;
}

const greedybuf = (manifest) => {

}

function generateHash(manifest) {
    return manifest.map(container => `${container.name},${container.weight}`).join(';');
}

const normal = (manifest) => {
	let listOfMoves = [];
	let openSet = new Map(); // Hash -> [State, f, moves, lastEmpty, g]
	let closedSet = new Map();

	let initialHash = generateHash(manifest);
	openSet.set(initialHash, [JSON.parse(JSON.stringify(manifest)), 0, listOfMoves, 84, 0]);

	while (openSet.size > 0) {
		// Get the state with the lowest f value
		let [currentHash, parent] = Array.from(openSet.entries()).sort((a, b) => a[1][1] - b[1][1])[0];
		openSet.delete(currentHash);

		let parentBal = balanceCheck(parent[0]);
		console.log("cost: ", parent[1], " g: ", parent[4], " bal: ", parentBal[0], " move: ", parent[2][0]);
		if (parentBal[0] <= 10 && bufempty(parent[0])) {
			return parent[2];
		}

		closedSet.set(currentHash, parent);

		let box = findtopbox(parent[0]);
		let empty = findtopempty(parent[0]);
		for (let i = 0; i < 36; i++) {
			if (box[i] !== -1) {
				let initialCost = findCost(parent[0], parent[3], box[i]);
				for (let j = 0; j < 36; j++) {
					if (empty[j] !== -1 && j !== i) {
						let sucCost = findCost(parent[0], box[i], empty[j]) + initialCost;
						
						let tempManifest = JSON.parse(JSON.stringify(parent[0]));
						tempManifest[box[i]] = { ...tempManifest[box[i]], name: "UNUSED", weight: 0 };
						tempManifest[empty[j]] = { ...tempManifest[empty[j]], name: parent[0][box[i]].name, weight: parent[0][box[i]].weight };
						
						let sucBal = balanceCheck(tempManifest);
						let g = parent[4] + sucCost;
						// g = (g - 1) / 26;
						let h = Math.max(0, (sucBal[0] - 10) / 100);
						let f = g + h;

						let tempMoveset = JSON.parse(JSON.stringify(parent[2]));
						tempMoveset.push([
							[tempManifest[box[i]].row, tempManifest[box[i]].col],
							[tempManifest[empty[j]].row, tempManifest[empty[j]].col],
						]);

						let sucHash = generateHash(tempManifest);
						if ((!closedSet.has(sucHash) && !openSet.has(sucHash)) // New state
							|| (openSet.has(sucHash) && openSet.get(sucHash)[1] > f)) { // State is in open set with higher f
							openSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
						} else if (closedSet.has(sucHash) && closedSet.get(sucHash)[1] > f) {
							closedSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
							openSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
						}
					}
				}
			}
		}
	}
	return null;
};

const normalbuf = (manifest) => {

}

const sift = (manifest) => {
	let listOfMoves = [];
	let openSet = new Map(); // Hash -> [State, f, moves, lastEmpty, g]
	let closedSet = new Map();

	let initialHash = generateHash(manifest);
	openSet.set(initialHash, [JSON.parse(JSON.stringify(manifest)), 0, listOfMoves, 84, 0]);

	while (openSet.size > 0) {
		// Get the state with the lowest f value
		let [currentHash, parent] = Array.from(openSet.entries()).sort((a, b) => a[1][1] - b[1][1])[0];
		openSet.delete(currentHash);

		let parentBal = balanceCheck(parent[0]);
		console.log("cost: ", parent[1], " g: ", parent[4], " bal: ", parentBal[0], " move: ", parent[2][0]);
		if (parentBal[0] <= 10 && bufempty(parent[0])) {
			return parent[2];
		}

		closedSet.set(currentHash, parent);

		let box = findtopbox(parent[0]);
		let empty = findtopempty(parent[0]);
		for (let i = 0; i < 36; i++) {
			if (box[i] !== -1) {
				let initialCost = findCost(parent[0], parent[3], box[i]);
				for (let j = 0; j < 36; j++) {
					if (empty[j] !== -1 && j !== i) {
						let sucCost = findCost(parent[0], box[i], empty[j]) + initialCost;
						
						let tempManifest = JSON.parse(JSON.stringify(parent[0]));
						tempManifest[box[i]] = { ...tempManifest[box[i]], name: "UNUSED", weight: 0 };
						tempManifest[empty[j]] = { ...tempManifest[empty[j]], name: parent[0][box[i]].name, weight: parent[0][box[i]].weight };
						
						let sucBal = balanceCheck(tempManifest);
						let g = parent[4] + sucCost;
						// g = (g - 1) / 26;
						let h = Math.max(0, (sucBal[0] - 10) / 100);
						let f = g + h;

						let tempMoveset = JSON.parse(JSON.stringify(parent[2]));
						tempMoveset.push([
							[tempManifest[box[i]].row, tempManifest[box[i]].col],
							[tempManifest[empty[j]].row, tempManifest[empty[j]].col],
						]);

						let sucHash = generateHash(tempManifest);
						if ((!closedSet.has(sucHash) && !openSet.has(sucHash)) // New state
							|| (openSet.has(sucHash) && openSet.get(sucHash)[1] > f)) { // State is in open set with higher f
							openSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
						} else if (closedSet.has(sucHash) && closedSet.get(sucHash)[1] > f) {
							closedSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
							openSet.set(sucHash, [tempManifest, f, tempMoveset, empty[j], g]);
						}
					}
				}
			}
		}
	}
	return null;

}

export default rebalance;

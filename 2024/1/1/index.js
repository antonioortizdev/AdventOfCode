const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const fileInput = fs.readFileSync(inputPath, 'utf-8');
console.log(fileInput)

const parseInput = (input) => {
	const col1 = []
	const col2 = [];
	const pairsStrs = input.split('\n');
	for (const pairStr of pairsStrs) {
		const num1 = pairStr.substring(0, pairStr.indexOf(' '));
		const num2 = pairStr.substring(pairStr.indexOf(' ') + 2, pairStr.length)
		col1.push(parseInt(num1))
		col2.push(parseInt(num2))
	}
	return [col1, col2]
}

const main = (input) => {
	// parse input to get two arrays of numbers, each per column
	const parsed = parseInput(input)
	console.log({
		parsed
	})
	// order arrays from smallest to greatest.
	parsed[0] = parsed[0].sort()
	parsed[1] = parsed[1].sort()
	console.log({
		sortedParsed: parsed
	})
	// get difference of each pair, return total sum.
	let total = 0;
	for (let i = 0; i < parsed[0].length; i++) {
		const num1 = parsed[0][i];
		const num2 = parsed[1][i];
		total += Math.abs(num1-num2);
	}
	return total
}

console.log({
	'main(exampleInput)': main(exampleInput),
	'main(fileInput)': main(fileInput)
})
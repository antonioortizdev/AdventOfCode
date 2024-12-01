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
	const parsed = parseInput(input)
	console.log({parsed})

	let total = 0
	for (let i = 0; i < parsed[0].length; i++) {
		const num = parsed[0][i];
		let occurs = 0
		for (let j = 0; j < parsed[1].length; j++) {
			const num2 = parsed[1][j];
			if (num === num2) {
				occurs++
			}
		}
		total += num * occurs
	}

	return total
}

console.log({
	'main(exampleInput)': main(exampleInput),
	'main(fileInput)': main(fileInput)
})
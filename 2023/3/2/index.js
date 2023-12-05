function parseInputToSchematicMatrix(input) {
	const result = input.split('\n').map(row => Array.from(row))

	return result
}

function getPartNumbersFromSchematicMatrix(schematicMatrix) {
	const partNumbers = []
	const numbers = []
	for (let i = 0; i < schematicMatrix.length; i++) {
		let digits = ''
		let isPartNumber = false
		for (let j = 0; j < schematicMatrix[i].length; j++) {
			if ('0123456789'.includes(schematicMatrix[i][j])) {
				digits = digits + schematicMatrix[i][j]
				if ('312' === digits) console.log('312', {
					isPartNumber,
					digits
				})
				const positionOffsets = [
					[-1,-1],[-1,0],[-1,1],
					[0,-1],       [0,1],
					[1,-1],[1,0],[1,1],
				]
				if (!isPartNumber) {
					isPartNumber = positionOffsets.some(([rowOffset, colOffset]) => {
						const rowIndex = i + rowOffset
						if (Array.isArray(schematicMatrix[rowIndex])) {
							const colIndex = j + colOffset
							const hasSymbol = schematicMatrix[rowIndex][colIndex] != undefined
							&& !'.0123456789'.includes(schematicMatrix[rowIndex][colIndex])

							return hasSymbol
						}
						return false
					});
				}

			} else {
				if (isPartNumber) {
					partNumbers.push(Number(digits))
				}
				digits = ''
				isPartNumber = false
			}
			if (j === schematicMatrix[i].length - 1 && isPartNumber) {
				partNumbers.push(Number(digits))
			}
		}
	}

	return partNumbers
}

function main(input) {
	const schematicMatrix = parseInputToSchematicMatrix(input)
	const partNumbers = getPartNumbersFromSchematicMatrix(schematicMatrix)
	const partNumbersSum = partNumbers.reduce((sum, partNumber) => sum + partNumber, 0)

	require('fs').writeFileSync('output.json', JSON.stringify({schematicMatrix, partNumbers, partNumbersSum}))

	return partNumbersSum
}

const exampleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
const puzzleInput = require('fs').readFileSync('./input.txt').toString().trim();

console.log('RESULT', {
	exampleInput1: main(exampleInput),
	result: main(puzzleInput),
})
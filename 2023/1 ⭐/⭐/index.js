const extractCalibrationValue = (text) => {
	const chars = text.split('')
	const numericChars = chars.filter(char => '0123456789'.includes(char))

	if (numericChars.length === 0) {
		return 0;
	}

	const firstNumericChar = numericChars[0]
	const lastNumericChar = numericChars[numericChars.length - 1]

	return Number(`${firstNumericChar}${lastNumericChar}`)
}

const main = (input) => {
	const calibrationValues = input.split('\n').map(extractCalibrationValue)
	const totalValues = calibrationValues.reduce((total, calibrationValue) => total + calibrationValue)

	return totalValues
}

const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const puzzleInput = require('fs').readFileSync('./input.txt').toString()

console.log(main(puzzleInput));
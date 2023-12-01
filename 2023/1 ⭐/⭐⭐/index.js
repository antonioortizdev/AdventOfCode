const isLiterallyNumeric = (char) => {
	const
	const isNumeric = '0123456789'.includes(char)



	return isNumeric
}

const extractCalibrationValue = (text) => {
	const chars = text.split(
		'0123456789zeroonetwothreefourfivesixseveneightnine'
	)
	const numericChars = chars.filter(isLiterallyNumeric)

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

console.log(main(puzzleInput)); // ig it must be '55447' since it's the same input as the part 1.
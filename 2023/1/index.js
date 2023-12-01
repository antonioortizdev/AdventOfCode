const extractCalibrationValue = (text) => {
	const chars = text.split('')
	const numericChars = chars.filter(char => '0123456789'.includes(char));
	const firstNumericChar = numericChars[0]
	const lastNumericChar = numericChars[numericChars.length - 1]

	return Number(`${firstNumericChar}${lastNumericChar}`)
}

const main = (input) => {
	console.log(
		input.split('\n')
		.map(extractCalibrationValue)
		.reduce((total, calibrationValue) => total + calibrationValue)
	)
}

const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

main(exampleInput);
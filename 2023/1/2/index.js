const extractDigitsFromWords = (text) => {
	const numberWords = {
		'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4,
		'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
	}

	// Replace occurences to digits
	let textWithDigits = ''
	Object.keys(numberWords).forEach((numberWord, number) => {
		textWithDigits = text.replace(numberWord, number)
	})

	const chars = textWithDigits.split('')
	const digits = chars.filter(char => '0123456789'.includes(char))

	return digits
}

const extractCalibrationValue = (text) => {
	const numericChars = extractDigitsFromWords(text)

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

const exampleInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const puzzleInput = require('fs').readFileSync('./input.txt').toString().trim()

console.log(main(puzzleInput)); // exampleInput sum should be '281'
const extractDigitsFromWords = (text) => {
	let digits = [];
	const numberWords = {
		'one': 1, 'two': 2, 'three': 3, 'four': 4,
		'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
	};
	const numbers = '123456789';

	// Find digits.
	Array.from(text).forEach((char, index) => {
		if (numbers.includes(char)) {
			digits[index] = char
		}
	})

	// Add number words to respective indexes in digits array.
	Object.entries(numberWords).forEach(([ numberWord, number ]) => {
		const numberWordIndexes = [...text.matchAll(new RegExp(numberWord, 'gi'))].map(a => a.index)
		numberWordIndexes.forEach(index => {
			digits[index] = String(number)
		})
	})

	const filteredDigits = digits.filter(digitOrEmpty => digitOrEmpty != undefined)

	return filteredDigits
}

const extractCalibrationValue = (text) => {
	const numericChars = extractDigitsFromWords(text)

	if (numericChars.length === 0) {
		return 0;
	}

	const firstNumericChar = numericChars[0]
	const lastNumericChar = numericChars[numericChars.length - 1]

	const calibrationValue = Number(`${firstNumericChar}${lastNumericChar}`)

	return calibrationValue
}

const main = (input) => {
	const calibrationValues = input.split('\n').map(extractCalibrationValue)
	const totalValues = calibrationValues.reduce((total, calibrationValue) => total + calibrationValue)

	return totalValues
}

const exampleInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const exampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const puzzleInput = require('fs').readFileSync('./input.txt').toString().trim()

// TESTS.
console.log('TESTS', {
	'': main(''),
	' ': main(' '),
	'1': main('1'),
	'11': main('11'),
	'0': main('0'),
	'a': main('a'),
	'zerone': main('zerone'),
	'zerozero': main('zerozero'),
	'twone': main('twone'),
	'oneeight3': main('oneeight3'),
	'oneoneone': main('oneoneone'),
	exampleInput1: main(exampleInput1), // must return 142.
	exampleInput2: main(exampleInput2), // must return 281.
	result: main(puzzleInput)
})

// RESULTS.
console.log('RESULTS', {
	exampleInput1: main(exampleInput1), // must return 142.
	exampleInput2: main(exampleInput2), // must return 281.
	result: main(puzzleInput)
});
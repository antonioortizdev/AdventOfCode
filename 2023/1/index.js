const calibrationDocument = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const extractCalibrationValue = (text) => {
	const chars = text.split('')
	let result = ''

	for (char of chars) {
		const isNumber = !isNaN(char);
		if (isNumber) {
			result = result + char
		}
	}

	return Number(result)
}

const main = () => {
	console.log(
		calibrationDocument.split('\n')
		.map(extractCalibrationValue)
		.reduce((total, calibrationValue) => total + calibrationValue)
	)
}

main();
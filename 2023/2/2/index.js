const COLORS = ['red', 'green', 'blue']

/**
 * Generates empty cubes info object.
 *
 * @returns Empty cubes info. Example:
 * 	{
 * 		'red': 0,
 * 		'green': 0,
 * 		'blue': 0,
 * 	}
 */
function generateEmptyCubesInfo() {
	return COLORS.reduce((cubesInfo, color) => {
		const result = cubesInfo
		result[color] = 0

		return result
	}, {})
}

/**
 * Parses the input to obtain a list of games information.
 *
 * @param {string} input
 * @returns {array} List of games information. Example:
 *	[
		{ // Info of Game 1.
			id: 1,
			cubes: [
				{
					'red': 3,
					'green': 56,
					'blue': 1,
				},
				{
					'red': 5,
					'green': 0,
					'blue': 0,
				},
				{
					'red': 2,
					'green': 0,
					'blue': 7,
				},
				...
			]
		},
		...
 	]
 */
function parseGamesInfo(input) {
	const result = [];

	input.trim().split('\n').forEach(gameText => {
		const gameTextIdAndInfo = gameText.trim().split(':');
		const gameTextId = gameTextIdAndInfo[0].trim()
		const gameTextInfo = gameTextIdAndInfo[1].trim()

		const gameId = Number(gameTextId.trim().split(' ')[1])

		const gameCubes = []
		gameTextInfo.trim().split(';').forEach(cubesTextInfo => {
			const cubesByColor = generateEmptyCubesInfo()
			cubesTextInfo.trim().split(',').forEach(cubeTextInfo => {
				const cubeQtyAndColor = cubeTextInfo.trim().split(' ');
				const quantity = Number(cubeQtyAndColor[0].trim())
				const color = cubeQtyAndColor[1].trim()
				cubesByColor[color] = quantity
			})
			gameCubes.push(cubesByColor)
		})

		result.push({
			id: gameId,
			cubes: gameCubes
		})
	})

	return result;
}

function isGamePossible({ cubes }, bagLoad) {
	for (cubesByColor of cubes) {
		for ([color, quantity] of Object.entries(cubesByColor)) {
			if (quantity > bagLoad[color]) {
				return false
			}
		}
	}

	return true;
}

function findMinimumCubeSet({ cubes }) {
	const result = generateEmptyCubesInfo();
	for (cubeSet of cubes) {
		for ([color, quantity] of Object.entries(cubeSet)) {
			if (quantity > result[color]) {
				result[color] = quantity
			}
		}
	}

	return result;
}

function main(input) {
	const BAG_LOAD = {
		'red': 12,
		'green': 13,
		'blue': 14,
	}
	const games = parseGamesInfo(input).map(game => ({
		...game,
		isPossible: isGamePossible(game, BAG_LOAD),
		minimumSet: findMinimumCubeSet(game),
	})).map(game => ({
		...game,
		minimumSetPower: Object.values(game.minimumSet).reduce((sum, qty) => sum * qty, 1)
	}))
	const possibleGames = games.filter(({ isPossible }) => isPossible === true)
	const impossibleGames = games.filter(({ isPossible }) => isPossible === false)
	const gameIdSum = possibleGames.map(({ id }) => id).reduce((sum, id) => sum + id);
	const minimumSetsSum = games.map(({ minimumSetPower }) => minimumSetPower)
		.reduce((sum, power) => sum + power, 0)

	require('fs').writeFileSync(`./games_${Date.now()}.json`, JSON.stringify({
		gamesCount: games.length,
		possibleGamesCount: possibleGames.length,
		impossibleGamesCount: impossibleGames.length,
		possibleGames,
		impossibleGames,
	}))

	return {
		partOne: gameIdSum,
		partTwo: minimumSetsSum,
	}
}

const puzzleInput = require('fs').readFileSync('./input.txt').toString().trim();
const exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

console.log('RESULT', {
	exampleInput1: main(exampleInput),
	result: main(puzzleInput),
	// 208 is too low...
})
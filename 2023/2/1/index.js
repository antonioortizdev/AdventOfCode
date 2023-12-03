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
				},
				{
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
			const cubesByColor = {}
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

function isGamePossible(game, bagLoad) {

}

function main(input) {
	const BAG_LOAD = {
		'red': 12,
		'green': 13,
		'blue': 14,
	}
	const games = parseGamesInfo(input)
	console.log({input, games})
	const possibleGames = games.filter(game => isGamePossible(game, BAG_LOAD))
	const gameIdSum = possibleGames.map(game => game.id).reduce((sum, id) => sum + id)

	return gameIdSum
}

const puzzleInput = require('fs').readFileSync('./input.txt').toString().trim();
const exampleInput1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

console.log('RESULT', {
	exampleInput1: main(exampleInput1),
	result: main(puzzleInput)
})
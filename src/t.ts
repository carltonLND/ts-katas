const nums = [
  34, 21, 32, 41, 25, 14, 42, 43, 14, 31, 54, 45, 52, 42, 23, 33, 15, 51, 31,
  35, 21, 52, 33, 13, 23,
];

// const treasureMap = [
//   [34, 21, 32, 41, 25],
//   [14, 42, 43, 14, 31],
//   [54, 45, 52, 42, 23],
//   [33, 15, 51, 31, 35],
//   [21, 52, 33, 13, 23]
// ]

function createTreasureMap(nums: number[]): number[][] {
  const treasureMap: number[][] = [[], [], [], [], []];

  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      const index = row * 5 + column;
      treasureMap[row].push(nums[index]);
    }
  }

  return treasureMap;
}

function parseClue(clue: number): [number, number] {
  const clueStr = clue.toString();
  const row = parseInt(clueStr[0]);
  const column = parseInt(clueStr[1]);

  return [row - 1, column - 1];
}

function treasureHunt(treasureMap: number[][]) {
  const visited: number[] = [];

  let currentCell = 11;
  while (currentCell !== visited[visited.length - 1]) {
    visited.push(currentCell);
    const [row, column] = parseClue(currentCell);
    currentCell = treasureMap[row][column];
  }

  return visited;
}

console.log(treasureHunt(createTreasureMap(nums)));

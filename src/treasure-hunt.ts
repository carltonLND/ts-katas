// type TreasureMap = number[][];
// type Position = { x: number; y: number };
//
// treasureHunt();
//
// function treasureHunt() {
//   const nums = [
//     34, 21, 32, 41, 25, 14, 42, 43, 14, 31, 54, 45, 52, 42, 23, 33, 15, 51, 31,
//     35, 21, 52, 33, 13, 23,
//   ];
//
//   const treasureMap = createMap(nums);
//   findTreasure(treasureMap);
// }
//
// function findTreasure(map: TreasureMap, cell = 11): void {
//   const cellPos = getCellPos(cell);
//   const nextCell = map[cellPos.x][cellPos.y];
//
//   if (cell === nextCell) {
//     return console.log("TREASURE FOUND AT CELL", cell);
//   }
//
//   console.log("VISITED", cell);
//   return findTreasure(map, nextCell);
// }
//
// function createMap(nums: number[]): TreasureMap {
//   const treasureMap = [];
//   for (let i = 0; i < 25; i += 5) {
//     treasureMap.push(nums.slice(i, i + 5));
//   }
//
//   return treasureMap;
// }
//
// function getCellPos(clue: number): Position {
//   const cellStr = clue.toString();
//   return { x: parseInt(cellStr[0]) - 1, y: parseInt(cellStr[1]) - 1 };
// }
//
// // It works but we're supposed to traverse the cells...
// //
// // function treasureHuntCheat(nums: number[]) {
// //   for (let i = 0; i < nums.length; i++) {
// //     if (nums.slice(i + 1).includes(nums[i])) {
// //       return console.log("TREASURE FOUND!");
// //     }
// //   }
// // }
// //
// // treasureHuntCheat(nums);

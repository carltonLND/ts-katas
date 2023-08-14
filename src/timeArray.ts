import fs from "fs";

type ArrayOperation = "push" | "pop" | "unshift" | "shift";
interface TimeExecution {
  operation: ArrayOperation;
  length: number;
  averageTime: number;
  times: number;
}

const LENGTHS = [
  10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000,
];

function createArray(length: number): number[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }

  return arr;
}

function timeExecution(callback: () => void): number {
  const startTime = performance.now();

  callback();

  const stopTime = performance.now();
  return stopTime - startTime;
}

function testArrOperation(
  operation: ArrayOperation,
  times = 1
): TimeExecution[] {
  const results: TimeExecution[] = [];
  for (const length of LENGTHS) {
    const arr = createArray(length);
    const elapsedTimes = [];

    for (let i = 0; i < times; i++) {
      elapsedTimes.push(
        timeExecution(() => {
          arr[operation](1);
        })
      );
    }

    const averageTime =
      elapsedTimes.reduce((prev, curr) => prev + curr) / elapsedTimes.length;

    results.push({ operation, length, averageTime, times });
  }
  return results;
}

function writeJson() {
  const data = {
    push: testArrOperation("push", 100),
    pop: testArrOperation("pop", 100),
    unshift: testArrOperation("unshift", 100),
    shift: testArrOperation("shift", 100),
  };

  const jsonData = JSON.stringify(data);

  fs.writeFileSync("arrayTimeData.json", jsonData);
}

function writeCsv() {
  const data = [
    ...testArrOperation("push", 100),
    ...testArrOperation("pop", 100),
    ...testArrOperation("unshift", 100),
    ...testArrOperation("shift", 100),
  ];
  const headers = ["operation", "length", "averageTime", "times"];
  const csvData = [
    headers,
    ...data.map((row) => Object.values(row) as (string | number)[]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  fs.writeFileSync("arrayTimeData.csv", csvData);
}

writeCsv();

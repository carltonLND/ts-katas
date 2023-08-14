import fs from "fs";

type ArrayOperation = "push" | "pop" | "unshift" | "shift";

interface TimeExecution {
  operation: ArrayOperation;
  length: number;
  averageTime: number;
  times: number;
}

type GroupedTimeExecution = {
  [op in ArrayOperation]: Omit<TimeExecution, "operation">[];
};

const LENGTHS = [
  10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000,
];

const data = [
  ...testArrOperation("push", 100),
  ...testArrOperation("pop", 100),
  ...testArrOperation("unshift", 100),
  ...testArrOperation("shift", 100),
];

writeJson(data);
writeCsv(data);

function createArray(length: number): number[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(1);
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

function writeJson(data: TimeExecution[]) {
  const groupedData = data.reduce(
    (obj: GroupedTimeExecution, result) => {
      const { operation, ...newResult } = result;
      obj[operation].push(newResult);
      return obj;
    },
    { push: [], pop: [], shift: [], unshift: [] }
  );

  const jsonData = JSON.stringify(groupedData);
  fs.writeFileSync("arrayTimeData.json", jsonData);
}

function writeCsv(data: TimeExecution[]) {
  const headers = ["operation", "length", "averageTime", "times"];
  const csvData = [headers, ...data.map(Object.values)]
    .map((row) => row.join(","))
    .join("\n");

  fs.writeFileSync("arrayTimeData.csv", csvData);
}

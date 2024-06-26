jest.setTimeout(30000);

import { nonOptimizedGetAllComments, nonOptimizedCountOddEvenNumbers, nonOptimizedFindSum } from "../js/nonOptimize"
import { optimizedGetAllComments, optimizedCountOddEvenNumbers, optimizedFindSum } from "../js/optimized"


describe("Performance comparison", () => {
  test("Finding the execution time difference between two network call functions", async () => {
    console.log("Finding the execution time difference between two network call functions");
    console.log("Executing network call that uses then");
    const startThen = performance.now();
    await nonOptimizedGetAllComments();
    const endThen = performance.now();
    const executionTimeThen = endThen - startThen;
    console.log(`Time taken to complete ${executionTimeThen} milliseconds`);
    
    console.log("Executing network call that uses async await");
    const startAsync = performance.now();
    await optimizedGetAllComments();
    const endAsync = performance.now();
    const executionTimeAsync = endAsync - startAsync;
    console.log(`Time taken to complete ${executionTimeAsync} milliseconds`);

    const timeDifference = executionTimeThen- executionTimeAsync;
    console.log(`Execution time difference: ${timeDifference} milliseconds`);
  });
  
  test("Finding the execution time difference between finding the number of odd and even numbers in array", async () => {
    console.log("Finding the execution time difference between finding the number of odd and even numbers in array");
    console.log("Executing non optimized function...");
    const startOne = performance.now();
    nonOptimizedFindSum();
    const endOne = performance.now();
    const executionTimeOne = endOne - startOne;
    console.log(`Time taken to complete ${executionTimeOne} milliseconds`);

    console.log("Executing optimized function...");
    const startTwo = performance.now();
    optimizedFindSum();
    const endTwo = performance.now();
    const executionTimeTwo = endTwo - startTwo;
    console.log(`Time taken to complete ${executionTimeTwo} milliseconds`);

    const timeDifference = executionTimeOne- executionTimeTwo;
    console.log(`Execution time difference: ${timeDifference} milliseconds`);
  })

  test("Finding the execution time difference between finding the sum of array", async () => {
    console.log("Finding the execution time difference between finding the sum of array");
    console.log("Executing non optimized function...");
    const startOne = performance.now();
    // await optimizedCountOddEvenNumbers();
    await nonOptimizedCountOddEvenNumbers();
    const endOne = performance.now();
    const executionTimeOne = endOne - startOne;
    console.log(`Time taken to complete ${executionTimeOne} milliseconds`);

    console.log("Executing optimized function...");
    const startTwo = performance.now();
    await optimizedCountOddEvenNumbers();
    // await nonOptimizedCountOddEvenNumbers();
    const endTwo = performance.now();
    const executionTimeTwo = endTwo - startTwo;
    console.log(`Time taken to complete ${executionTimeTwo} milliseconds`);

    const timeDifference = executionTimeOne- executionTimeTwo;
    console.log(`Execution time difference: ${timeDifference} milliseconds`);
  })
});


const getAllCommentsAsync = async () => {
  let endpoint = "https://jsonplaceholder.typicode.com/comments";
  let comments = [];
  const response = await fetch(endpoint);
  comments = await response.json();
  comments = comments.map((comment) => ({ ...comment, time: Date.now() }));
  return comments;
};
// ----------------------

async function countOddEvenNumbers(numbers = Array.from({ length: 100000 }, () =>Math.floor(Math.random() * 100))) {
  let oddCount = 0;
  let evenCount = 0;
  numbers.forEach(number => number % 2 === 0 ? evenCount++ : oddCount++);

  return { oddCount, evenCount };
}

// ----------------------

const findSum = async (array = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100))) => array.reduce((acc, curr) => acc + curr, 0);

export {
  getAllCommentsAsync as optimizedGetAllComments,
  countOddEvenNumbers as optimizedCountOddEvenNumbers,
  findSum as optimizedFindSum,
};

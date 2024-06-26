const getAllCommentsThen = async () => {
  let endpoint = "https://jsonplaceholder.typicode.com/comments";
  return fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (resp) {
      let comments = resp;
      comments = comments.map(comment => {
        comment
        ["time"] = Date.now();
      });
      return comments;
    });
};

// ----------------------

const countOddEvenNumbers = async(numbers = Array.from({ length: 100000 }, () =>Math.floor(Math.random() * 100))) => {
  let oddCount = 0;
  let evenCount = 0;

  numbers.map(function (number) {
    switch (number % 2) {
      case 0:
        evenCount++;
        break;
      case 1:
        oddCount++;
        break;
      default:
        break;
    }
  });

  return { oddCount, evenCount };
}

// ----------------------

async function findSum(array = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100))) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

export {
  getAllCommentsThen as nonOptimizedGetAllComments,
  countOddEvenNumbers as nonOptimizedCountOddEvenNumbers,
  findSum as nonOptimizedFindSum,
};

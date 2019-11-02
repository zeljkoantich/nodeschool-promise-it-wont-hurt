const invalidJson = process.argv[2];

function parsePromised(jsonData) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(jsonData))
    } catch (error) {
      reject(error.message);
    }
  });
}

parsePromised(invalidJson)
  .then(
    value => console.log(value), // on fulfilled
    console.log // on rejected
  );

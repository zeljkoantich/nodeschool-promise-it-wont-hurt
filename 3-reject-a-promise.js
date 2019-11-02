const promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('rejected!'.toUpperCase())), 300);
});

promise.then(
  value => console.log(value), // on fulfilled
  ({ message }) => console.log(message) // on reject
);

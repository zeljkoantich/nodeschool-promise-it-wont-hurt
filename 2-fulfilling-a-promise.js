const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('fulfilled!'.toUpperCase()), 300);
});

promise.then(value => console.log(value));

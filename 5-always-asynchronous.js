const promise = new Promise((resolve, reject) => {
  resolve('promise value'.toUpperCase());
});

promise.then(console.log);

console.log('main program'.toUpperCase());

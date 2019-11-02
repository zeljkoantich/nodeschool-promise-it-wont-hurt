const promise = new Promise((resolve, reject) => {
  resolve('i fired'.toUpperCase());
  reject(new Error('i did not fired'.toUpperCase()));
});

function onRejected(error) {
  console.log(error);
}

promise.then(
  console.log,
  onRejected,
);

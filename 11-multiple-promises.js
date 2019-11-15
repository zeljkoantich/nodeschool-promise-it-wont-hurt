function all(...promises) {
  let counter = 0;
  const allValues = [];

  const internalPromise = new Promise((resolve, reject) => {
    if (promises.length < 1) { // reject when no arguments passed
      reject(new Error('No values provided'));
    }

    for (let promise of promises) {
      if ( !(promise instanceof Promise) ) { // construct new promise, when value provided is not a promise
        promise = Promise.resolve(promise);
      }

      promise.then(value => {
        allValues.push(value); // append resolved value
        counter += 1;

        if (counter === promises.length) {
          resolve(allValues);
        };
      });
    }
  });

  return internalPromise;
}

all(getPromise1(), getPromise2())
// all(Promise.resolve(20), Promise.resolve(30), 'foo') // test 1
// all() // test 2
  .then(console.log)
  .catch(console.log)

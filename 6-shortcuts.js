const resolvePromise = Promise.resolve('resolve value');

const rejectPromise = Promise.reject(new Error('reject message'));

resolvePromise.then(console.log);

rejectPromise.catch(console.log);

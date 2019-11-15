function alwaysThrows() {
  throw new Error('oh noes'.toUpperCase());
}

function iterate(numb = 0) {
  console.log(numb);

  return numb + 1;
}

Promise.resolve(iterate(1))
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(alwaysThrows) // throw error

  // Bonus: Try swapping your rejection handler from console.log to alwaysThrows.
  // Your program will now throw an exception in the global context!  Ahh!
  // Try to fix this using the approach described above.
  .then(null, alwaysThrows)
  .catch(({ message }) => console.log(message));

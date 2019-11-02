function attachTitle(title = '') {
  return `DR. ${title}`;
}

const promise = Promise.resolve('manhattan'.toUpperCase());

promise
  .then(attachTitle)
  .then(console.log);

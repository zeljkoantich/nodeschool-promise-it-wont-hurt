first()
  .then(
    value => second(value).then(value => console.log(value)),
    reason => console.log(reason) // on rejected
  );

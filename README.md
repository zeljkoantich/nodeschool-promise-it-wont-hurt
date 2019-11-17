# Promise It Won't Hurt ( nodeschool )

https://github.com/stevekane/promise-it-wont-hurt

<br>

---

<br>


 ## Warm up
 ## Exercise 1 of 13


# What is a promise?

One of the new features in ECMAScript 2015 (also called “ES6” and
“Harmony”) is a new type of objects: promises. It extends the widely known
Promise/A+ specification and standardizes it to be part of the language
core.

In its most basic terms, a promise is an object that defines a method called
then. The promise object represents a value that may be available some time
in the future. It greatly simplifies asynchronous logic in JavaScript.

Compare the following code, written in the more traditional idiom of
asynchronous callbacks, with no error handling:

    Parse.User.logIn('user', 'pass', {
      success: function (user) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });

And the much more elegant Promise workflow, with first-class error handling:

    Parse.User.logIn('user', 'pass').then(function (user) {
      return query.find();
    }).then(function (results) {
      return results[0].save({ key: value });
    }).then(function (result) {
      // the object was saved
    }).catch(function (err) {
      // an error happened somewhere in the process
    });

Promises make writing performant, asynchronous code much easier and more fun.

## Task

For this first lesson, let’s review what we already know about asynchronous
operations in JavaScript.

Using setTimeout, print the string 'TIMED OUT!' after 300ms.

## [Solution](1-warm-up.js):
```javascript
setTimeout(() => {
  console.log('timed out!'.toUpperCase())
}, 300);
```

<br>

---

<br>


## Fulfill a promise
 ## Exercise 2 of 13

# Fulfilling a Promise

Promises have an important internal property: its state. A promise is one of:

  * fulfilled,
  * rejected, or
  * pending, which is the state of a promise waiting to be fulfilled or rejected.

Sometimes you will also hear the term “resolved.” For now, you can treat it as
meaning either fulfilled or rejected.

Most promises are created with new Promise(executor), in which executor is
a callback function with the signature function (fulfill, reject). Inside
executor, either fulfill or reject is called, to indicate the outcome of
the operation. For promises, fulfilling means that the operation successfully
completes and yields a value. In order to pass this value along, call fulfill
function with this value as the first parameter.

As mentioned in the last lesson, a promise has a then property function. It
is the main way of manipulating promises and their values. It takes two
optional callback parameters onFulfilled and onRejected: the first will be
called when the promise is fulfilled, and the second when the promise is
rejected.  When the fulfill function is called in executor with a value,
the promise internals pass it along, and then call this first callback with the
same value.

In practice, you can call the then property function multiple times, to do
multiple things with the value of the promise. Or, more commonly, you could do
them all in the same onFulfilled callback, which allows you to control more
easily the logic flows.

If you call fulfill function in executor without a parameter, the
onFulfilled callback(s) will still be called, but the parameter to those
callbacks will be undefined.

We will talk about rejecting in our next lesson.

## Task

Create a promise. Have it fulfilled with a value of 'FULFILLED!' in
executor after a delay of 300ms, using setTimeout.

Then, print the contents of the promise after it has been fulfilled by passing
console.log to then.

## [Solution](2-fulfilling-a-promise.js):
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('fulfilled!'.toUpperCase()), 300);
});

promise.then(value => console.log(value));

```

<br>

---

<br>


## Reject a promise
 ## Exercise 3 of 13

# Rejecting a Promise

After the last session, you should be able to create a promise, fulfill it
with a value, and read that value after the fulfillment of the promise. Now,
not all promises result in a successful execution; some errors may have
happened in the process. That's where promise rejection comes into play.

When a promise is rejected, this is typically (though not always) used to
indicate that a value was not successfully obtained by the promise. Promises
provide a way to pass the specific error that prevents the successful
execution.

Once a promise has been rejected, it can never be fulfilled (nor rejected
again). This aspect of promises will be explored deeper in the next lesson.

## Task

Create a promise that after a delay of 300ms, rejects with an Error object.
The Error object should be constructed with parameter 'REJECTED!', which is
the textual message of the error.

Create a function onReject to print error.message using console.log. Pass
this function as a rejection handler to the then method of your promise.

## [Solution](3-reject-a-promise.js):
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('rejected!'.toUpperCase())), 300);
});

promise.then(
  value => console.log(value), // on fulfilled
  ({ message }) => console.log(message) // on reject
);
```

<br>

---

<br>




 ## To reject or not to reject
 ## Exercise 4 of 13

# What happens if we reject AND resolve a promise?

The ES2015 spec states that a promise, once fullfilled or rejected, may
not change states for the rest of its lifetime.  This is an important
feature of promises and it is also one of the things that differentiates it
from an EventEmitter (and other forms of repeatable callbacks).

Callback-style code usually requires a callback function to be invoked
somewhere in the body of the function that it was passed to.  Many, if not
most times, that function is intended to be called only once.  However, through
errors in logic, problems with syntax, or other simple mistakes it is
possible to call your callback multiple times and create vexing states in your
app or insidious bugs.

    /*
     * This code is bad, but nonetheless common and has the nasty result of
     * calling the supplied callback more than once (possibly destroying the
     * earth?). It is conventional to return the first invocation of callback
     * but it’s easy to overlook!
     */

    function myFunc(user, callback) {
      if (user) {
        callback(null, user);
      }

      return callback('No user was found', null);
    }

## Task

Let’s build a simple script to prove to ourselves that promises may only
resolve one time and all future attempts to resolve them will simply be ignored.

First, create a promise using the Promise constructor as we have been doing.

In the promise’s executor, immediately attempt to fulfill the promise with a
value of 'I FIRED'.

Then, after the fulfill call, immediately try to reject the promise with an
Error created with parameter 'I DID NOT FIRE'.

After the promise creation, create a function onRejected with one parameter
error that prints the Error’s message with console.log.

Lastly, pass console.log and the function you just created as the success
and rejection handlers respectively.

If successful, your script should only log “I FIRED” and should not log
“I DID NOT FIRE”.


## [Solution](4-to-reject-or-not-to-reject.js):
```javascript
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
```

<br>

---

<br>


 ## Always asynchronous
 ## Exercise 5 of 13

# Are promises always resolved asynchronously?

The ES2015 spec declares that promises must not fire their
resolution/rejection function on the same turn of the event loop that they are
created on. This is very important because it eliminates the possibility of
execution order varying and resulting in indeterminate outcomes.

You can expect that the functions passed to the then method of a
promise will be called on the next turn of the event loop.

## Task

In this lesson, we are going to prove to ourselves that promises are always
asynchronous.

First, create a promise using the Promise constructor.

In the promise’s executor, immediately fulfill the promise with a value of
'PROMISE VALUE'.

After the creation of the promise, pass console.log as the success handler to
the promise.

Finally, print out “MAIN PROGRAM” with console.log.

## [Solution](5-always-asynchronous.js):
```javascript
const promise = new Promise((resolve, reject) => {
  resolve('promise value'.toUpperCase());
});

promise.then(console.log);

console.log('main program'.toUpperCase());
```


<br>

---

<br>


 ## Shortcuts
 ## Exercise 6 of 13


# Promise me... quicker

The ES2015 specification defines some shortcuts that make creating and working
with promises faster and easier.

The first is .catch. So far we already know how to handle the rejection of a
promise -- through the second parameter to .then function. However,
sometimes you only want to handle the rejection and not success. In these
cases, since the onFulfilled callback is optional, you can specify null in
place of it.  However, a much easier way to achieve this is to use .catch.
Instead of having to write

    promise.then(null, function (err) {
      console.error('THERE IS AN ERROR!!!');
      console.error(err.message);
    });

You could simply write

    promise.catch(function (err) {
      console.error('THERE IS AN ERROR!!!');
      console.error(err.message);
    });

This notation also has the benefit of making the syntax easier to understand for
people who do not speak Promises yet, since it is fairly obvious to everyone
who has done JavaScript programming to understand what catch means.

The second and third are Promise.resolve and Promise.reject. The code
examples below will tell you exactly what they do:

    // The way you have learned: create promise through the constructor.

    var promise = new Promise(function (fulfill, reject) {
      fulfill('SECRET VALUE');
    });

    // Introducing: Promise.resolve
    // It does the exact same thing as above:

    var promise = Promise.resolve('SECRET VALUE');


    // Likewise...

    var promise = new Promise(function (fulfill, reject) {
      reject(new Error('SECRET VALUE'));
    });

    var promise = Promise.reject(new Error('SECRET VALUE'));

## Task

We don’t have any specific task we’d like to assign to you for this lesson.
Feel free to explore all three functions at your own pace. When you are
preparing to submit though, make sure you are using at least catch and one
of Promise.resolve and Promise.reject ☺

## [Solution](6-shortcuts.js):
```javascript
const resolvePromise = Promise.resolve('resolve value');

const rejectPromise = Promise.reject(new Error('reject message'));

resolvePromise.then(console.log);

rejectPromise.catch(console.log);
```

<br>

---

<br>


 ## Promise after promise
 ## Exercise 7 of 13

# Promise followed by promises

So far, you have handled promise fulfillment and rejection, but all your
handlers have been done synchronously like printing text. What if you want to
do something asynchronously?

Let us refer back to the example we used in the first lesson.

    Parse.User.logIn('user', 'pass', {
      success: function (query) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });

Now, if all three functions return promises, you should be able to translate
this code into:

    Parse.User.logIn('user', 'pass').then(function (query) {
      query.find().then(function (results) {
        results[0].save({ key: value }).then(function (result) {
          // the object was saved
        });
      });
    });

That’s quite a lot better: the awkward success property functions have been
replaced. However, the despised pattern of “callback hell” is still there: if
you want to do more than three things the code will rack up fairly quickly.

To solve this problem, promises allow you to return another promise in the
then function callbacks. This new promise you return in the promise will in
turn be returned by then, so you can use it to do something after both of
the actions are done. For example, the above code can be replaced by:

    var originalPromise = Parse.User.logIn('user', 'pass');

    var findPromise = originalPromise.then(function (query) {
      // At this point, you have logged in.

      // query.find() returns another promise, which will become `findPromise`
      return query.find();
    });

    var savePromise = findPromise.then(function (results) {
      // At this point, the query finding is done.

      // The promise returned by `save` will become `savePromise`
      return results[0].save({ key: value });
    });

    savePromise.then(function (result) {
      // the object was saved
    });

which can then be simplified to:

    Parse.User.logIn('user', 'pass').then(function (query) {
      return query.find();
    }).then(function (results) {
      return results[0].save({ key: value });
    }).then(function (result) {
      // the object was saved
    });

That’s quite beautiful, no?

## Task

This task will allow you to demonstrate an understanding how to chain promises
together using then.

Two functions will be provided as global functions that you can use: first
and second.

Call the first function in your program. first() will return a promise that
will be fulfilled with a secret value.

Call the second with the fulfilled value of first. Return the promise returned
by second in your onFulfilled callback.

Finally, print the fulfilled value of that new promise with console.log.


## [Solution](7-promise-after-promise.js):
```javascript
first()
  .then(
    value => second(value).then(value => console.log(value)),
    reason => console.log(reason) // on rejected
  );
```

<br>

---

<br>



 ## Values and promises
 ## Exercise 8 of 13

# Do I HAVE to return promises?

No! Fulfillment handlers may return promises or values. Your Promises
library will do the correct thing and wrap your return value in a promise if
need be. This is awesome because it allows you to intermix values with
promises in a chain.

Imagine that you have a cache of models that may already contain a model you
would like to request from the server. You could check your cache
synchronously and return the found value or send an AJAX request to your
remote server to fetch it.

Wrapping this functionality in a promise means that both behaviors can be
consumed under a single abstraction:

    doSomeSetup()
      .then(function () {
        return cache.fetchModel(id) || promisedAjax("users/" + id);
      })
      .then(displayUser)

The key thing to understand here is that your handlers will wrap your
return values in promises even if they are obtained synchronously.

Another very important point to understand is that, as discussed before, the
returned value will resolve on the next turn of the event loop.

## Task

Construct a promise chain that returns values to prove to yourself that
promise handlers will wrap your returned values in promises allowing
additional chaining.

  * Declare a function `attachTitle` which prepends `'DR. '` to its firstargument and returns the result.
  * Create a fulfilled promise with a value of `'MANHATTAN'`.
  * Build a promise chain off the promise we just constructed that first calls`attachTitle` then calls `console.log`.

If your program runs successfully, it should print out “DR. MANHATTAN” which
is extremely exciting.

## [Solution](8-values-and-promises.js):
```javascript
function attachTitle(title = '') {
  return `DR. ${title}`;
}

const promise = Promise.resolve('manhattan'.toUpperCase());

promise
  .then(attachTitle)
  .then(console.log);
```



<br>

---

<br>


 ## Throw an error
 ## Exercise 9 of 13


# What happens when an error is thrown?

One of the tremendous strengths of promises is that they handle errors in a
manner similar to synchronous code.  Unlike in traditional callback-based code,
you do not need to strictly handle all your errors at every step.

If an error is thrown inside a function, it can be captured.

If an error is thrown inside a function, it will be handled by the next
available "rejection" handler.  This allows you to write code that looks
remarkably like a try/catch block would in synchronous code.

    try {
      doSomethingRisky();
      doAnotherRiskyThing();
    } catch (e) {
      console.log(e.message);
    }

The equivalent "promisified" code might look like:

    doSomethingRisky()
    .then(doAnotherRiskyThing)
    .then(null, console.log);

## Task

Let's build exactly the system discussed above.

Some invalid JSON will be available on process.argv[2].

  * Build a function called `parsePromised` that creates a promise,performs `JSON.parse` in a `try`/`catch` block, and fulfills or rejectsthe promise depending on whether an error is thrown.**Note:** your function should synchronously return the promise!
  * Build a sequence of steps like the ones shown above that catchesany thrown errors and logs them to the console.


## [Solution](9-throw-an-error.js):
```javascript
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
```


<br>

---

<br>


 ## An important rule
 ## Exercise 10 of 13


# There's always a catch… (lol pun)

Promises are designed to emulate synchronous control flows.
If any of them throw an exception, the exception will bubble up
through the stack until it is caught by a catch block or
hits the global context where it will be thrown.

In the code below, each expression is evaluated one after the
other.  If any expression throws an exception, all subsequent
expressions will not be executed and the catch block
will catch and handle it.

    try {
      doStuff()
      doMoreStuff()
    } catch (err) {
      complainAboutJavascript(err);
    }

With promises, we can achieve a very similar control flow as shown
(assume all functions return promises):

    doStuff()
    .then(doMoreStuff)
    .then(null, complainAboutJavascript);

Maybe we should combine the last two lines since one is a fulfill
handler and the other is a rejection handler?  NO!  While this
might initially seem sensible consider what would happen if
doMoreStuff threw an error.  Since the promise returned from it
would be rejected, it would look for the next rejection handler
to handle it.

Remember: A promise can never resolve more than once.

It is, therefore, a best practice to always put a rejection handler
at the bottom of your promise chain (much like a catch block).

It is worth pointing out that both the synchronous and asynchronous
code have the same problem.  If the rejection handler itself throws
an error you are going to have a bad time.

Many promise libraries try to ameliorate this problem for you
by providing a done handler that simply handles any uncaught
errors.  The rule of thumb is this:

  > If you are **not** returning a value from your promise to a caller,
  > then attach a `done` handler to guard against uncaught exceptions.

An example is shown below:

    doStuff()
    .then(doMoreStuff)
    .then(null, complainAboutJavascript)
    .done();

## Task

We are going to demonstrate this to ourselves by creating a chain
of functions that all print to the console.

  * Create a function `alwaysThrows` that throws an `Error` withtext `"OH NOES"`;
  * Create a function `iterate` that prints the first argument(an integer) to it and then returns that argument + 1;
  * Create a promise chain using `Promise.resolve` that wraps your iterate method, then a series of iterations that attempts to perform `iterate` a total of 10 times.
  * Attach a rejection handler at the bottom of your chain to print the`error.message` using `console.log`.
  * Insert a call to `alwaysThrows` after your 5th call of `iterate`

If you have done this correctly, your code should print 1,2,3,4,5,
"[Error: OH NOES]".  It's important to notice that the thrown exception was
turned into a rejected promise which caused the rejected promise to
travel down the promise chain to the first available rejection handler.

## Bonus

Try swapping your rejection handler from console.log to alwaysThrows.
Your program will now throw an exception in the global context!  Ahh!
Try to fix this using the approach described above.


## [Solution](10-an-important-rule.js):
```javascript
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

  // Bonus:
  .then(null, alwaysThrows)
  .catch(({ message }) => console.log(message));
```

<br>

---

<br>


 ## Multiple promises
 ## Exercise 11 of 13

(node:19359) [DEP0022] DeprecationWarning: os.tmpDir() is deprecated. Use os.tmpdir() instead.

# Can you do what Async.js does?

When doing asynchronous programming you will often want to perform multiple
operations in parallel. In some cases you may wish to delay further processing
until a list of async operations have completed.

In synchronous code this is trivial because our operations are executed in the
order they are specified:

    var thingOne = getThing(1);
    var thingTwo = getThing(2);

    combine(thingOne, thingTwo);

We would like to build a function such that we can specify a list of
asynchronous values we would like to fetch and then use once all are
available.

    getAll(fetch(1), fetch(2))
      .then(function (values) {
        console.log(values[0], values[1]);
      });

## Task

Let’s build this function!

Create a function all that accepts two promises as arguments. This all
function should do all of the following:

Create an internal promise in whatever way you see fit.

Create a counter variable with initial value of 0.

Attach then fulfillment handlers to both promises and increment the internal
counter when the handlers are called.

When the counter reaches 2, fulfill the internal promise with an array
containing both values.

Finally return that internal promise to the user.

After you finish writing your all function, pass getPromise1() and
getPromise2() into your new function and then attach console.log as a
fulfillment handler to the promise returned by your function. These two
promise-returning functions will be provided to you in the global scope.

## Hint

You probably want to use the good old Promise constructor. If you do find some
other way, please [file an
issue](https://github.com/stevekane/promise-it-wont-hurt/issues); I’m
interested in such a solution!

**While this lesson is a good practice for your skills, in real world
programming, such a task is usually achieved by using Promise.all utility
function, which we are basically reimplementing. It works by taking an
iterable (like an array) of promises, rather than separate arguments. It also
handles error catching, and any errors will be forwarded.**

    Promise.all([getPromise1(), getPromise2()])
      .then(onFulfilled, onRejected);

In this lesson though, rest assured that that Promise.all is disabled 😈


## [Solution](11-multiple-promises.js):
```javascript
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
  .then(console.log)
  .catch(console.log)
```


<br>

---

<br>


 ## Fetch JSON
 ## Exercise 12 of 13


# Let's do something, you know, from "real life"

Fetching JSON data from remote machines via AJAX is commonplace
on both the server and client.  Promises also happen to map to AJAX
particularly well.  Any AJAX request may either succeed or fail,
never both.  Promises may fulfill or reject, never both.

Let's use a new module called q-io to take advantage of its http.read
method which returns a promise for the value of a successful HTTP response
body.


## Task

Fetch JSON from [http://localhost:1337](http://localhost:1337) and console.log it.

There are several things you will want to know:

  * `q-io`'s `http` module has a `read` method which returns a promise for thecontent of a successful (status 200) HTTP request.
  * Parse the returned JSON and `console.log` it for much win.

This challenge is a bit tricky but the implementation is relatively
straightforward.  If you get stuck, refer to the q-io documentation for
clarification:

  [http://localhost:1337](http://localhost:1337)


## [Solution](12-fetch-json.js):
```javascript
const qioHttp = require('q-io/http');

qioHttp.read('http://localhost:1337')
  .then(value => console.log(JSON.parse(value)))
  .catch(({ message }) => console.log(message));
```

<br>

---

<br>

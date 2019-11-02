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

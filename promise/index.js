const MyPromise = require('./promise');

const myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'Success!', id: 123123 });
  }, 2000);
});

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  })
  .catch(error => console.log(`oops, this is ${error}`));

// error test code
myFirstPromise
  .then(successMessage => {
    successMessage.hello();
  })
  .then(data => {
    console.log(`data is ${data}`);
  })
  .catch(error => console.log(`oops, I found error! error: [${error}]`));

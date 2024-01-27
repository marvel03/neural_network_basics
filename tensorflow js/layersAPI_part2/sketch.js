const model = tf.sequential()
const layer1 = tf.layers.dense({
  inputShape: [2],
  units: 5,
  activation: 'relu'
})

const layer2 = tf.layers.dense({
  units: 2,
  // activation: "sigmoid",
})

model.add(layer1)
model.add(layer2)

let learning_rate = 0.3
const my_optimizer = tf.train.sgd(learning_rate)

model.compile({
  loss: 'meanSquaredError',
  optimizer: my_optimizer,
  metrics: ['accuracy']
})


const inputs_train = tf.tensor([// note: the shape of the data thats created here, it has to done like this 
  [1, 0],
  [0, 0],
  [1, 1],
  [0, 1]
])

const output_train = tf.tensor([
  [0, 1],
  [0, 0],
  [1, 0],
  [0, 1]
])

// now note: that the model.fit() function is a asynchronous function that returns 
// a promise, promises have three states,
// 1. promise fulfilled
// 2. promise unfulfilled
// 3. or waiting 

//   now we r only interested in the first state, so we wait till the promise is fulfiled
// using the 'await' keyword, and in order to use the await keyword we have to define it in a async function
// in this case the 'train()' function 
// now once a promise is fulfilled, u use the "then" keyword with the arrow(=> ) 
// notation to  run the next statement or function, right after that,
// coz sometimes, as this is an async method, code defined after this can execute first,
// something similar to 'finally' keyword from java, thats implemented right after the try catch block



train().then(() => {
  console.log('training completed')
  console.log('\npredicting output we get:')
  const output_predicted = model.predict(inputs_train)// all this is a tensor ok, use print() to see it 
  console.log(output_predicted.arraySync())
})

async function train() {
  const config = {// this is user defined ok,
    epoch: 10,
    shuffle: true,
    // batchSize: 1
  }
  for (let i = 0; i < 100; i++) {// here u can use the for loop too
    let response = await model.fit(inputs_train, output_train, config)
    console.log(response.history.loss + " " + response.history.acc)// notice the 'response' is a promise thats fulfilled 
  }

}



const input_train = tf.tensor([
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
])

const output_train = tf.tensor([
  [0],
  [1],
  [1],
  [0]
])

console.log(input_train.shape[1])
const model = tf.sequential();
const layer1 = tf.layers.dense({
  inputShape: [input_train.shape[1]],
  units: 5,
  activation: 'sigmoid'
})

const layer2 = tf.layers.dense({
  units: output_train.shape[1],
  activation: 'sigmoid'
})

model.add(layer1)
model.add(layer2)
let learning_rate = 0.3
const my_optimizer = tf.train.sgd(learning_rate)


const config = {
  epochs: 10,
  shuffle: true,
}
model.compile({
  loss: 'meanSquaredError',
  optimizer: my_optimizer,
  metrics: ['accuracy']
})
let loss = 0
function train() {
  trainModel().then((response) => {
    loss = response.history.loss[0]
    console.log(loss)// this is array , its size is equal to the no. of epochs

    setTimeout(train, 10)
  })
};

async function trainModel() {
  return await model.fit(input_train, output_train, config)
}

function setup() {
  createCanvas(800, 800)
  background(0)
  setTimeout(train, 10)

}
function draw() {
  // using the setTimeout function, the train() function will be triggered automatically after a set period 
  let predicted_tf = model.predict(input_train).arraySync()
  console.log(predicted_tf)
}


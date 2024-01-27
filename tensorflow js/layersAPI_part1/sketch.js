const model = tf.sequential()
const layer1_properties = {
  inputShape: [2],
  units: 4,
  acitvation: 'relu'
}
model.add(tf.layers.dense(layer1_properties))// the first hidden layer
// this is one way of making a layer 
// or u can do ->

model.add(tf.layers.dense({
  units: 3,
  activation: 'relu'
}))

// or u could also do this:
const output_layer = tf.layers.dense({
  units: 2,
  activation: 'sigmoid'
})

// now if u want u can define ur own loss and optimizer function, so im gonna do it for 
// the optimizer
let learning_rate = 0.3
const sgd_optimizer = tf.train.sgd(learning_rate)
model.compile({
  optimizer: sgd_optimizer,
  loss: 'meanSquaredError'
})





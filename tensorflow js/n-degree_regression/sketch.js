let x = []
let y = []
const maxDegrees = 15
let x_tf
let y_t

let model = tf.sequential()
const layer1 = tf.layers.dense({
  inputShape: maxDegrees,
  units: 1,
  bias: true,
  actiavation: "tanh"
})

model.add(layer1)
let lr = 0.3
const my_opt = tf.train.adam(lr)
model.compile({
  loss: "meanSquaredError",
  optimizer: my_opt
})
function train() {
  trainModel().then((response) => {
    // console.log(response.history.loss[0])
    setTimeout(train, 10)
  })
}

async function trainModel() {
  return await model.fit(x_tf, y_tf, epochs = 10)
}


function setup() {
  createCanvas(800, 600);
  let dum_x = []
  for (let i = 0; i < maxDegrees; i++) {
    dum_x.push(random(-1, 1))
  }
  let dum_y = [[random(-1, 1)]]
  x_tf = tf.variable(tf.tensor([dum_x]))
  y_tf = tf.variable(tf.tensor(dum_y))
  setTimeout(train, 10)
}

function draw() {
  background(0);
  if (x.length > 0) {
    x_tf = tf.variable(tf.tensor(x))
    y_tf = tf.variable(tf.tensor(y))
  }
  plotClicks(x, y)
  let curveX = []
  for (i = - 1; i <= 1.05; i += 0.05) {
    curveX.push(i)
  }
  let curveX_tf = getInputs(curveX)
  // curveX_tf.print()

  let curveY_tf = model.predict(curveX_tf)
  // curveY_tf.print()

  stroke(255)
  strokeWeight(2)
  beginShape()
  noFill()
  for (let i = 0; i < curveX_tf.shape[0]; i++) {
    let valX = map(curveX_tf.arraySync()[i][maxDegrees - 1], -1, 1, 0, width)
    let valY = map(curveY_tf.arraySync()[i][0], -1, 1, height, 0)
    // console.log(valX + "," + valY)

    vertex(valX, valY)
  }
  endShape()

}

function mousePressed() {
  let mx = map(mouseX, 0, width, -1, 1)
  let my = map(mouseY, height, 0, -1, 1)
  let tempX = []
  for (let i = maxDegrees; i > 0; i--) {
    tempX.push(Math.pow(mx, i))
  }
  x.push(tempX)
  y.push([my])
}

function plotClicks(x, y) {
  stroke(255)
  strokeWeight(3)
  x.forEach((x_, i) => {
    px = map(x_[maxDegrees - 1], -1, 1, 0, width)
    py = map(y[i][0], -1, 1, height, 0)
    point(px, py)
  })
}

function getInputs(curveX) {
  let x_ = []
  curveX.forEach((val) => {
    temp = []
    for (i = maxDegrees; i > 0; i--) {
      temp.push(Math.pow(val, i))
    }
    x_.push(temp)
  })
  let curve_tf = tf.variable(tf.tensor(x_))
  return curve_tf
}
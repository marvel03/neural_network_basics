// Initialize arrays for data points
let x = [];
let y = [];

// Initialize variables for slope (m) and y-intercept (b)
let a
let b;
let c

// Set the learning rate for stochastic gradient descent
const learning_rate = 0.1

// Create an optimizer using stochastic gradient descent
const optimizer = tf.train.adam(learning_rate);

// Define the loss function (Mean Squared Error)
function loss(pred, actual) {
  return pred.sub(actual).square().mean()
}

// Setup function for p5.js
function setup() {
  // Create a canvas
  createCanvas(800, 600);

  // Set the background color
  background(0);

  // Initialize 'm' and 'b' as scalar variables with random values
  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)))
}

// Prediction function for polynomial regression
function predict(x_) {
  // Create a tensor for the input array
  const tf_x = tf.tensor1d(x_);
  // Use the linear equation for prediction: y = ax^2+bx^1+c (quadratic regression)
  const tf_y = tf_x.square().mul(a).add(tf_x.square().mul(b)).add(c);
  return tf_y;
}

// Draw function for p5.js
function draw() {
  // Set the background color
  background(0);

  // If there are data points, perform optimization
  tf.tidy(() => {
    if (x.length > 0) {
      // Create a tensor for the target values (y)
      const tf_y = tf.tensor1d(y);
      // Minimize the loss using stochastic gradient descent
      optimizer.minimize(() => loss(predict(x), tf_y), [a, b, c]);
    }
  })
  // Plot the data points
  for (let i = 0; i < x.length; i++) {
    stroke(255);
    strokeWeight(5);
    let px = map(x[i], -1, 1, 0, width);
    let py = map(y[i], 1, -1, 0, height);
    point(px, py);
  }

  // Generate points for the curve line
  let curveX = []
  for (let i = -1; i <= 1.05; i += 0.05) {
    curveX.push(i)
  }
  curveY_tf = tf.tidy(() => predict(curveX))
  let curveY = curveY_tf.dataSync()
  curveY_tf.dispose()

  beginShape()
  noFill()
  strokeWeight(2)
  stroke(255)
  for (i = 0; i < curveX.length; i++) {
    let x = map(curveX[i], -1, 1, 0, width)
    let y = map(curveY[i], 1, -1, 0, height)
    vertex(x, y)
  }

  endShape()
  console.log(tf.memory().numTensors)
}

// MousePressed function for adding data points
function mousePressed() {
  // Map mouse coordinates to the range [0, 1]

  let mx = map(mouseX, 0, width, -1, 1);
  let my = map(mouseY, 0, height, 1, -1);

  // Add the data point to the arrays
  if (mx > -1 && mx < 1 && my > -1 && my < 1) {
    x.push(mx);
    y.push(my);
  }
}

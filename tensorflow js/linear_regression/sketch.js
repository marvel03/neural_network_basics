// Initialize arrays for data points
let x = [];
let y = [];

// Initialize variables for slope (m) and y-intercept (b)
let m;
let b;

// Set the learning rate for stochastic gradient descent
const learning_rate = 0.8;

// Create an optimizer using stochastic gradient descent
const optimizer = tf.train.sgd(learning_rate);

// Define the loss function (Mean Squared Error)
function loss(pred, actual) {
  return pred.sub(actual).square().mean();
}

// Setup function for p5.js
function setup() {
  // Create a canvas
  createCanvas(800, 600);

  // Set the background color
  background(0);

  // Initialize 'm' and 'b' as scalar variables with random values
  m = tf.variable(tf.scalar(random(0, 1)));
  b = tf.variable(tf.scalar(random(0, 1)));
}

// Prediction function for linear regression
function predict(x_) {
  // Create a tensor for the input array
  const tf_x = tf.tensor1d(x_);

  // Use the linear equation for prediction: y = mx + b
  const tf_y = tf_x.mul(m).add(b);

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
      optimizer.minimize(() => loss(predict(x), tf_y), [m, b]);
    }
  })

  // Plot the data points
  for (let i = 0; i < x.length; i++) {
    stroke(255);
    strokeWeight(5);
    let px = map(x[i], 0, 1, 0, width);
    let py = map(y[i], 1, 0, 0, height);
    point(px, py);
  }

  // Generate points for the linear regression line

  let lineX = [0, 1];
  let tf_lineY = tf.tidy(() => predict(lineX));
  let lineY = tf_lineY.arraySync();
  tf_lineY.dispose()
  // Map the line points to canvas coordinates and draw the line
  let x1 = map(lineX[0], 0, 1, 0, width);
  let y1 = map(lineY[0], 1, 0, 0, height);
  let x2 = map(lineX[1], 0, 1, 0, width);
  let y2 = map(lineY[1], 1, 0, 0, height);

  // Set the stroke weight and draw the line
  strokeWeight(2);
  line(x1, y1, x2, y2);


  console.log(tf.memory().numTensors);// helps u calculate the no. of tensors after each iteration
  // use it to detect memory leaks , this no. should remain constant 
  // detect leaks by commenting certain parts of the code 
}

// MousePressed function for adding data points
function mousePressed() {
  // Map mouse coordinates to the range [0, 1]
  let mx = map(mouseX, 0, width, 0, 1);
  let my = map(mouseY, 0, height, 1, 0);

  // Add the data point to the arrays
  x.push(mx);
  y.push(my);
}

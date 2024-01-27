function setup() {
  createCanvas(400, 400);
  noCanvas()

  const data = tf.tensor([1, 1, 2])
  const data2 = tf.tensor([1, 2, 3, 4], shape = [2, 2])

  data.print()
  data2.print()
}



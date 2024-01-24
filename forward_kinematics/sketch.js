const downloadButton = document.getElementById('download_button')
const setMaxIteration = document.getElementById('set_Iteration')
const startButton = document.getElementById('start')
let textBox = document.getElementById('max_Iteration')

downloadButton.addEventListener('click', function () {
  if (download_State == false) {
    alert('max Iterations havent been reached')
  } else {
    // Convert training data to CSV string
    const csvString = convertToCSV(training_data);
    // Save CSV data to a file (you can choose a different file name)
    saveCSVToFile(csvString, 'training_data.csv');
  }
})

setMaxIteration.addEventListener('click', function () {
  console.log(textBox.value)
  if (textBox.value != '') {
    maxIterations = parseInt(textBox.value)
  }
})


let start = false
startButton.addEventListener('click', function () {
  if (start == true) {
    points = []
    training_data = []
    c = 0
    clear()
    console.clear()
    setup()
    loop()
    start = false
  } else {
    start = true
  }
})

function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
  return `${headers}\n${rows}`;
}

// Save CSV data to a file (browser environment)
function saveCSVToFile(csvData, fileName) {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
class Segment {
  constructor(len_, angle_, x_ = null, y_ = null, parent_ = null) {
    this.len = len_
    this.angle = angle_
    this.selfAngle = angle_
    this.parent = parent_

    if (this.parent == null) {
      this.a = createVector(x_, y_)
      this.b = createVector(x_, y_)
      this.parent = parent_
    }
    else {
      this.parent = parent_
      this.a = createVector(parent_.b.x, parent_.b.y)
      this.b = createVector(this.a.x, this.a.y)
    }
    this.calcB()
  }
  calcB() {
    this.b.x = this.a.x + this.len * cos(this.angle)
    this.b.y = this.a.y + this.len * sin(this.angle)
  }
  updateAngle(angle_ = 0) {
    this.selfAngle = angle_
  }
  update() {
    this.angle = this.selfAngle;

    if (this.parent != null) {
      this.a.x = this.parent.b.x;
      this.a.y = this.parent.b.y;
      this.angle += this.parent.angle;
    }

    this.calcB();
  }
  show() {
    stroke(255)
    strokeWeight(3)
    this.calcB()
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
  getB() {
    return this.b
  }
  getPoint() {
    return { x: this.b.x, y: this.b.y }
  }

}
let seg = new Array(3)
let points = []
let training_data = []
let maxIterations = 100

let len = 100
function setup() {
  createCanvas(1000, 700);
  background(0)
  seg[0] = new Segment(len, radians(0), width / 2, height / 2)
  console.log(width / 2 + " " + height / 2)
  for (let i = 1; i < seg.length; i++) {
    seg[i] = new Segment(len, radians(0), 0, 0, seg[i - 1])
  }

}

let c = 0
let download_State = false
let thetas = []
function draw() {
  console.log(start)
  if (start == false) {
    background(0)
  } else {
    background(0);
    download_State = false
    if (c < maxIterations) {
      points.forEach((p) => {
        stroke(0, 255, 0)
        strokeWeight(2)
        point(p.x, p.y)
      })

    } else {
      points.forEach((p) => {
        stroke(0, 255, 0)
        strokeWeight(2)
        point(p.x, p.y)
      })
      print(training_data)
      download_State = true
      noLoop()
    }
    seg.forEach((obj, i) => {
      obj.update()
      let t = radians(Math.round(Math.random() * 180 - 90))
      if (i == 0) {
        t = radians(Math.round(Math.random() * 360 - 180))
      }
      obj.updateAngle(t)
      thetas.push(t)
      obj.show()

      if (i == seg.length - 1 && c < maxIterations) {
        let b = seg[seg.length - 1].getB()
        let mapped_b = coordinateMapping(b.x, b.y)
        let degrees = thetas.map(theta => radiansToDegrees(theta))
        let mappedAngles = angleMapping(degrees)
        // console.log(mappedAngles)
        console.log(mapped_b.x + " " + mapped_b.y + ", " + mappedAngles[0] + "," + mappedAngles[1] + "," + mappedAngles[2])
        points.push(obj.getPoint())
        training_data.push({
          x: mapped_b.x,
          y: mapped_b.y,
          theta1: mappedAngles[0],
          theta2: mappedAngles[1],
          theta3: mappedAngles[2]
        });
        thetas = []
      }
    })
    c++
  }

}


function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function coordinateMapping(x, y) {
  let mappedX = map(x, 0, width, -1, 1)
  let mappedY = map(y, 0, height, 1, -1)
  return { x: mappedX, y: mappedY }
}

function angleMapping(thetas) {
  let mappedAngles = []
  thetas.forEach((theta, i) => {
    if (i == 0) {
      mappedAngles[i] = map(theta, -180, 180, -1, 1)
    } else
      mappedAngles[i] = map(theta, -90, 90, -1, 1)
  })
  return mappedAngles
}
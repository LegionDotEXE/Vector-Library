// DrawRectangle.js
function main() {
  // Retrieve <canvas> element                                
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG                          
  var ctx = canvas.getContext('2d');

  // Fill the canvas with black
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, 400, 400);

  // Instantiate vector v1 using Vector3 class
  // var v1 = new Vector3([2.25, 2.25, 0.0]);
  // drawVector(v1, "red");
}

function drawVector(v, color) {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Draw from the center of the 400x400 canvas, scaled by 20
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function angleBetween(v1, v2) {
  var d = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();
  if (mag1 === 0 || mag2 === 0) {
    console.log('Error: Cannot compute angle with a zero-length vector');
    return 0;
  }
  // Clamp the cosine value to the range [-1, 1] to avoid numerical issues with acos
  var cosAlpha = Math.max(-1, Math.min(1, d / (mag1 * mag2)));
  var angleRad = Math.acos(cosAlpha);
  // Convert radians to degrees
  var angleDeg = angleRad * (180.0 / Math.PI);
  return angleDeg;
}

function areaTriangle(v1, v2) {
  // Cross product of v1 and v2
  var crossVec = Vector3.cross(v1, v2);
  // Area of triangle = half the magnitude of the cross product
  var area = crossVec.magnitude() / 2.0;
  return area;
}

function handleDrawEvent() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, 400, 400);

  // Read values from text boxes 
  var x = parseFloat(document.getElementById('xCoord').value);
  var y = parseFloat(document.getElementById('yCoord').value);
  var v1 = new Vector3([x, y, 0.0]);


  drawVector(v1, "red");

  // Read values from text boxes to create v2
  var x2 = parseFloat(document.getElementById('xCoord2').value);
  var y2 = parseFloat(document.getElementById('yCoord2').value);
  var v2 = new Vector3([x2, y2, 0.0]);

  // Draw v2 in blue
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, 400, 400);

  // Read values from text boxes to create v1 and draw in red
  var x = parseFloat(document.getElementById('xCoord').value);
  var y = parseFloat(document.getElementById('yCoord').value);
  var v1 = new Vector3([x, y, 0.0]);
  drawVector(v1, "red");

  // Read values from text boxes to create v2 and draw in blue
  var x2 = parseFloat(document.getElementById('xCoord2').value);
  var y2 = parseFloat(document.getElementById('yCoord2').value);
  var v2 = new Vector3([x2, y2, 0.0]);
  drawVector(v2, "blue");

  // Read the operation selector and scalar value
  var op = document.getElementById('operation').value;
  var scalar = parseFloat(document.getElementById('scalar').value);

  // Perform the selected operation and draw result(s) in green
  if (op == "add") {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.add(v2);
    drawVector(v3, "green");
  } else if (op == "sub") {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.sub(v2);
    drawVector(v3, "green");
  } else if (op == "mul") {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.mul(scalar);
    drawVector(v3, "green");
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v4.mul(scalar);
    drawVector(v4, "green");
  } else if (op == "div") {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.div(scalar);
    drawVector(v3, "green");
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v4.div(scalar);
    drawVector(v4, "green");
  } else if (op == "magnitude") {
    console.log("Magnitude v1: " + v1.magnitude());
    console.log("Magnitude v2: " + v2.magnitude());
  } else if (op == "normalize") {
    var v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.normalize();
    drawVector(v3, "green");
    var v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v4.normalize();
    drawVector(v4, "green");
  } else if (op == "angle") {
    var angle = angleBetween(v1, v2);
    console.log("Angle between v1 and v2: " + angle);
  // } else if (op == "angle") { ...
  } else if (op == "area") {
    var area = areaTriangle(v1, v2);
    console.log("Area of the triangle: " + area);
  }
}
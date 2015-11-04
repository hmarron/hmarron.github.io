function draw(points, lines, background, goldenVars, canvas){
  var prevX = -1;
  var prevY = -1;

  //backgroundColour
  canvas.element.clearRect(0,0,canvas.width,canvas.height);
  canvas.element.fillStyle = background.colour;
  if(background.randomColours){
    canvas.element.fillStyle = randomColour();
  }
  canvas.element.rect(0,0,canvas.width,canvas.height);
  canvas.element.fill();

  //draw params
  var phi = (Math.sqrt(goldenVars.gv1)+goldenVars.gv2)/goldenVars.gv3 - goldenVars.gv4;
  var golden_angle = phi*goldenVars.gv5*Math.PI;
  var lg_rad = canvas.width * .40;

  var cx = canvas.width/2;
  var cy = canvas.height/2;

  //main draw loop
  for (var i = 1; i <= points.num; ++i) {
    canvas.element.beginPath();
    var ratio = i/points.num;
    var angle = i*golden_angle;
    var spiral_rad = ratio * lg_rad;
    var x = cx + Math.cos(angle) * spiral_rad;
    var y = cy + Math.sin(angle) * spiral_rad;

    //draw circle
    if(points.enabled){
      canvas.element.fillStyle=points.colour;
      canvas.element.strokeStyle=points.colour;
      if(points.randomColours){
        canvas.element.fillStyle=randomColour();
        canvas.element.strokeStyle=randomColour();
      }
      canvas.element.shadowColor = points.shadowsColour;
      canvas.element.lineWidth=points.radius;
      canvas.element.arc(x, y, points.radius, 0, 2*Math.PI, false);
      canvas.element.shadowBlur = points.shadowsSize;
      if(points.hollow){
        canvas.element.stroke();
      }else{
        canvas.element.fill();
      }
    }

    //draw line
    if(lines.enabled){
      canvas.element.fillStyle = lines.colour;
      canvas.element.strokeStyle = lines.colour;
      if(lines.randomColours){
        canvas.element.fillStyle=randomColour();
        canvas.element.strokeStyle=randomColour();
      }

      canvas.element.lineWidth = lines.thickness;
      canvas.element.shadowColor = lines.shadowsColour;
      canvas.element.shadowBlur = lines.shadowsSize;
      if(prevX != -1 && prevY != -1){
        canvas.element.moveTo(x,y);
        canvas.element.lineTo(prevX,prevY);
        canvas.element.stroke();
      }
      prevY = y;
      prevX = x;
    }
  }
}

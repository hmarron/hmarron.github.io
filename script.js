var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var points = {};
var lines = {};
var background = {};
var goldenVars = {};
var canvas = {};

function updateDrawParams(){
  points.num = parseInt($("#pointsNum").val());
  points.enabled = $("#pointsEnable").is(":checked");
  points.hollow = $("#pointsHollow").is(":checked");
  points.colour = $("#pointsColour").val();
  points.radius = parseInt($("#pointsRadius").val());
  points.shadowsEnabled = $("#pointsShadowsEnable").is(":checked");
  points.shadowsSize = parseFloat($("#pointsShadowsSize").val());
  points.shadowsColour = $("#pointsShadowsColour").val();
  points.randomColours = $("#pointsRandomColours").is(":checked");

  background.colour = $("#backgroundColour").val();
  background.randomColours = $("#backgroundRandomColours").is(":checked");

  lines.enabled = $("#linesEnable").is(":checked");
  lines.colour = $("#lineColour").val();
  lines.thickness = parseInt($("#lineThickness").val());
  lines.shadowsEnabled = $("#lineShadowsEnable").is(":checked");
  lines.shadowsSize = parseFloat($("#linesShadowsSize").val());
  lines.shadowsColour = $("#linesShadowsColour").val();
  lines.randomColours = $("#linesRandomColours").is(":checked");

  goldenVars.gv1 = parseFloat($("#goldenVar1").val());
  goldenVars.gv2 = parseFloat($("#goldenVar2").val());
  goldenVars.gv3 = parseFloat($("#goldenVar3").val());
  goldenVars.gv4 = parseFloat($("#goldenVar4").val());
  goldenVars.gv5 = parseFloat($("#goldenVar5").val());

  canvas.element = document.getElementById("canvas").getContext("2d");
  canvas.height = $("#canvasWidth").val();
  canvas.width = $("#canvasHeight").val();
  $("#canvas").attr("height",canvas.height);
  $("#canvas").attr("width",canvas.width);
}

$( document ).ready(function() {
  updateDrawParams();
  draw(points,lines,background,goldenVars,canvas);
});

$("#drawButton").click(function(){
  updateDrawParams();
  console.log(points)
  console.log(lines)
  console.log(background)
  console.log(goldenVars)
  console.log(canvas)
  draw(points,lines,background,goldenVars,canvas);
});

$("input").change(function(){
  updateDrawParams();
  draw(points,lines,background,goldenVars,canvas);
});

function randomColour(){
  //16777215 == #FFFFFF
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

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
        console.log(randomColour());
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

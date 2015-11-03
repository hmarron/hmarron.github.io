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
  /*console.log(points)
  console.log(lines)
  console.log(background)
  console.log(goldenVars)
  console.log(canvas)*/
  draw(points,lines,background,goldenVars,canvas);
});

$("input").change(function(){
  updateDrawParams();
  draw(points,lines,background,goldenVars,canvas);
});

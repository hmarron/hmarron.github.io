var frame1 = {};
var frame2 = {};
var time = 10;

var frameRate = 10;

$("#firstFrameButton").click(function(){
  frame1.points = cloneObj(points);
  frame1.lines = cloneObj(lines);
  frame1.background = cloneObj(background);
  frame1.goldenVars = cloneObj(goldenVars);
});

$("#lastFrameButton").click(function(){
  frame2.points = cloneObj(points);
  frame2.lines = cloneObj(lines);
  frame2.background = cloneObj(background);
  frame2.goldenVars = cloneObj(goldenVars);
});

$("#playButton").click(function(){
  time = parseFloat($("#animationTime").val());
  lerp(time, frameRate, frame1, frame2);
});

function lerp(time, frameRate, f1, f2){
  var numFrames = time * frameRate; //300
  var frameDisplayTime = time / numFrames; // 0.1
  var changeRate = {};
  changeRate.points = {};
  changeRate.points.num = Math.round((frame2.points.num - frame1.points.num)/numFrames);
  changeRate.points.radius = ((frame2.points.radius - frame1.points.radius)/numFrames);
  changeRate.points.shadowsSize = ((frame2.points.shadowsSize - frame1.points.shadowsSize)/numFrames);

  changeRate.lines = {};
  changeRate.lines.thickness = ((frame2.lines.thickness - frame1.lines.thickness)/numFrames);
  changeRate.lines.shadowsSize = ((frame2.lines.shadowsSize - frame1.points.shadowsSize)/numFrames);

  changeRate.goldenVars = {};
  changeRate.goldenVars.gv1 = ((frame2.goldenVars.gv1 - frame1.goldenVars.gv1)/numFrames);
  changeRate.goldenVars.gv2 = ((frame2.goldenVars.gv2 - frame1.goldenVars.gv2)/numFrames);
  changeRate.goldenVars.gv3 = ((frame2.goldenVars.gv3 - frame1.goldenVars.gv3)/numFrames);
  changeRate.goldenVars.gv4 = ((frame2.goldenVars.gv4 - frame1.goldenVars.gv4)/numFrames);
  changeRate.goldenVars.gv5 = ((frame2.goldenVars.gv5 - frame1.goldenVars.gv5)/numFrames);

  console.log(frame1);
  console.log(frame2);

  function loop(){
    points.num += changeRate.points.num;
    points.radius += changeRate.points.radius;
    points.shadowsSize += changeRate.points.shadowsSize;

    lines.thickness += changeRate.lines.thickness;
    lines.shadowsSize += changeRate.lines.shadowsSize;

    goldenVars.gv1 += changeRate.goldenVars.gv1;
    goldenVars.gv2 += changeRate.goldenVars.gv2;
    goldenVars.gv3 += changeRate.goldenVars.gv3;
    goldenVars.gv4 += changeRate.goldenVars.gv4;
    goldenVars.gv5 += changeRate.goldenVars.gv5;

    console.log(points);
    console.log(lines);
    console.log(goldenVars);

    draw(points,lines,background,goldenVars,canvas);
  }

  points = cloneObj(frame1.points);
  lines =  cloneObj(frame1.lines);
  goldenVars = cloneObj(frame1.goldenVars);
  var myTimer=setInterval(loop,1000 * frameDisplayTime);
  setTimeout(function(){
    clearInterval(myTimer);
  },time * 1000);
}

function cloneObj(obj){
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

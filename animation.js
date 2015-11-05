var encoder = {};
var frame1 = {};
var frame2 = {};
var frame3 = {};
var time = 10;

var frameRate = 10;

$("#firstFrameButton").click(function(){
  frame1.points = cloneObj(points);
  frame1.lines = cloneObj(lines);
  frame1.background = {}
  frame1.background.colour = background.colour;
  frame1.goldenVars = cloneObj(goldenVars);
});

$("#secondFrameButton").click(function(){
  frame2.points = cloneObj(points);
  frame2.lines = cloneObj(lines);
  frame2.background = {}
  frame2.background.colour = background.colour;
  frame2.goldenVars = cloneObj(goldenVars);
});

/*$("#thirdFrameButton").click(function(){
  frame3.points = cloneObj(points);
  frame3.lines = cloneObj(lines);
  frame3.background = {}
  frame3.background.colour = background.colour;
  frame3.goldenVars = cloneObj(goldenVars);
});*/

$("#playButton").click(function(){
  console.log("playing");
  time = parseFloat($("#animationTime").val());
  //lerp(time, frameRate, frame1, frame2, function(){lerp(time, frameRate, frame2, frame3,null)});
  lerp(time, frameRate, frame1, frame2, false, null);
});

$("#gifButton").click(function(){
  //encoder = new GIFEncoder();
  //encoder.setRepeat(0);
  //encoder.start();
  encoder = new Whammy.Video(frameRate);
  time = parseFloat($("#animationTime").val());
  //lerp(time, frameRate, frame1, frame2, function(){lerp(time, frameRate, frame2, frame3,null)});
  lerp(time, frameRate, frame1, frame2, true, null);
});

function lerp(time, frameRate, frame1, frame2, makeGif, callback){
  if(frame2.points == null){
    console.log("end");
    return;
  }
  var numFrames = time * frameRate; //300
  var frameDisplayTime = time / numFrames; // 0.1
  //if(makeGif){
    //encoder.setDelay(frameDisplayTime);
  //}
  var changeRate = {};
  changeRate.points = {};
  changeRate.points.num = Math.round((frame2.points.num - frame1.points.num)/numFrames);
  changeRate.points.radius = ((frame2.points.radius - frame1.points.radius)/numFrames);
  changeRate.points.shadowsSize = ((frame2.points.shadowsSize - frame1.points.shadowsSize)/numFrames);
  changeRate.points.colour = getColourChangeRate(frame1.points.colour,frame2.points.colour,numFrames);
  changeRate.points.shadowsColour = getColourChangeRate(frame1.points.shadowsColour,frame2.points.shadowsColour,numFrames);

  changeRate.lines = {};
  changeRate.lines.thickness = ((frame2.lines.thickness - frame1.lines.thickness)/numFrames);
  changeRate.lines.shadowsSize = ((frame2.lines.shadowsSize - frame1.points.shadowsSize)/numFrames);
  changeRate.lines.colour = getColourChangeRate(frame1.lines.colour,frame2.lines.colour,numFrames);
  changeRate.lines.shadowsColour = getColourChangeRate(frame1.lines.shadowsColour,frame2.lines.shadowsColour,numFrames);

  changeRate.background={};
  changeRate.background.colour = getColourChangeRate(frame1.background.colour,frame2.background.colour,numFrames);

  changeRate.goldenVars = {};
  changeRate.goldenVars.gv1 = ((frame2.goldenVars.gv1 - frame1.goldenVars.gv1)/numFrames);
  changeRate.goldenVars.gv2 = ((frame2.goldenVars.gv2 - frame1.goldenVars.gv2)/numFrames);
  changeRate.goldenVars.gv3 = ((frame2.goldenVars.gv3 - frame1.goldenVars.gv3)/numFrames);
  changeRate.goldenVars.gv4 = ((frame2.goldenVars.gv4 - frame1.goldenVars.gv4)/numFrames);
  changeRate.goldenVars.gv5 = ((frame2.goldenVars.gv5 - frame1.goldenVars.gv5)/numFrames);

  function loop(){
    points.num += changeRate.points.num;
    points.radius += changeRate.points.radius;
    points.shadowsSize += changeRate.points.shadowsSize;
    points.colour = applyColourDifference(points.colour, changeRate.points.colour);
    points.shadowsColour = applyColourDifference(points.shadowsColour, changeRate.points.shadowsColour);

    lines.thickness += changeRate.lines.thickness;
    lines.shadowsSize += changeRate.lines.shadowsSize;
    lines.colour = applyColourDifference(lines.colour, changeRate.lines.colour);
    lines.shadowsColour = applyColourDifference(lines.shadowsColour, changeRate.lines.shadowsColour);

    background.colour = applyColourDifference(background.colour, changeRate.background.colour);

    goldenVars.gv1 += changeRate.goldenVars.gv1;
    goldenVars.gv2 += changeRate.goldenVars.gv2;
    goldenVars.gv3 += changeRate.goldenVars.gv3;
    goldenVars.gv4 += changeRate.goldenVars.gv4;
    goldenVars.gv5 += changeRate.goldenVars.gv5;

    draw(points,lines,background,goldenVars,canvas);
    if(makeGif){
      //encoder.addFrame(canvas.element)
      encoder.add(canvas.canvas.toDataURL("image/webp"));
    }
  }

  points = cloneObj(frame1.points);
  lines =  cloneObj(frame1.lines);
  goldenVars = cloneObj(frame1.goldenVars);
  background.colour = frame1.background.colour;

  //TODO loop needs to stop when current frame==frame2 not timer
  var timer=setInterval(loop,1000 * frameDisplayTime);
  setTimeout(function(){
    clearInterval(timer);
    if(callback != null){
      console.log("calling callback")
      callback();
    }else{
      if(makeGif){
        //encoder.finish();
        //binary_gif = encoder.stream().getData();
        //data_url = 'data:image/gif;base64,'+encode64(binary_gif);

        output = encoder.compile();
        data_url = (window.URL).createObjectURL(output);

        $("#gifUrl").val(data_url);
        $("#downloadGif").attr("href",data_url);
        $("#downloadGif").show();
      }
    }
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

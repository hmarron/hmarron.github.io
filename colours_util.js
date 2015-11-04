function getColourChangeRate(colourStr1, colourStr2, numFrames){
  colourAr1=getColourArray(colourStr1);
  colourAr2=getColourArray(colourStr2);
  changeRate=[];

  for(i=0;i<3;i++){
    changeRate[i]=Math.ceil((colourAr2[i]-colourAr1[i])/numFrames);
  }

  return changeRate;
}

function applyColourDifference(colour,diffArr){
  colourAr=getColourArray(colour);
  for(i=0;i<3;i++){
    colourAr[i] += diffArr[i];
  }
  return getColourString(colourAr);
}

function getColourArray(colour){
  if(colour.length == 4){
    colour = colour.substring(0,2) + colour.substring(1,2) + colour.substring(2,3) + colour.substring(2,3) + colour.substring(3,4) + colour.substring(3,4);
  }
  colourStrAr = [];
  colourAr=[];

  for(var i=1;i<7;i+=2){
    colourStrAr[((i-1)/2)] = colour.substring(i,i+2);
  }

  for(var i=0;i<3;i++){
    colourAr[i]=parseInt(colourStrAr[i],16);
  }
  return colourAr;
}

function getColourString(collourAr){
  str="#";
  for(var i=0;i<3;i++){
    str+=collourAr[i].toString(16);
  }
  return str;
}

function randomColour(){
  //16777215 == #FFFFFF
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

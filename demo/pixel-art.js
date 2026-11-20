"use strict";

// World art is drawn once on a 320 × 180 grid.
function pixelCanvas(width,height,paint) {
  const surface = document.createElement("canvas");
  surface.width = width;
  surface.height = height;
  const pen = surface.getContext("2d");
  paint((color,x,y,w,h) => {
    pen.fillStyle = color;
    pen.fillRect(x,y,w,h);
  });
  return surface;
}

function tree(pixel,x,y) {
  pixel("#594837",x+5,y+6,3,14);
  pixel("#4e5039",x,y+3,13,10);
  pixel("#696747",x+2,y,9,12);
  pixel("#898059",x+3,y+2,6,4);
}

function house(pixel,x,y,width) {
  pixel("#8b7457",x+2,y+12,width-4,19);
  pixel("#b29469",x+4,y+12,width-8,16);
  pixel("#56453c",x+8,y+20,5,10);
  pixel("#dcc087",x+width-13,y+18,6,5);
  for (let row=0;row<6;row++) {
    pixel(row%2 ? "#945f4b" : "#a97156",x+10-row*2,y+row*2,width-20+row*4,2);
  }
  pixel("#553d36",x-2,y+12,width+4,2);
  pixel("#696052",x,y+31,width,3);
}

const villageMap = pixelCanvas(320,180,pixel => {
  pixel("#b3a582",0,0,320,180);
  for (let x=0;x<320;x+=2) {
    const t = x/320;
    const channel = Math.floor((49 + 67*t + 4*Math.sin(6*t))/2)*2;
    pixel("#83765d",x,channel-4,2,30);
    pixel("#577377",x,channel,2,23);
    pixel("#688184",x,channel+2,2,2);
    pixel("#476365",x,channel+21,2,2);
    const south = channel+27;
    for (let y=south;y<180;y+=2) {
      const path = x%80<5 || y%25<4;
      const rice = ["#ad9861","#c1ab71","#a38d59","#b9a370"];
      pixel(path ? "#8b7259" : rice[(x*7+y*3)%rice.length],x,y,2,2);
      if (!path && x%6===0 && y%8>=2 && y%8<=4) pixel("#80784f",x,y,1,2);
    }
  }
  for (let i=0;i<69;i++) {
    const x=(i*139)%318;
    const y=Math.floor((49+67*x/320+4*Math.sin(6*x/320))/2)*2+4+(i*7)%16;
    pixel(i%3 ? "#789092" : "#a0a89b",x,y,2+i%7,1);
  }
  pixel("#928266",0,32,320,4);
  house(pixel,31,13,32);
  house(pixel,112,25,38);
  [[12,24],[74,24],[91,32],[155,34],[179,40],[265,64],[286,72],[302,80]]
    .forEach(([x,y]) => tree(pixel,x,y));
  pixel("#665a4c",211,26,60,29);
  pixel("#9d785c",214,29,54,23);
  pixel("#85644e",218,32,46,16);
  pixel("#b18764",220,34,38,2);
  pixel("#564b40",230,51,5,6);
  pixel("#6e6657",221,12,41,12);
  pixel("#939084",219,9,45,8);
  pixel("#695e53",258,3,5,11);
});

const meetingMap = pixelCanvas(320,180,pixel => {
  pixel("#b7a681",0,0,320,180);
  for (let i=0;i<380;i++) pixel(i%2 ? "#a49574" : "#c3b38e",(i*83)%320,(i*113)%180,2,1);
  pixel("#927e66",147,60,158,101);
  pixel("#bda078",151,63,150,92);
  for (let y=66;y<155;y+=6) pixel("#ab8d66",151,y,150,1);
  house(pixel,167,31,112);
  [[135,65],[288,44],[124,125],[292,137],[38,62]].forEach(([x,y]) => tree(pixel,x,y));
  pixel("#6d503d",190,100,67,31);
  pixel("#a87d53",190,100,67,24);
  pixel("#c19a6b",192,102,63,2);
  pixel("#e5dbb9",218,107,12,8);
  pixel("#64564c",221,109,6,1);
});

const spritePoses = {
  idle: [[0,0,0,0],[0,0,0,-1]],
  walk: [[-3,3,0,0],[0,0,0,-1],[3,-3,0,0],[0,0,0,-1]],
  drill: [[-1,2,1,0],[-1,2,3,1],[-1,2,4,2],[-1,2,2,1]],
  probe: [[0,2,0,0],[0,2,2,0],[0,2,4,1],[0,2,4,1]],
  plant: [[0,2,1,0],[0,2,3,1],[0,2,5,2],[0,2,2,1]]
};

function makeSprites(secondary) {
  const coat = secondary ? "#a86f52" : "#58717a";
  const shadow = secondary ? "#7c5241" : "#3d515c";
  return Object.fromEntries(Object.entries(spritePoses).map(([action,poses]) => [
    action, poses.map(([left,right,reach,bob]) => pixelCanvas(26,26,pixel => {
      const ink = "#38322c";
      pixel(ink,10+left,20,4,4);
      pixel(ink,14+right,20,4,4);
      pixel("#594a3d",9,17+bob,9,4);
      pixel(ink,8,10+bob,12,9);
      pixel(coat,9,11+bob,10,7);
      pixel(shadow,9,11+bob,4,6);
      pixel("#ead2a0",13,12+bob,2,2);
      pixel("#bf8e66",11,6+bob,6,5);
      pixel(ink,16,8+bob,1,1);
      pixel("#795c44",6,6+bob,15,2);
      pixel("#e1bd79",8,4+bob,11,2);
      pixel("#c8a469",11,2+bob,6,2);
      if (action === "idle" || action === "walk") return;
      pixel("#ca9e73",18,12+bob+reach,3,2);
      if (action === "plant") {
        pixel("#686b45",22,9+reach,1,8);
        pixel("#939066",20,10+reach,2,3);
        pixel("#939066",23,8+reach,2,3);
      } else {
        pixel("#d1c9b6",22,10+reach,2,11);
        pixel(action === "drill" ? "#91735a" : "#50666b",21,10+reach,4,2);
      }
    }))
  ]));
}

const minhSprites = makeSprites(false);
const ngocSprites = makeSprites(true);

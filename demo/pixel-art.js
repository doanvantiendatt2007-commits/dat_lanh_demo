"use strict";

// Sprite frames are painted once and reused by the playback timeline.
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

const poses = {
  idle: [[0,0,0,0],[0,0,0,1],[0,0,0,0],[0,0,0,0]],
  walk: [[-3,3,0,0],[-1,1,0,-1],[3,-3,0,0],[1,-1,0,-1]],
  drill: [[-2,2,0,0],[-2,2,1,1],[-2,2,3,2],[-2,2,1,1]],
  probe: [[-2,2,0,0],[-2,2,2,1],[-2,2,3,2],[-2,2,2,1]],
  plant: [[-2,2,0,0],[-2,2,2,1],[-2,2,4,3],[-2,2,2,1]],
  crank: [[-2,2,0,0],[-2,2,2,-1],[-2,2,4,1],[-2,2,2,2]],
  shovel: [[-3,3,0,0],[-3,3,1,1],[-3,3,3,3],[-3,3,4,-1]],
  carry: [[-3,3,0,0],[-1,1,0,-1],[3,-3,0,0],[1,-1,0,-1]],
  talk: [[0,0,0,0],[0,0,2,0],[0,0,3,-1],[0,0,1,0]]
};

const clothes = {
  minh: ["#557986","#314c59","#9bb1a6","#dfaa75","#925d43"],
  ngoc: ["#a65e49","#73463c","#d68e63","#efb883","#ac6246"],
  sau: ["#74785b","#4c5440","#a0a481","#cb9964","#8d603e"],
  farmer: ["#6d6483","#49485e","#a69a9a","#c4946b","#996045"]
};

function makeSprites(character) {
  const [coat,shade,trim,skin,skinShade] = clothes[character];
  const ink = "#2c2630";
  return Object.fromEntries(Object.entries(poses).map(([action,frames]) => [
    action, frames.map(([left,right,reach,bob],index) => pixelCanvas(36,38,pixel => {
      const stride = action === "walk" || action === "carry";
      const lifted = stride && index % 2;
      pixel(ink,10+left,24,5,9-lifted);
      pixel(ink,16+right,24,5,9);
      pixel("#655b5b",11+left,25,2,5-lifted);
      pixel("#7c6a5b",17+right,25,2,5);
      pixel(ink,10+left,31-lifted,7,2);
      pixel(ink,16+right,31,7,2);
      pixel("#8a6a51",12+left,31-lifted,4,1);
      pixel("#a2825c",18+right,31,4,1);
      pixel("#3a3843",10,23,12,3);
      pixel("#514953",12,23,6,2);
      pixel(ink,8,14+bob,15,10);
      pixel(shade,9,15+bob,13,8);
      pixel(coat,12,15+bob,9,8);
      pixel(trim,13,16+bob,2,3);
      pixel("#dbbc82",16,17+bob,4,1);
      pixel("#333b3d",9,19+bob,2,3);
      pixel(trim,20,16+bob,1,3);
      pixel("#d6ac78",11,22+bob,10,1);
      pixel(ink,11,6+bob,10,9);
      pixel(skinShade,12,7+bob,8,8);
      pixel(skin,14,8+bob,6,6);
      pixel("#f5cc93",15,9+bob,3,1);
      pixel(skinShade,14,12+bob,2,1);
      pixel(skin,20,11+bob,1,2);
      pixel(ink,18,10+bob,2,index === 3 && action === "idle" ? 1 : 2);
      pixel(action === "talk" && index%2 ? "#57363a" : skinShade,18,13+bob,2,1);
      if (character === "ngoc") {
        pixel(ink,10,5+bob,9,5);
        pixel("#6e4843",11,5+bob,6,2);
        pixel(ink,9,10+bob,3,7);
        pixel("#d5a07a",12,13+bob,1,1);
      } else if (character === "minh") {
        pixel(ink,9,3+bob,12,5);
        pixel("#799090",10,3+bob,10,3);
        pixel("#aac0ad",12,3+bob,6,1);
        pixel("#435e60",10,6+bob,13,2);
        pixel(ink,20,8+bob,5,1);
      } else {
        pixel(ink,6,7+bob,20,2);
        pixel("#836349",7,6+bob,18,2);
        pixel("#e2bc7e",9,5+bob,13,2);
        pixel("#ba915d",11,3+bob,10,2);
        pixel("#f0cf8c",14,3+bob,5,1);
        pixel("#cc9860",8,7+bob,16,1);
      }

      if (action === "idle" || action === "walk") {
        const arm = action === "walk" ? Math.sign(right) : 0;
        pixel(coat,21,16+bob+arm,2,4);
        pixel(skin,21,20+bob+arm,2,2);
        return;
      }

      pixel(shade,20,17+bob,4+Math.min(reach,2),3);
      pixel(skin,23+Math.min(reach,3),17+bob+reach,3,2);
      if (action === "plant") {
        pixel("#535d34",26,15+reach,2,10);
        pixel("#8e9956",24,13+reach,2,5);
        pixel("#c6b86e",28,11+reach,2,6);
        pixel("#75533c",25,25+reach,4,2);
      } else if (action === "drill") {
        pixel(ink,26,15+reach,4,13);
        pixel("#b3b5af",27,15+reach,2,11);
        for (let y=17+reach;y<26+reach;y+=3) pixel("#68777a",27,y,2,1);
        pixel("#c79759",24,15+reach,7,2);
      } else if (action === "probe") {
        pixel(ink,26,16+reach,5,5);
        pixel("#82a8a2",27,17+reach,3,2);
        pixel("#d7b17f",28,21+reach,1,5);
      } else if (action === "carry") {
        pixel("#5e4739",20,13+bob,13,10);
        pixel("#b39260",21,12+bob,10,9);
        pixel("#d9ba83",22,13+bob,7,2);
        pixel("#7f654b",24,18+bob,7,2);
        pixel(skin,21,20+bob,3,2);
      } else if (action === "shovel") {
        for (let i=0;i<12;i++) pixel("#a98861",27+Math.floor(i/5),13+i+reach,2,1);
        pixel("#48434a",28,25+reach,6,5);
        pixel("#8f9994",29,26+reach,4,2);
      } else if (action === "crank") {
        pixel("#493e41",28,17+reach,4,4);
        pixel("#c2a36a",29,18+reach,2,2);
      }
    }))
  ]));
}

const characterSprites = Object.fromEntries(Object.keys(clothes).map(character => [character,makeSprites(character)]));

const boatSprites = Array.from({length:8},(_,frame) => pixelCanvas(56,28,pixel => {
  const bob = frame === 2 || frame === 3 ? 1 : 0;
  pixel("#322b33",2,19+bob,52,2);
  pixel("#3b2e36",6,21+bob,45,2);
  pixel("#58403b",10,23+bob,36,2);
  pixel("#8e563d",4,19+bob,47,2);
  pixel("#d29a57",6,18+bob,46,1);
  pixel("#bb7c48",10,21+bob,37,1);
  pixel("#623e39",12,22+bob,31,1);
  pixel("#483439",24,11+bob,6,8);
  pixel("#62747d",23,12+bob,6,6);
  pixel("#c68e61",24,8+bob,5,4);
  pixel("#41323a",19,8+bob,14,2);
  pixel("#dcb779",21,6+bob,10,2);
  pixel("#eace87",24,4+bob,5,2);
  const swing = [0,2,4,5,4,2,0,-2][frame];
  for (let i=0;i<15;i++) pixel("#ddad73",25+i,12+bob+Math.floor(i*(5+swing)/14),2,1);
  pixel("#be895e",39,17+bob+swing,4,2);
  pixel("#8eac99",46-frame,25,6,1);
  pixel("#b3b99b",4+frame,26,5,1);
}));

const grassSprites = Array.from({length:4},(_,frame) => pixelCanvas(12,13,pixel => {
  const sway = [0,1,2,1][frame];
  pixel("#665941",2,11,8,2);
  for (let y=2;y<12;y++) {
    pixel("#5b653c",5+Math.floor((10-y)*sway/10),y,2,1);
    pixel("#899456",4-Math.floor((11-y)/3),y,2,1);
    if (y>4) pixel("#c1b970",7+Math.floor((11-y)/2),y,1,1);
  }
}));

const cropSprites = Object.fromEntries(["seed","sprout","young","flower","ripe","stubble"].map((stage,age) => [
  stage, Array.from({length:4},(_,frame) => pixelCanvas(20,27,pixel => {
    if (stage === "seed") {
      pixel("#75553b",6,24,9,2);
      pixel("#dfbd73",7,22,2,2);
      pixel("#edce8c",12,23,2,1);
      return;
    }
    pixel("#706048",3,24,14,2);
    if (stage === "stubble") {
      pixel("#ae884d",6,19,2,6);
      pixel("#c7a367",10,20,2,5);
      pixel("#b59255",14,21,2,4);
      return;
    }
    const height = [0,7,14,20,22][age];
    const shade = stage === "ripe" ? "#897141" : "#505c39";
    const green = stage === "ripe" ? "#b59b55" : "#879750";
    const tip = stage === "ripe" ? "#dfb95d" : "#b3b575";
    const sway = [0,1,0,-1][frame];
    for (const [base,lean,offset] of [[6,-4,3],[10,1,0],[13,5,4]]) {
      const stemHeight = height-offset;
      for (let y=0;y<stemHeight;y++) {
        const x = base+Math.round((lean+sway)*y/stemHeight);
        pixel(shade,x,24-y,2,1);
        pixel(green,x,24-y,1,1);
        if (y === Math.floor(stemHeight*.57)) {
          pixel(green,x-2,23-y,3,1);
          pixel(tip,x-3,22-y,2,1);
        }
      }
      if (stage === "flower" || stage === "ripe") {
        pixel(tip,base+lean+sway-1,23-stemHeight,3,4);
        pixel(stage === "ripe" ? "#f3d27e" : "#c2c77f",base+lean+sway,23-stemHeight,2,2);
      }
    }
  }))
]));

const smokeSprites = Array.from({length:4},(_,frame) => pixelCanvas(18,13,pixel => {
  pixel("#a5a398",1+frame,6,14-frame,4);
  pixel("#ccc0a4",4,3,11,5);
  pixel("#ded0ad",6+frame,1,6,4);
  pixel("#b6aa99",6,9,9,2);
}));

const portraits = Object.fromEntries([
  ["Minh","#58717a","#493736","#d29b73"],
  ["Chị Ngọc","#a96554","#443334","#d7a17c"],
  ["Chú Sáu","#777d5b","#74605a","#ba8463"]
].map(([name,shirt,hair,skin]) => [
  name, pixelCanvas(24,24,pixel => {
    pixel("#c5aa88",0,0,24,24);
    pixel("#dec19a",1,1,22,1);
    pixel(hair,7,5,10,12);
    pixel(shirt,4,18,16,6);
    pixel(shirt,7,16,10,5);
    pixel(skin,10,14,4,4);
    pixel(skin,8,7,8,8);
    pixel(hair,8,6,8,2);
    pixel("#473433",9,10,1,1);
    pixel("#473433",14,10,1,1);
    pixel("#874e49",11,13,2,1);
    if (name === "Minh") {
      pixel("#394e50",7,3,11,6);
      pixel("#799090",8,3,8,3);
      pixel("#aac0ad",10,3,5,1);
      pixel("#435e60",11,7,9,2);
    } else if (name === "Chú Sáu") {
      pixel("#ac7750",4,7,16,2);
      pixel("#e4bc79",6,6,12,1);
      pixel("#d4a464",8,3,8,3);
    }
  }).toDataURL()
]));

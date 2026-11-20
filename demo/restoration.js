"use strict";

const waterTanks = [
  {x:205,name:"KẾT TỦA",color:"#a46c51"},
  {x:426,name:"LẮNG",color:"#9d895e"},
  {x:647,name:"LỌC",color:"#70938b"}
];
const waterOutlet = 8.9;
const waterRelease = 9.5;
const fieldVials = ["28,4 µg/L","2,0 µg/L"];

function treatmentPipe(from,to,y,connection,flow,t,color) {
  const end = between(from,to,connection);
  poly([[from,y],[end,y]],null,"#332d32",14);
  poly([[from,y-2],[end,y-2]],null,"#a3977f",6);
  if (!flow) return;
  const motion = reduced.matches ? 0 : t*40;
  for (let offset=9;offset<end-from-5;offset+=19) {
    const x = from+((offset+motion)%(end-from-4));
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x),y-3,6,4);
  }
}

function paintTreatmentTank(tank,index,water,settled,sludge,t,running) {
  const x = tank.x, y = 150, width = 148, height = 219;
  const bottom = y+height-23;
  roundRect(x-10,y+16,width+20,height+30,0,"#3a3030","#493a34");
  roundRect(x,y,width,height,2,"#252c34","#19242b");
  roundRect(x+7,y+17,width-14,height-27,0,"#554b4a","#baaa8c");
  if (water > 0) {
    const level = water*150;
    ctx.fillStyle = tank.color;
    ctx.fillRect(x+10,bottom-level,width-20,level);
    ctx.fillStyle = index === 0 ? "#e4ae76" : "#b9c5a3";
    ctx.fillRect(x+10,bottom-level,width-20,3);
    if (index < 2) {
      for (let i=0;i<23;i++) {
        const motion = reduced.matches ? 0 : t*(index === 0 ? 23 : 10);
        const row = (i*33+motion)%135;
        const offset = (i*37+motion*(index === 0 ? 1 : .15))%115;
        const depth = (index === 1 ? between(row,135,settled*.93) : row)/135;
        ctx.fillStyle = i%3 ? "#e1c293" : "#856449";
        ctx.fillRect(Math.floor(x+15+offset),Math.floor(bottom-level+5+depth*(level-5)),3+i%3,3);
      }
    }
  }
  if (index === 0) {
    ctx.fillStyle = "#c5b69b";
    ctx.fillRect(x+72,y+17,5,115);
    const rotation = running && !reduced.matches ? Math.sin(t*9) : .3;
    poly([[x+74-34*rotation,y+123],[x+74+34*rotation,y+128]],null,"#dad2b6",5);
    roundRect(x+52,y-15,45,24,2,"#5a776d","#19242b");
    ctx.fillStyle = "#b5b889";
    ctx.fillRect(x+58,y-10,30,3);
  } else if (index === 1 && sludge > 0) {
    poly([[x+10,bottom],[x+10,bottom-17*sludge],[x+42,bottom-26*sludge],[x+113,bottom-23*sludge],
      [x+width-10,bottom-16*sludge],[x+width-10,bottom]],"#6e483d");
  } else if (index === 2) {
    ["#b89363","#c9bea2","#787365"].forEach((color,layer) => {
      const level = y+102+layer*24;
      ctx.fillStyle = color;
      ctx.fillRect(x+10,level,width-20,23);
      for (let i=0;i<11;i++) {
        ctx.fillStyle = layer === 0 ? "#e6c48e" : "#514c45";
        ctx.fillRect(x+13+i*11,level+4+(i*7)%13,4+layer,2);
      }
    });
  }
  ctx.fillStyle = "#a39781";
  ctx.fillRect(x-3,y+1,width+6,8);
  ctx.fillStyle = "#777164";
  ctx.fillRect(x+4,y+height-21,width-8,12);
  tag(tank.name,x+width/2,y+height+23,"#f3dab3",18);
}

function serviceDrum(x,y,label,closed) {
  roundRect(x-20,y-42,40,42,2,"#804d40","#2d2730");
  ctx.fillStyle = "#a56a50";
  ctx.fillRect(x-16,y-38,9,34);
  ctx.fillStyle = "#e4ac70";
  ctx.fillRect(x-19,y-24,38,11);
  labelText(label,x,y-18,"#3d2e31",13,800);
  roundRect(x-22,y-47+Number(closed)*3,44,6,0,closed ? "#9d6e57" : "#6b4e43","#2d2730");
}

function treatmentStation(phase,t) {
  const view = camera(1.60,.81,.49);
  terrain("field",view);
  ctx.fillStyle = "#21272cc5";
  ctx.fillRect(0,0,W,H);
  // Raised work deck between the drainage ditch and the irrigation outlet.
  poly([[80,364],[886,364],[966,500],[31,500]],"#745b4e","#3d3431",5);
  for (let row=0;row<7;row++) {
    const y = 374+row*19;
    const inset = (y-364)*.35;
    poly([[83-inset,y],[886+inset,y]],null,row%2 ? "#ac8b69" : "#967657",3);
  }
  const building = phase === "water-build";
  const running = phase === "water-run";
  const checking = phase === "water-check";
  const installed = building ? Math.min(3,Math.floor(t/2.1)) : 3;
  const hookup = building ? clamp((t-6.3)/4.6) : 1;
  const levels = running ? [ease(t/2.7),ease((t-3.1)/3.7),ease((t-7.2)/3.8)] : [1,.85,.69];
  const delivery = building && installed < 3;
  const release = checking ? ease((t-waterRelease)/1.9) : 0;
  const pipeY = 232;
  treatmentPipe(26,205,pipeY,hookup,running,t,"#e2a26a");
  treatmentPipe(353,426,pipeY,clamp(hookup*2-.6),running && t>3.1,t,"#ddb08a");
  treatmentPipe(574,647,pipeY,clamp(hookup*2-.85),running && t>7.2,t,"#cccfab");
  treatmentPipe(795,947,pipeY,hookup,release>0,t,"#bce8d2");
  if (installed > 0) {
    const settling = running ? ease((t-4.6)/4) : 1;
    const sludge = running ? settling : checking ? 1-ease((t-.4)/3.4) : 0;
    waterTanks.slice(0,installed).forEach((tank,index) =>
      paintTreatmentTank(tank,index,building ? 0 : levels[index],settling,sludge,t,running && t<8.7)
    );
  }

  const valveX = 869;
  if (hookup > 0) {
    circle(valveX,pipeY-10,12,"#394440","#c8a481",3);
    const turn = release*Math.PI*2;
    poly([[valveX-10*Math.cos(turn),pipeY-10-10*Math.sin(turn)],
      [valveX+10*Math.cos(turn),pipeY-10+10*Math.sin(turn)]],null,release>0 ? "#a9c9a1" : "#d68f71",4);
  }
  if (release > 0) {
    const y = pipeY+ease((t-waterRelease)/1.4)*87;
    poly([[947,pipeY],[947,y],[971,y+8]],null,"#9cc8be",6);
    ellipse(964,y+12,13+release*7,5,"#bbd9cd70");
  }
  if (checking) {
    const wasteX = between(511,311,ease((t-2.6)/2));
    if (t < 2.6) poly([[500,337],[500,403]],null,"#b58257",5);
    serviceDrum(wasteX,445,"BÙN",t>=2.6);
    if (t>=4.6 && t<waterRelease) {
      const sampleHeight = ease((t-4.6)/1);
      roundRect(813,356-25*sampleHeight,17,27,1,"#a2cfc1","#426668");
      ctx.fillStyle = "#e4dfbe";
      ctx.fillRect(814,356-25*sampleHeight,15,4);
    }
  }
  const target = delivery ? waterTanks[installed].x+46 : checking ? (t < 4.6 ? 520 : 845)
    : building ? 642 : 269;
  const x = delivery ? between(104,target,ease((t%2.1)/1.7)) : target;
  if (delivery) {
    roundRect(x+18,432,88,47,0,"#657772","#342e32");
    roundRect(x+15,475,96,7,0,"#9b7a57","#342e32");
    circle(x+34,485,8,"#343038","#b9a383",2);
    circle(x+93,485,8,"#343038","#b9a383",2);
  }
  const pose = delivery ? "carry" : checking && t < 3.4 ? "carry"
    : checking && t >= waterRelease ? "crank" : checking ? "probe" : "crank";
  actor([x/W,.873],camera(),t,delivery,false,"minh",pose,1.24);
}

function approvedReturn(t) {
  const view = camera(1.13,.7,.63);
  terrain("field",view);
  const route = [[.919,.55],[.954,.61],[.929,.73],[.832,.76],[.719,.763],[.678,.794]];
  shoreline(view,route,"#333a37",10);
  shoreline(view,route,"#6e9f96",5);
  const progress = reduced.matches ? .7 : t*1.8;
  for (let i=0;i<12;i++) {
    const leg = (i*.41+progress)%(route.length-1);
    const [x,y] = project(along(route[Math.floor(leg)],route[Math.floor(leg)+1],leg%1),view);
    ctx.fillStyle = "#c5e3c7";
    ctx.fillRect(x,y,5,3);
  }
  shallowWater(plots[1],view,t,ease(t/2.3)*.60);
  const [gateX,gateY] = project(intake,view);
  roundRect(gateX-12,gateY-12,24,11,0,"#584743","#c69264");
  const [x,y] = project([.68,.8],view);
  ellipse(x,y,15+ease(t)*10,5,"#c2e8de80");
  tag("Nước đã kiểm tra",x-36,y-33,"#d5f0d9",16);
}

const riceIrrigation = 6.2;
const riceHarvest = 9.4;
const riceResults = 11.5;
const cropReadings = [["0,28","0,36"],["0,24","0,32"],["0,20","0,29"]];
const vetiverCells = Array.from({length:9},(_,i) => [
  .766+(i%3)*.056-Math.floor(i/3)*.006,.858+Math.floor(i/3)*.052+(i%3)*.003
]);

function quadrilateralGrid(shape,columns,rows) {
  const [upperLeft,upperRight,lowerRight,lowerLeft] = shape;
  return Array.from({length:columns*rows},(_,i) => {
    const row = .14+Math.floor(i/columns)*.72/(rows-1);
    const column = .1+(i%columns)*.8/(columns-1);
    return [0,1].map(axis => between(
      between(upperLeft[axis],lowerLeft[axis],row),
      between(upperRight[axis],lowerRight[axis],row),column
    ));
  });
}

function drawVetiver(view,count,growth,removed = 0) {
  for (let i=removed;i<count;i++) {
    const [x,y] = project(vetiverCells[i],view);
    const sprite = spriteFrame(grassSprites,position+i*.07,5);
    const size = between(13,24,growth)*view.zoom;
    const height = size*(1.1+growth*.14);
    ellipse(x,y,7*view.zoom,3,"#453f32a6");
    ctx.drawImage(sprite,Math.round(x-size/2),Math.round(y-height),Math.round(size),Math.round(height));
  }
}

const plantedVetiver = t => Math.min(vetiverCells.length,Math.max(0,Math.floor((t-2)/1.02)));
const dugVetiver = t => Math.min(vetiverCells.length,Math.floor(t/1.17));

function vetiverCutaway(view) {
  const [x,y] = project([.82,.81],view);
  roundRect(x-232,y-245,186,158,2,"#604837","#dcb98c");
  ctx.fillStyle = "#a79568";
  ctx.fillRect(x-228,y-241,178,46);
  ctx.drawImage(spriteFrame(grassSprites,position,5),x-170,y-239,53,47);
  for (let i=0;i<12;i++) {
    const tail = x-198+i*9;
    poly([[x-143,y-195],[x-146+i%3*4,y-165],[tail,y-109-i%4*8]],null,"#d3b88a",2);
    if (i%2) circle(tail,y-121-i%4*6,4,"#d98360","#f5c188");
  }
  tag("Cd ở rễ",x-141,y-100,"#ffe4bc",15);
}

function plantVetiver(t) {
  const view = camera(1.33,.80,.76);
  terrain("field",view);
  paintPlot(2,view,.21,"#76544b");
  const count = plantedVetiver(t);
  drawVetiver(view,count,ease((t-11.35)/2.5));
  const next = vetiverCells[Math.min(count,vetiverCells.length-1)];
  const previous = vetiverCells[Math.max(0,count-1)];
  const walking = t < 2 || (t-2)%1.02 < .44;
  const worker = t < 2 ? along([.72,.775],[.748,.788],t/2)
    : along(previous,next,((t-2)%1.02)/.44);
  if (t < 2) serviceDrum(646,419,"HOM",false);
  if (count < vetiverCells.length) {
    actor([worker[0]-.016,worker[1]],view,t,walking,true,"minh",walking ? "carry" : "plant");
    if (t > 2 && !walking) groundParticles(next,view,t,"#c09a6d",.42);
  }
  if (t >= 13.2) vetiverCutaway(view);
}

function collectVetiver(t) {
  const view = camera(1.28,.8,.74);
  terrain("field",view);
  paintPlot(2,view,.18,"#76544b");
  const dug = dugVetiver(t);
  drawVetiver(view,vetiverCells.length,1,dug);
  const last = vetiverCells.at(-1);
  const bin = [.709,.90];
  const [bx,by] = project(bin,view);
  serviceDrum(bx,by,"CỎ + RỄ",t>=14.2);
  const pile = [.734,.924];
  for (let i=0;i<dug && t<13.4;i++) {
    const [x,y] = project(pile,view);
    const lean = -7+i%4*5;
    ctx.drawImage(spriteFrame(grassSprites,t+i*.1,5),x+lean,y-17-Math.floor(i/4)*4,14,19);
    ctx.fillStyle = "#c7a478";
    ctx.fillRect(x+lean+3,y+i%3-2,8,3);
  }
  if (t < 10.55) {
    const point = vetiverCells[Math.min(dug,vetiverCells.length-1)];
    const worker = [point[0]-.023,point[1]-.008];
    const local = t%1.17;
    if (local>.35) groundParticles(point,view,t,"#c09a6d",.56);
    if (local>.72) {
      const [x,y] = project(along(point,pile,(local-.72)/.45),view);
      ctx.drawImage(spriteFrame(grassSprites,t,5),x-10,y-27,20,26);
      poly([[x-3,y-2],[x-7,y+3],[x,y+4],[x+6,y]],null,"#e0bb87",2);
    }
    actor(worker,view,t,t%1.17<.35,true,"minh","shovel");
  } else {
    const worker = t<12 ? along(last,pile,(t-10.55)/1.45) : along(pile,bin,(t-12)/1.5);
    actor([worker[0]+.022,worker[1]-.01],view,t,t<13.5,true,"minh",t>=12 && t<13.5 ? "carry" : "idle",1,-1);
    if (t < 14.2) for (let i=0;i<3;i++) {
      ctx.drawImage(spriteFrame(grassSprites,t+i*.1,5),bx-13+i*8,by-58-i%2*4,14,20);
    }
  }
}

function ricePhase(t) {
  if (t < 2.6) return "seed";
  if (t < 4.4) return "sprout";
  if (t < riceIrrigation) return "young";
  if (t < 7.8) return "flower";
  return "ripe";
}

function shallowWater(plot,view,t,level) {
  const points = plot.shape.map(point => project(point,view));
  ctx.save();
  poly(points,"#518b9000");
  ctx.clip();
  ctx.fillStyle = `rgba(114,176,178,${level*.34})`;
  ctx.fillRect(0,0,W,H);
  for (let i=0;i<13;i++) {
    const x = 380+i*28+((reduced.matches ? 0 : t*12)%22);
    ctx.fillStyle = "#c1e3d26a";
    ctx.fillRect(x,H*.75+(i*19)%101,19+(i%4)*4,2);
  }
  ctx.restore();
}

function riceSeason(t,season) {
  const view = camera(1.04,.5,.64);
  terrain("field",view);
  const stage = ricePhase(t);
  const beds = plots.slice(0,2);
  if (t>=riceIrrigation && t<8.35) {
    shallowWater(beds[1],view,t,ease((t-riceIrrigation)/.8));
  }
  const points = beds.flatMap((plot,index) => quadrilateralGrid(plot.shape,8,3-index));
  const growth = t < 2.6 ? clamp(t/2.6) : 1;
  const harvest = clamp((t-riceHarvest)/1.65);
  points.forEach((point,index) => {
    if (index >= Math.ceil(growth*points.length)) return;
    const planted = index < Math.floor(harvest*points.length) ? "stubble" : stage;
    const [x,y] = project(point,view);
    const lift = planted === "sprout" ? between(.62,1,ease((t-2.65-index%8*.045)/1.34)) : 1;
    const height = Math.round(34*lift);
    ctx.drawImage(spriteFrame(cropSprites[planted],position+index*.08,6),Math.round(x-13),Math.round(y-height+2),26,height);
  });
  drawVetiver(view,vetiverCells.length,1);
  if (t < 2.6 || (t >= riceHarvest && t < riceResults)) {
    const fraction = t<2.6 ? growth : harvest;
    const [x,y] = points[Math.min(points.length-1,Math.floor(fraction*points.length))];
    actor([x-.019,y-.01],view,t,t<2.6,true,"minh",t<2.6 ? "carry" : "shovel");
  }
  if (t >= riceIrrigation && t < 7.8) {
    actor([.67,.787],view,t,false,true,"minh","crank");
  }
  plots.forEach(plot => {
    const [x,y] = project([plot.label[0],plot.label[1]-.11],view);
    tag(plot.id === "C" ? "C · Vetiver" : `Ô ${plot.id}`,x,y,"#f2ddb9",15);
  });
  if (t >= riceResults) {
    const [x,y] = project([.45,.68],view);
    serviceDrum(x,y,"GẠO "+(season+1),true);
  }
}

function amendments(t) {
  const view = camera(1.25,.39,.7);
  terrain("field",view);
  if (t >= 11) {
    earthSection(t-10.3,true);
    return;
  }
  paintPlot(0,view,.16,"#937755");
  const supply = [.28,.69];
  const [sx,sy] = project(supply,view);
  if (t<4.5) serviceDrum(sx,sy,"VÔI",false);
  if (t<7.8) serviceDrum(sx+49,sy,"THAN",false);
  const target = t<4.5 ? [.19,.79] : [.25,.87];
  const phase = t<4.5 ? t : t-4.5;
  const mixing = t>=8.8;
  const worker = along(supply,target,phase/1.65);
  const spots = [[.12,.76],[.19,.8],[.28,.75],[.17,.89],[.23,.86],[.29,.9]];
  spots.forEach((point,i) => {
    if (t < 2.1+i%3*.55+(i>=3 ? 4.2 : 0)) return;
    const [x,y] = project(point,view);
    ctx.fillStyle = i<3 ? "#efdbb2" : "#3f3332";
    ctx.fillRect(x-5,y+4,12,4);
    if (mixing) groundParticles(point,view,t+i*.12,"#af8561",.24);
  });
  if (!mixing && phase>1.65) groundParticles(target,view,phase,t<4.5 ? "#eee1c1" : "#544746",.75);
  actor(worker,view,t,phase<1.65,true,"minh",phase<1.65 ? "carry" : "shovel",1,-1);
}

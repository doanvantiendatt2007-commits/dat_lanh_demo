"use strict";

const waterTanks = [
  {x:205,name:"KẾT TỦA",color:"#a16c50"},
  {x:426,name:"LẮNG",color:"#a3946c"},
  {x:647,name:"LỌC",color:"#589591"}
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
  const x = tank.x;
  const y = 183, bottom = 280, width = 143;
  if (!paintProp("tankAtlas",index,x-18,94,185,306)) {
    roundRect(x-11,159,167,228,2,"#546d65","#a89573");
    roundRect(x-1,y-8,width+9,bottom-y+15,0,"#362d30","#b9a383");
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(x,y,width,bottom-y);
  ctx.clip();
  if (water > 0 && index !== 2) {
    const level = water*(bottom-y-7);
    const top = bottom-level;
    ctx.fillStyle = tank.color;
    ctx.fillRect(x,top,width,level);
    ctx.fillStyle = index === 0 ? "#d4a77a" : "#d9cfa4";
    ctx.fillRect(x,top,width,2);
    ctx.fillStyle = "#806b5763";
    ctx.fillRect(x+4,top+6,6,level);
    const flock = index === 0 ? ease((t-2.75)/1.8) : 1;
    const motion = reduced.matches ? 0 : t*(index === 0 ? 19 : 8);
    for (let i=0;i<Math.round(26-flock*11);i++) {
      const row = (i*33+motion)%91;
      const offset = (i*41+motion*(index === 0 ? 1 : .12))%129;
      const depth = (index === 1 ? between(row,91,settled*.88) : row)/91;
      ctx.fillStyle = i%3 ? "#e0c195" : "#735640";
      const size = 2+Math.floor(flock*3)+i%2;
      ctx.fillRect(Math.floor(x+5+offset),Math.floor(top+4+depth*(level-4)),size,size-1);
    }
  }
  if (index === 0) {
    poly([[x+73,y],[x+73,y+57]],null,"#cfc5a7",4);
    const swing = running && !reduced.matches ? Math.sin(t*(t<2.75 ? 13 : 5)) : .32;
    poly([[x+74-27*swing,y+57],[x+74+27*swing,y+63]],null,"#e1d4ac",5);
    if (running && t<2.75) for (let i=0;i<6;i++) {
      ctx.fillStyle = "#f7dfb3";
      ctx.fillRect(x+99+i%2*4,y+3+(i*9+t*35)%45,3,3);
    }
  } else if (index === 1 && sludge>0) {
    poly([[x,bottom],[x,bottom-13*sludge],[x+34,bottom-19*sludge],[x+101,bottom-17*sludge],
      [x+width,bottom-12*sludge],[x+width,bottom]],"#634132");
    poly([[x+7,bottom-15],[x+71,bottom-1],[x+136,bottom-15]],null,"#b59376",2);
    poly([[x+108,y+32],[x+108,y+47],[x+141,y+47]],null,"#ead19b",2);
  } else if (index === 2) {
    if (water>0) {
      ctx.fillStyle = "#947854";
      ctx.fillRect(x,y+8,width,18);
      ctx.fillStyle = "#509c9b";
      ctx.fillRect(x,bottom-15,width,15);
    }
    ["#ad8b5d","#c2b598","#6e6d62"].forEach((color,layer) => {
      const level = y+25+layer*18;
      ctx.fillStyle = color;
      ctx.fillRect(x,level,width,18);
      for (let i=0;i<14;i++) {
        ctx.fillStyle = layer === 0 ? "#dbc28c" : "#514940";
        ctx.fillRect(x+2+i*10,level+2+(i*7)%14,3+layer,2);
      }
    });
    if (water>0) {
      for (let i=0;i<10;i++) {
        const drip = (i*11+(reduced.matches ? 0 : t*26))%68;
        ctx.fillStyle = drip<48 ? "#b8cfb0" : "#bdeddb";
        ctx.fillRect(x+10+i*13,y+18+drip,2,4);
      }
    }
  }
  ctx.restore();
  if (index === 0) {
    roundRect(x+115,165,33,18,0,"#324b44","#b7a380");
    labelText("pH",x+132,174,"#d4e4bc",13,800);
  }
  tag(tank.name,x+width/2,316,"#f3dab3",18);
}

function serviceDrum(x,y,label,closed) {
  if (label !== "BÙN" && label !== "CỎ + RỄ") {
    const cloth = label === "THAN" ? "#7b6d6d" : label === "VÔI" ? "#d3c5a7" : "#b89564";
    poly([[x-13,y-40],[x+10,y-40],[x+16,y-26],[x+20,y-8],[x+16,y],[x-17,y],[x-21,y-9],[x-16,y-27]],cloth,"#51403b",2);
    poly([[x-11,y-35],[x-14,y-13],[x-12,y-5]],null,"#ead3a5",3);
    poly([[x+9,y-29],[x+14,y-11],[x+13,y-4]],null,"#80664f",4);
    roundRect(x-12,y-42,23,5,0,closed ? "#855c45" : "#4e3c37");
    labelText(label,x,y-20,"#382d30",12,800);
    return;
  }
  if (paintProp("farmProps",7,x-17,y-52,35,52)) {
    if (!closed) roundRect(x-14,y-49,28,5,1,"#332a30","#bd8272");
    labelText(label,x,y-24,"#f3d8ab",12,800);
    return;
  }
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
  const pipeY = 210;
  treatmentPipe(26,205,pipeY,hookup,running,t,"#e2a26a");
  treatmentPipe(353,426,pipeY,clamp(hookup*2-.6),running && t>3.1,t,"#ddb08a");
  treatmentPipe(574,647,pipeY-17,clamp(hookup*2-.85),running && t>7.2,t,"#cccfab");
  const outletY = 361;
  treatmentPipe(795,947,outletY,hookup,release>0,t,"#bce8d2");
  if (installed > 0) {
    const settling = running ? ease((t-4.6)/4) : 1;
    const sludge = running ? settling : checking ? 1-ease((t-.4)/3.4) : 0;
    waterTanks.slice(0,installed).forEach((tank,index) =>
      paintTreatmentTank(tank,index,building ? 0 : levels[index],settling,sludge,t,running && t<8.7)
    );
  }

  if (installed === 3 && hookup > .76) {
    const drain = [[723,361],[723,390],[781,390],[781,outletY],[799,outletY]];
    poly(drain,null,"#332d32",14);
    poly(drain,null,"#a3977f",7);
    if (release > 0) {
      for (let i=0;i<5;i++) {
        const travel = (i*.74+(reduced.matches ? 0 : t*2))%4;
        const leg = Math.floor(travel);
        const [x,y] = along(drain[leg],drain[leg+1],travel%1);
        ctx.fillStyle = "#c5e5cd";
        ctx.fillRect(x-2,y-2,4,4);
      }
    }
  }

  const valveX = 869;
  if (hookup > 0) {
    circle(valveX,outletY-10,12,"#394440","#c8a481",3);
    const turn = release*Math.PI*2;
    poly([[valveX-10*Math.cos(turn),outletY-10-10*Math.sin(turn)],
      [valveX+10*Math.cos(turn),outletY-10+10*Math.sin(turn)]],null,release>0 ? "#a9c9a1" : "#d68f71",4);
  }
  if (release > 0) {
    const y = outletY+ease((t-waterRelease)/1.4)*58;
    poly([[947,outletY],[947,y],[971,y+8]],null,"#9cc8be",6);
    ellipse(964,y+12,13+release*7,5,"#bbd9cd70");
  }
  if (checking) {
    const wasteX = between(511,311,ease((t-2.6)/2));
    if (t < 2.6) poly([[500,376],[500,403]],null,"#b58257",5);
    serviceDrum(wasteX,445,"BÙN",t>=2.6);
    if (t>=4.6 && t<waterRelease) {
      const sampleHeight = ease((t-4.6)/1);
      roundRect(813,356-25*sampleHeight,17,27,1,"#a2cfc1","#426668");
      ctx.fillStyle = "#e4dfbe";
      ctx.fillRect(814,356-25*sampleHeight,15,4);
    }
    if (t >= 4.6) {
      for (const [i,color] of ["#a47656","#79c7c3"].entries()) {
        const x = 838+i*34;
        roundRect(x,401,22,31,2,"#475650","#d7c9a6");
        roundRect(x+3,412,16,17,0,color);
        ctx.fillStyle = "#d7ede0";
        ctx.fillRect(x+4,413,14,2);
      }
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
  const sampling = checking && t>=4.6 && t<5.85;
  const pose = delivery ? "carry" : checking && t < 3.4 ? "carry"
    : checking && t >= waterRelease ? "crank" : sampling ? "water" : checking ? "probe" : "crank";
  actor([x/W,.873],camera(),sampling ? t-4.6 : t,delivery,false,"minh",pose,1.24);
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
    const lane = Math.floor(i/columns);
    const row = .14+lane*.72/(rows-1);
    const index = lane%2 ? columns-1-i%columns : i%columns;
    const column = .1+index*.8/(columns-1);
    return [0,1].map(axis => between(
      between(upperLeft[axis],lowerLeft[axis],row),
      between(upperRight[axis],lowerRight[axis],row),column
    ));
  });
}

function drawVetiver(view,count,growth,removed = 0) {
  for (let i=removed;i<count;i++) {
    const [x,y] = project(vetiverCells[i],view);
    const height = between(18,34,growth)*view.zoom;
    const angle = reduced.matches ? 0 : Math.sin(position*3+i*.75)*.055;
    ellipse(x,y,7*view.zoom,3,"#453f32a6");
    drawVetiverClump(x,y,height,growth,angle);
  }
}

function drawVetiverClump(x,y,height,growth = 1,angle = 0) {
  if (!placeProp("plantAtlas",growth<.32 ? 4 : 5,x,y,height,angle)) {
    ctx.drawImage(spriteFrame(grassSprites,position,5),x-height*.38,y-height,height*.76,height);
  }
}

const plantedVetiver = t => Math.min(vetiverCells.length,Math.max(0,Math.floor((t-2)/1.02)));
const dugVetiver = t => Math.min(vetiverCells.length,Math.floor(t/1.17));

function vetiverCutaway(view) {
  const [x,y] = project([.82,.81],view);
  roundRect(x-232,y-245,186,158,2,"#604837","#dcb98c");
  ctx.fillStyle = "#a79568";
  ctx.fillRect(x-228,y-241,178,46);
  drawVetiverClump(x-144,y-197,49,1,reduced.matches ? 0 : Math.sin(position*4)*.04);
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
    actor([worker[0]-.016,worker[1]],view,t,walking,true,"minh",walking ? "carry" : "plant",1,
      walking && t>=2 ? toward(previous,next) : 1);
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
    drawVetiverClump(x+lean+6,y-2-Math.floor(i/4)*4,21,.5,lean*.009);
    ctx.fillStyle = "#c7a478";
    ctx.fillRect(x+lean+3,y+i%3-2,8,3);
  }
  if (t < 10.55) {
    const point = vetiverCells[Math.min(dug,vetiverCells.length-1)];
    const local = t%1.17;
    const previous = vetiverCells[Math.max(0,dug-1)];
    const walk = along(previous,point,local/.35);
    const worker = [walk[0]-.023,walk[1]-.008];
    if (local>.35) groundParticles(point,view,t,"#c09a6d",.56);
    if (local>.72) {
      const [x,y] = project(along(point,pile,(local-.72)/.45),view);
      drawVetiverClump(x,y,28,1,.13*(local-.71));
      poly([[x-3,y-2],[x-7,y+3],[x,y+4],[x+6,y]],null,"#e0bb87",2);
    }
    actor(worker,view,t,local<.35,true,"minh","shovel",1,local<.35 ? toward(previous,point) : 1);
  } else {
    const worker = t<12 ? along(last,pile,(t-10.55)/1.45) : along(pile,bin,(t-12)/1.5);
    actor([worker[0]+.022,worker[1]-.01],view,t,t<13.5,true,"minh",t>=12 && t<13.5 ? "carry" : "idle",1,-1);
    if (t < 14.2) for (let i=0;i<3;i++) {
      drawVetiverClump(bx-7+i*8,by-32-i%2*4,24,.6,(i-1)*.14);
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
    const sway = reduced.matches ? 0 : Math.sin(position*3.8+index*.48)*.063;
    const height = {
      seed:6, sprout:between(11,19,ease((t-2.65-index%8*.045)/1.34)),
      young:28, flower:33, ripe:36
    }[planted];
    const tile = {seed:0,sprout:1,young:2,flower:2,ripe:3}[planted];
    if (tile === undefined || !placeProp("plantAtlas",tile,x,y+1,height,sway)) {
      ctx.drawImage(spriteFrame(cropSprites[planted],position+index*.08,6),Math.round(x-13),Math.round(y-32),26,34);
    } else if (planted === "flower") {
      ctx.fillStyle = "#ebe3a7";
      ctx.fillRect(Math.round(x-6+sway*27),Math.round(y-24),3,2);
      ctx.fillRect(Math.round(x+4+sway*30),Math.round(y-29),3,2);
    }
  });
  drawVetiver(view,vetiverCells.length,1);
  if (t < 2.6 || (t >= riceHarvest && t < riceResults)) {
    const fraction = t<2.6 ? growth : harvest;
    const index = Math.min(points.length-1,Math.floor(fraction*points.length));
    const point = points[index];
    const previous = points[Math.max(0,index-1)];
    const [x,y] = along(previous,point,fraction>=1 ? 1 : (fraction*points.length)%1);
    actor([x-.019,y-.01],view,t,false,true,"minh",t<2.6 ? "spread" : "shovel",1,toward(previous,point));
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
  const worker = mixing ? along([.25,.87],[.17,.857],(t-8.8)/2.1) : along(supply,target,phase/1.65);
  const spots = [[.12,.76],[.19,.8],[.28,.75],[.17,.89],[.23,.86],[.29,.9]];
  spots.forEach((point,i) => {
    if (t < 2.1+i%3*.55+(i>=3 ? 4.2 : 0)) return;
    const [x,y] = project(point,view);
    ctx.fillStyle = i<3 ? "#efdbb2" : "#3f3332";
    ctx.fillRect(x-5,y+4,12,4);
    if (mixing) groundParticles(point,view,t+i*.12,"#af8561",.24);
  });
  const spreading = phase >= 1.65 && !mixing;
  if (spreading && Math.floor((phase-1.65)*6)%6 >= 2) {
    groundParticles([worker[0]-.029,worker[1]],view,phase,t<4.5 ? "#eee1c1" : "#544746",.75);
  }
  actor(worker,view,spreading ? phase-1.65 : t,phase<1.65,true,"minh",
    phase<1.65 ? "carry" : mixing ? "shovel" : "spread",1,-1);
}

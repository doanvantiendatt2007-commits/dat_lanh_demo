"use strict";

const byId = id => document.getElementById(id);
const icons = {
  sprout: '<path d="M12 22V12m0 5c-5 0-9-2-9-7 5 0 9 2 9 7Zm0-5c0-5 3-8 9-9 0 6-3 9-9 9ZM6 22h12"/>',
  boat: '<path d="M3 15h18l-3 5H6l-3-5Zm5 0V5l8 8H8"/>',
  survey: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
  drop: '<path d="M12 3c2 3 7 8 7 11a7 7 0 0 1-14 0c0-3 5-8 7-11Zm-3 12a3 3 0 0 0 3 3"/>',
  people: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-15a3 3 0 0 1 0 6m2 3a4 4 0 0 1 3 4v2"/>',
  meter: '<rect x="6" y="3" width="12" height="16" rx="2"/><path d="M9 6h6v5H9zm3 13v3m-2-7h4"/>',
  chat: '<path d="M4 4h16v11H9l-5 4V4Zm4 5h8M8 12h5"/>',
  play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5v14m8-14v14" stroke-width="3"/>',
  rotate: '<path d="M4 5v5h5m-5 0a8 8 0 1 1 1 7"/>',
  expand: '<path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"/>',
  shrink: '<path d="M4 8h4V4m12 4h-4V4M8 20v-4H4m12 4v-4h4"/>',
  sound: '<path d="M3 9v6h4l5 4V5L7 9H3Zm12 0a4 4 0 0 1 0 6m2-9a8 8 0 0 1 0 12"/>',
  mute: '<path d="M3 9v6h4l5 4V5L7 9H3Zm13 1 5 5m0-5-5 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  factory: '<path d="M3 21v-9l6 3V9l6 4V3h4l2 18H3Zm4-3h2m4 0h2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
document.querySelectorAll("[data-icon]").forEach(element => element.innerHTML = icon(element.dataset.icon));

const chapters = [
  ["Vào ấp","boat"],
  ["Khảo sát đất","survey"],
  ["Truy nguồn","drop"],
  ["Hồi sinh ruộng","sprout"],
  ["Họp ấp","people"]
];

const clips = [
  {id:"intro", chapter:0, seconds:8, site:"Ấp Hạ Nguồn", task:"Xuôi ghe về ấp", lines:[
    [0,"Chị Ngọc","“Ruộng vẫn xanh. Muốn biết vì sao gạo nhiễm Cd, mình phải lấy mẫu đất.”"],
    [4.8,"Chú Sáu","“Thương lái trả cả lô gạo. Hai đứa ra đồng với chú nghen.”"]
  ]},
  {id:"survey", chapter:1, seconds:7, site:"Ruộng lúa ven kênh", task:"Chọn điểm lấy mẫu", lines:[
    [0,"Chị Ngọc","“Minh, mình chọn sáu điểm từ xa kênh đến sát cống. Cùng một độ sâu thì dễ so sánh hơn.”"],
    [4.4,"Minh","“Bắt đầu ở C1, sát cống lấy nước.”"]
  ]},
  {id:"drill", chapter:1, seconds:11, site:"Ruộng lúa ven kênh", task:"Khoan và đọc mẫu C1", lines:[
    [0,"Minh","“Hạ mũi khoan xuống 20 cm. Giữ nguyên lõi để thấy các lớp đất.”"],
    [4.2,"Minh","“Rút lõi lên, rồi đưa mẫu vào máy phân tích.”"],
    [7.4,"Chị Ngọc","“Cd 4,83 mg/kg, pH 4,8. Đất chua có thể làm Cd dễ đi vào rễ lúa hơn.”"]
  ]},
  {id:"samples", chapter:1, seconds:9, site:"Ba ô ruộng Hạ Nguồn", task:"Vẽ bản đồ từ sáu mẫu", lines:[
    [0,"Minh","“Mỗi mẫu đo xong sẽ hiện lên ngay tại vị trí khoan.”"],
    [6.5,"Chị Ngọc","“Hai điểm gần cống đều có Cd cao. Mình thử đi ngược dòng kênh.”"]
  ]},
  {id:"stream", chapter:2, seconds:10, site:"Kênh tưới Hạ Nguồn", task:"So sánh ba trạm nước", lines:[
    [0,"Minh","“Đo từ thượng lưu trước. Sau đó lấy mẫu ngay nơi có dòng rỉ và ở đoạn hạ lưu.”"],
    [6.6,"Chị Ngọc","“Cd tăng vọt tại N2. Lần theo dòng rỉ để xem nó chảy từ đâu.”"]
  ]},
  {id:"source", chapter:2, seconds:8, site:"Bờ bao bên kênh", task:"Kiểm tra bãi bã thải", lines:[
    [0,"Minh","“Nước rỉ ra từ bờ bao bị nứt… Đây là bãi của công ty mình.”"],
    [4.7,"Chị Ngọc","“Minh, em định làm gì trước?”"]
  ]},
  {id:"block", chapter:2, seconds:8, site:"Cống lấy nước ruộng", task:"Chặn nguồn Cd mới", lines:[
    [0,"Minh","“Em đóng cống lấy nước trước. Bà con sẽ tạm dùng nguồn sạch.”"],
    [4,"Minh","“Dòng rỉ đã được dẫn vào mương lọc tạm. Giờ mới bắt đầu xử lý đất.”"]
  ]},
  {id:"roots", chapter:3, seconds:9, site:"Ô A · Nhiễm nhẹ", task:"Rải vôi và biochar", lines:[
    [0,"Minh","“Rải vôi và biochar từ trấu, rồi cày vùi vào lớp đất canh tác.”"],
    [4.5,"Chị Ngọc","“Nhìn xuống vùng rễ: pH tăng và một phần Cd bị giữ lại trong đất.”"]
  ]},
  {id:"flood", chapter:3, seconds:8, site:"Ô B · Nhiễm vừa", task:"Giữ ngập nông lúc lúa trổ", lines:[
    [0,"Minh","“Đến lúc lúa trổ bông. Mở cống cấp nước sạch và giữ mực nước nông.”"],
    [4.6,"Chị Ngọc","“Trong mô hình, nếu tháo cạn lúc này thì lúa dễ hút nhiều Cd hơn.”"]
  ]},
  {id:"plant", chapter:3, seconds:8, site:"Ô C · Nhiễm nặng", task:"Trồng ba hàng vetiver", lines:[
    [0,"Minh","“Ô C tạm ngưng gieo lúa. Em trồng vetiver dọc bờ để giữ đất.”"],
    [4.6,"Chị Ngọc","“Mình sẽ tiếp tục theo dõi ô này qua các vụ sau.”"]
  ]},
  {id:"season", chapter:3, seconds:12, site:"Ba ô ruộng Hạ Nguồn", task:"Tua nhanh ba vụ", lines:[
    [0,"Minh","“Ba vụ đi qua. Sau mỗi lần thu hoạch, mình kiểm tra Cd trong gạo.”"],
    [7.2,"Chị Ngọc","“Tới vụ ba, A và B xuống dưới mức tham chiếu cho gạo xát. C vẫn tạm nghỉ.”"]
  ]},
  {id:"village", chapter:4, seconds:9, site:"Nhà văn hóa ấp", task:"Báo cáo với bà con", lines:[
    [0,"Minh","“Công ty sẽ gia cố bãi thải và hỗ trợ bà con trong thời gian xử lý ruộng.”"],
    [4.8,"Chú Sáu","“Kết quả đất với gạo nhớ để bà con cùng xem, nghen.”"]
  ]},
  {id:"end", chapter:4, seconds:7, site:"Nhà văn hóa ấp", task:"Hoàn tất lượt mô phỏng", lines:[
    [0,"Minh","“Chặn từ nguồn, theo dõi đất và gạo từng vụ, rồi công khai kết quả.”"]
  ]}
];

let total = 0;
clips.forEach(clip => {
  clip.start = total;
  total += clip.seconds;
});
const chapterStarts = chapters.map((_, i) => clips.find(clip => clip.chapter === i).start);
const timeText = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2,"0")}`;
const clamp = (value,min = 0,max = 1) => Math.max(min,Math.min(max,value));
const between = (a,b,fraction) => a + (b - a) * fraction;
const ease = value => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const along = (a,b,t) => [between(a[0],b[0],ease(t)),between(a[1],b[1],ease(t))];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const W = 1000;
const H = 560;
const canvas = byId("world");
const ctx = canvas.getContext("2d");
const ui = {
  viewer:byId("viewer"), screen:byId("screen"), location:byId("location"), objective:byId("objective"),
  missionIcon:byId("mission-icon"), title:byId("title-card"), kicker:byId("title-kicker"),
  titleText:byId("scene-title"), titleNote:byId("title-note"), speaker:byId("speaker"),
  caption:byId("caption"), marker:byId("mini-marker"), equipment:byId("equipment"), fade:byId("fade"),
  mode:byId("mode-label"), seek:byId("seek"), elapsed:byId("elapsed"), play:byId("play"),
  sound:byId("sound"), fullscreen:byId("fullscreen")
};
const art = {};
for (const [name, url] of Object.entries(DEMO_IMAGES)) {
  const image = new Image();
  image.src = url;
  art[name] = image;
}
byId("mini-image").src = DEMO_IMAGES.field;

byId("chapters").innerHTML = chapters.map(([name,symbol],i) =>
  `<button class="chapter" type="button" data-chapter="${i}"><i>${icon(symbol)}</i><span><strong>${name}</strong><small>${timeText(chapterStarts[i])}</small></span></button>`
).join("");
const chapterButtons = [...document.querySelectorAll(".chapter")];
ui.seek.max = total;
byId("length").textContent = timeText(total);

const plots = [
  {id:"A", color:"#b9df75", shape:[[0,.78],[.22,.49],[.38,.57],[.22,.90],[0,.87]], label:[.166,.70]},
  {id:"B", color:"#efc674", shape:[[.23,.90],[.39,.58],[.56,.64],[.52,1],[.25,1]], label:[.43,.76]},
  {id:"C", color:"#f79579", shape:[[.56,.65],[.87,.74],[.93,1],[.53,1]], label:[.72,.82]}
];
const samples = [
  {id:"A1", p:[.25,.65], plot:0, cd:"1,26", ph:"6,0"},
  {id:"A2", p:[.15,.79], plot:0, cd:"1,04", ph:"6,1"},
  {id:"B1", p:[.45,.68], plot:1, cd:"2,45", ph:"5,4"},
  {id:"B2", p:[.39,.82], plot:1, cd:"2,09", ph:"5,6"},
  {id:"C1", p:[.64,.70], plot:2, cd:"4,83", ph:"4,8"},
  {id:"C2", p:[.76,.82], plot:2, cd:"4,41", ph:"5,0"}
];
const stations = [
  {id:"N1", p:[.21,.35], land:[.25,.44], cd:"1,6"},
  {id:"N2", p:[.64,.49], land:[.66,.43], cd:"28,4"},
  {id:"N3", p:[.82,.62], land:[.85,.69], cd:"13,8"}
];
const runoff = [[.728,.30],[.708,.36],[.678,.42],[.652,.48],[.69,.53],[.77,.59],[.88,.65]];
const source = [.725,.31];
const intake = [.73,.70];
const C1 = samples[4].p;

function roundRect(x,y,w,h,r,fill,stroke) {
  ctx.beginPath();
  ctx.roundRect(x,y,w,h,r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
}

function circle(x,y,r,fill,stroke,width = 1) {
  ctx.beginPath();
  ctx.arc(x,y,r,0,2 * Math.PI);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}

function ellipse(x,y,rx,ry,fill) {
  ctx.beginPath();
  ctx.ellipse(x,y,rx,ry,0,0,2 * Math.PI);
  ctx.fillStyle = fill;
  ctx.fill();
}

function poly(points,fill,stroke,width = 1) {
  ctx.beginPath();
  points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
  if (fill) { ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}

function labelText(value,x,y,color = "#fff",size = 15,weight = 700,align = "center") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px "Segoe UI",system-ui,sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(value,x,y);
}

function tag(text,x,y,color = "#ebf4d5",font = 15) {
  ctx.font = `700 ${font}px "Segoe UI",system-ui,sans-serif`;
  const width = ctx.measureText(text).width + 18;
  const left = clamp(x - width / 2,7,W - width - 7);
  roundRect(left,y - 13,width,26,5,"#11261fe8","#ddf6d370");
  labelText(text,left + width/2,y,color,font);
}

function camera(zoom = 1,cx = .5,cy = .5) {
  return {zoom,cx:clamp(cx,.5 / zoom,1 - .5 / zoom),cy:clamp(cy,.5 / zoom,1 - .5 / zoom)};
}
const project = ([x,y],view) => [W * (.5 + (x - view.cx) * view.zoom), H * (.5 + (y - view.cy) * view.zoom)];

function terrain(name,view,warm = 0) {
  const image = art[name]?.naturalWidth ? art[name] : art.field;
  ctx.fillStyle = "#263d2b";
  ctx.fillRect(0,0,W,H);
  if (image.naturalWidth) {
    const [x,y] = project([0,0],view);
    ctx.drawImage(image,x - .5,y - .5,W * view.zoom + 1,H * view.zoom + 1);
  }
  if (warm > 0) {
    ctx.fillStyle = `rgba(231,162,54,${warm})`;
    ctx.fillRect(0,0,W,H);
  }
}

function ping(point,view,label,color,time,active = false) {
  const [x,y] = project(point,view);
  if (active) {
    const phase = reduced.matches ? .3 : time % 1.6 / 1.6;
    ctx.globalAlpha = 1 - phase;
    circle(x,y,14 + phase * 16,null,color,2);
    ctx.globalAlpha = 1;
  }
  circle(x,y,14,"#18332be8","#f3fad99b",1.5);
  circle(x,y,9,color);
  if (label) tag(label,x,y - 27,color);
}

function paintPlot(index,view,alpha = .37,color = plots[index].color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  poly(plots[index].shape.map(point => project(point,view)),color,color,2);
  ctx.restore();
}

function actor(point,view,time,moving,named = true,secondary = false,action = "") {
  const [x,y] = project(point,view);
  const scale = clamp(view.zoom,.9,1.65) * (secondary ? .91 : 1);
  const stride = moving && !reduced.matches ? Math.sin(time * 13) : 0;
  ellipse(x + 7,y + 3,15 * scale,5 * scale,"#14251b7d");
  if (named) {
    ellipse(x,y + 1,17 * scale,7 * scale,"#ffffff26");
    ctx.beginPath();
    ctx.ellipse(x,y + 1,17 * scale,7 * scale,0,0,Math.PI*2);
    ctx.strokeStyle = "#e6f7b5ab";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale,scale);
  ctx.lineCap = "round";
  const bob = Math.abs(stride) * 2.1;
  ctx.translate(0,-bob);
  poly([[-4,-18],[-5 + stride*4,-8],[-6 + stride*5,-1]],null,"#202b2c",5);
  poly([[4,-18],[5 - stride*4,-7],[6 - stride*5,0]],null,"#303c36",5);
  poly([[-6 + stride*5,0],[-3 + stride*5,0]],null,"#1a251e",3);
  poly([[6 - stride*5,0],[9 - stride*5,0]],null,"#202922",3);
  const coat = secondary ? "#ba8f4f" : "#3d817c";
  const shade = secondary ? "#765e3e" : "#23565a";
  const reaching = action !== "";
  poly([[-7,-28],[-10,-19],[-11 + stride*3,-14]],null,shade,4);
  poly([[7,-28],[11,-20],[reaching ? 16 : 11 - stride*3,reaching ? -22 : -14]],null,coat,4);
  if (reaching) {
    const shift = reduced.matches ? 0 : Math.sin(time * 9) * 1.3;
    if (action === "probe") poly([[17,-24],[22,-14],[23,-3 + shift]],null,"#d0e4cd",2.5);
    if (action === "plant") poly([[17,-23],[22,-17],[20,-10]],null,"#a7d271",3);
    circle(16,-22,2.3,"#dbb67d");
  }
  roundRect(-8,-33,16,16,4,coat);
  roundRect(-7,-30,9,10,3,shade);
  roundRect(-7,-31,2,9,.6,secondary ? "#e2ba7f" : "#86a8a4");
  circle(1,-36,4.8,"#b78355");
  if (secondary) poly([[-13,-38],[-1,-47],[13,-38],[6,-34],[-8,-35]],"#d7be85","#826b41",.7);
  else {
    poly([[-8,-37],[-7,-44],[6,-45],[10,-38],[13,-37],[-9,-36]],"#e5d5a3","#97835a",.7);
    poly([[-5,-43],[4,-44],[10,-38],[-7,-38]],"#bfa879");
  }
  ctx.restore();
  if (named) tag("MINH",x,y - 50 * scale,"#e4f4b5",13);
}

function shoreline(view,points,color,weight = 4,dash = []) {
  ctx.save();
  ctx.setLineDash(dash);
  poly(points.map(point => project(point,view)),null,color,weight);
  ctx.restore();
}

const soilSpecks = Array.from({length:260},(_, i) => [
  ((i * 17797) % 491) / 491, ((i * 1351) % 379) / 379, (i % 5) + 1
]);

function earthSection(time,roots = false) {
  const x = 116,y = 112,w = 555,h = 322;
  ctx.save();
  roundRect(x,y,w,h,12,"#20362af5","#e5f2b8af");
  ctx.clip();
  const sky = ctx.createLinearGradient(0,y,0,y+138);
  sky.addColorStop(0,"#b9d8b7");
  sky.addColorStop(1,"#d7e5b3");
  ctx.fillStyle = sky;
  ctx.fillRect(x,y,w,83);
  const layers = [["#78934c",16],["#a58051",48],["#82603e",69],["#65472f",106]];
  let base = y + 82;
  for (const [color,height] of layers) {
    ctx.fillStyle = color;
    ctx.fillRect(x,base,w,height + 1);
    base += height;
  }
  for (const [rx,ry,size] of soilSpecks) {
    ellipse(x + rx*w,y + 100 + ry*(h-100),size,1 + (size % 3),size % 2 ? "#d6ab6c42" : "#38281e40");
  }
  for (let i = 0; i < 31; i++) {
    const gx = x + i * 18;
    poly([[gx,y+92],[gx-5,y+78 - (i%3)*4],[gx+3,y+89],[gx+8,y+73 - (i%4)]],null,"#4d732b",2);
  }
  roundRect(x+10,y+9,roots ? 174 : 158,28,5,"#1e3c2dde");
  labelText(roots ? "VÙNG RỄ LÚA" : "MẶT CẮT ĐẤT",x+21,y+23,"#edf8d9",15,800,"left");
  if (roots) drawRootZone(x,y,w,time);
  else drillSection(x,y,w,time);
  ctx.restore();
  roundRect(x,y,w,h,12,null,"#e5f2b8d9");
}

function drillSection(x,y,w,time) {
  const down = 119 * ease(time / 3.4);
  const up = 119 * ease((time-4.1) / 2.3);
  const center = x + w * .55;
  const top = y - 48 + down - up;
  const jitter = time < 3.6 && !reduced.matches ? Math.sin(time * 48) * 1.5 : 0;
  ctx.save();
  ctx.translate(jitter,0);
  roundRect(center - 30,top,60,10,4,"#283d38","#829997");
  roundRect(center - 5,top+9,10,30,2,"#a5b7a5");
  const steel = ctx.createLinearGradient(center-13,0,center+13,0);
  steel.addColorStop(0,"#3d5d55");
  steel.addColorStop(.45,"#aebeb0");
  steel.addColorStop(1,"#456158");
  roundRect(center - 12,top+35,24,84,7,steel,"#304a3e");
  for (let i = 0; i < 7; i++) {
    poly([[center - 12,top+48+i*9],[center+12,top+42+i*9]],null,"#3c594f",3);
  }
  poly([[center-9,top+117],[center,top+128],[center+9,top+117]],"#37564d");
  ctx.restore();
  for (let i = 0; i <= 3; i++) {
    const sy = y + 85 + i * 57;
    poly([[x+w-75,sy],[x+w-60,sy]],null,"#fff0cd",1);
    labelText(`${i*10} cm`,x+w-53,sy,"#ffefcb",13,700,"left");
  }
  if (time > 4.2) {
    const progress = ease((time-4.2)/1.9);
    const plugX = between(center,x+w*.27,progress);
    const plugY = between(y+219,y+143,progress);
    const core = ctx.createLinearGradient(0,plugY,0,plugY+111);
    core.addColorStop(0,"#a98755");
    core.addColorStop(.36,"#9b7444");
    core.addColorStop(.38,"#7a5939");
    core.addColorStop(.71,"#67452c");
    core.addColorStop(1,"#573d28");
    roundRect(plugX-16,plugY,32,111,9,core,"#e7c597");
    if (time > 6.1) tag("Lõi đất 0–20 cm",plugX,plugY-16,"#f6e8bb",14);
  }
}

function drawRootZone(x,y,w,time) {
  const middle = x + w/2;
  const stemY = y + 84;
  const rise = ease((time-3.5)/2.4);
  for (let i = 0; i < 11; i++) {
    const angle = (i-5)*.13;
    const rootX = middle + (i-5)*4;
    ctx.beginPath();
    ctx.moveTo(rootX,stemY);
    ctx.bezierCurveTo(rootX+angle*50,stemY+45,rootX+angle*140,stemY+105,rootX+angle*175,stemY+126+(i%4)*22);
    ctx.strokeStyle = i % 3 ? "#ddc193" : "#f2d7a3";
    ctx.lineWidth = i % 3 ? 2 : 3;
    ctx.stroke();
  }
  for (let i = 0; i < 8; i++) {
    const angle = (i-4)*.23;
    poly([[middle,stemY+2],[middle+angle*19,stemY-25],[middle+angle*49,stemY-41]],null,i % 2 ? "#699342" : "#486c2f",3);
  }
  for (let i = 0; i < 17; i++) {
    const [rx,ry] = soilSpecks[i+8];
    const locked = i < Math.floor(rise * 12);
    const float = reduced.matches || locked ? 0 : Math.sin(time*1.6+i)*10;
    const px = x+42+rx*(w-88)+float;
    const py = y+106+ry*196+float*.3;
    circle(px,py,i%4 === 0 ? 12 : 7,locked ? "#c9e9a7" : "#ffc489",locked ? "#8ba85f" : "#ffe3b2",1);
    if (i%4 === 0) labelText("Cd",px,py,"#43381f",11,800);
  }
  tag(rise > .75 ? "Một phần Cd được giữ lại" : "Cd linh động trong đất",x+w-124,y+25,rise > .75 ? "#d8f4a6" : "#f6d49b",13);
}

function walkSurvey(t) {
  const route = t < 3.6 ? along([.27,.52],[.53,.63],t/3.6) : along([.53,.63],C1,(t-3.6)/3);
  const view = camera(between(1.02,1.32,ease(t/7)),between(.49,.58,ease(t/7)),.61);
  terrain("field",view);
  shoreline(view,[[.29,.53],[.53,.63],C1],"#def3b5c9",2,[5,7]);
  for (const sample of samples) {
    const highlighted = sample.id === "C1" && t > 3.7;
    ping(sample.p,view,sample.id,highlighted ? "#e8faa9" : "#d5e9d3",t,highlighted);
  }
  actor([route[0]-.038,route[1]-.022],view,t,t<6.6,false,true);
  actor(route,view,t,t<6.6);
  return route;
}

const sampleOrder = [4,5,2,3,0,1];
function sampleFrame(t) {
  const step = Math.min(5,Math.floor(t/1.35));
  const local = (t-step*1.35)/1.35;
  const count = step + Number(step === 0 || local > .66);
  return {step,local,count};
}

function collectSamples(t) {
  const {step,local,count} = sampleFrame(t);
  const index = sampleOrder[step];
  const previous = samples[sampleOrder[Math.max(0,step-1)]];
  const current = samples[index];
  const route = along(previous.p,current.p,local/.62);
  const view = camera(1.04,.46,.58);
  terrain("field",view);
  const measured = sampleOrder.slice(0,count);
  for (let i = 0; i < plots.length; i++) {
    if (measured.some(index => samples[index].plot === i)) paintPlot(i,view,.30);
  }
  samples.forEach((sample,i) => ping(
    sample.p,view,measured.includes(i) ? `${sample.id} · ${sample.cd}` : sample.id,
    measured.includes(i) ? plots[sample.plot].color : "#dee9de",t,i === index
  ));
  actor([route[0]+.02,route[1]-.033],view,t,local < .62,true,false,"probe");
  return route;
}

function waterTrail(t) {
  const step = Math.min(2,Math.floor(t/2.9));
  const previous = stations[Math.max(0,step-1)];
  const current = stations[step];
  const local = (t-step*2.9)/2.9;
  const where = along(previous.land,current.land,local/.64);
  const view = camera(1.02,.50,.50);
  terrain("field",view);
  shoreline(view,[[.04,.30],[.28,.39],[.50,.45],[.64,.50],[.78,.59],[.96,.66]],"#c4efe0c5",3,[8,9]);
  if (t > 5.4) drawRunoff(view,t,0.76);
  stations.forEach((station,i) => {
    const measured = i < step || (i === step && local > .62);
    ping(station.p,view,measured ? `${station.id} · ${station.cd} µg/L` : station.id,
      measured && i === 1 ? "#ffc293" : "#b6f0f0",t,i === step);
  });
  if (local > .64) {
    const [sx,sy] = project(current.p,view);
    ellipse(sx,sy,20 + (t % 1)*10,7,"#bbe4d74c");
  }
  actor(where,view,t,local < .62,true,false,"probe");
  return where;
}

function drawRunoff(view,t,opacity) {
  ctx.globalAlpha = opacity;
  shoreline(view,runoff,"#983c1668",21);
  shoreline(view,runoff,"#f3a357b8",9);
  for (let i = 0; i < 8; i++) {
    const part = ((reduced.matches ? 0 : t)*1.4 + i*.79) % (runoff.length-1);
    const j = Math.floor(part);
    const pos = along(runoff[j],runoff[j+1],part-j);
    const [x,y] = project(pos,view);
    ellipse(x,y,5,2.6,"#ffcea088");
  }
  ctx.globalAlpha = 1;
}

function traceSource(t,blocking) {
  const target = blocking ? intake : source;
  const route = blocking ? along([.66,.68],target,t / 2.2) : along([.59,.40],[.715,.35],t/5.8);
  const where = blocking && t > 4.1 ? along(target,[.705,.345],(t-4.1)/2.0) : route;
  const view = camera(blocking ? 1.27 : between(1.22,1.91,ease(t/7.4)),.68,blocking ? .51 : .33);
  terrain("field",view);
  drawRunoff(view,t,blocking ? 1-ease((t-3.4)/4) : 1);
  if (!blocking) {
    ping(source,view,"Vết nứt bờ bao","#ffae7e",t,true);
    if (t > 3.1) {
      const [x,y] = project([.77,.23],view);
      tag("BÃI BÃ THẢI CỦA CÔNG TY",x,y-22,"#f3e0ad");
    }
  } else {
    const color = t < 3.2 ? "#f4ad80" : "#daee92";
    const [x,y] = project(intake,view);
    poly([[x-20,y-13],[x+20,y+3]],null,"#122b23",10);
    poly([[x-20,y-13],[x+20,y+3]],null,color,5);
    tag(t < 3.2 ? "Cống đang mở" : "Đã đóng cống",x,y-33,color);
    if (t > 4.6) {
      const [sx,sy] = project(source,view);
      const built = ease((t-4.6)/2);
      for (let i = 0; i < Math.ceil(built*7); i++) roundRect(sx-28+i*9,sy+i*1.1,11,7,3,"#e9dcaf","#5d694d");
      tag("Mương lọc tạm",sx,sy-22,"#e2f69e");
    }
  }
  actor(where,view,t,blocking ? t < 2.2 || (t > 4.1 && t < 6.1) : t < 5.8,true,false,"probe");
  return where;
}

function floodPlot(t) {
  const fill = ease((t-.6)/4.6);
  const where = along([.42,.60],[.45,.68],t/2.5);
  const view = camera(1.43,.47,.65);
  terrain("field",view);
  const body = plots[1].shape.map(p => project(p,view));
  ctx.save();
  poly(body,"#12363d33","#b3dfdf",2);
  ctx.clip();
  ctx.globalAlpha = .63 * fill;
  ctx.fillStyle = "#478994";
  ctx.fillRect(0,0,W,H);
  for (let i = 0; i < 12; i++) {
    const y = H * .49 + i*27 + (reduced.matches ? 0 : t*7 % 27);
    poly([[230,y],[590,y+10]],null,i%2 ? "#bee8df68" : "#2d676963",3);
  }
  ctx.restore();
  actor(where,view,t,t<2.5,true,false,"probe");
  const [lx,ly] = project([.43,.91],view);
  if (fill > .2) tag("NƯỚC SẠCH",lx,ly-41,"#e6fbf3");
  return where;
}

const vetiverPaths = [
  [[.565,.69],[.83,.755]],
  [[.56,.735],[.86,.805]],
  [[.56,.775],[.88,.85]]
];

function grassRows(view,count) {
  for (let row = 0; row < vetiverPaths.length; row++) {
    const active = clamp(count-row);
    const [start,end] = vetiverPaths[row];
    for (let i = 0; i < Math.ceil(20*active); i++) {
      const p = [between(start[0],end[0],i/19),between(start[1],end[1],i/19)];
      const [x,y] = project(p,view);
      ellipse(x,y,7,2.5,"#243c1e93");
      poly([[x-5,y-8],[x,y],[x,y-13],[x,y],[x+4,y-12],[x,y],[x+7,y-7]],null,i%2 ? "#a3d47b" : "#81ba58",2);
    }
  }
}

function plantPlot(t) {
  const count = clamp((t-.6)/2.03,0,3);
  const [start,end] = vetiverPaths[Math.min(2,Math.floor(count))];
  const where = along(start,end,count >= 3 ? 1 : count%1);
  const view = camera(1.44,.68,.66);
  terrain("field",view);
  paintPlot(2,view,.34,"#5d5035");
  grassRows(view,count);
  actor([where[0],where[1]-.02],view,t,count<3,true,false,"plant");
  return where;
}

function growingYears(t) {
  const stage = Math.min(2,Math.floor(t/3.65));
  const fraction = t % 3.65 / 3.65;
  const view = camera(between(1.08,1,ease(t/9)),.5,.53);
  terrain("field",view,reduced.matches ? .14 : .17*(.5-.5*Math.cos(fraction*6.28)));
  paintPlot(0,view,.33,stage === 0 ? "#edcc8a" : "#cce78f");
  paintPlot(1,view,.40,stage === 0 ? "#e0bc67" : "#a9d478");
  paintPlot(2,view,.30,"#5d5035");
  grassRows(view,3);
  const readings = [["0,28","0,36"],["0,24","0,32"],["0,20","0,29"]];
  plots.forEach((plot,index) => {
    const [x,y] = project([plot.label[0],plot.label[1]+.02],view);
    const cd = readings[stage][index];
    tag(index === 2 ? "Ô C · Tạm nghỉ" : `Ô ${plot.id} · ${cd} mg/kg`,x,y,index === 2 ? "#f0ddad" : "#e3f5b2",15);
  });
  return [.445,.61];
}

function mainView(clip,t) {
  const motion = reduced.matches ? 0 : t;
  switch (clip.id) {
    case "intro":
      terrain("intro",camera(1.03 + motion*.009,.52,.515));
      return [.22,.40];
    case "survey": return walkSurvey(t);
    case "drill": {
      const view = camera(1.37,.61,.62);
      terrain("field",view);
      actor([.77,.65],view,t,false,true,false,"probe");
      earthSection(t);
      return C1;
    }
    case "samples": return collectSamples(t);
    case "stream": return waterTrail(t);
    case "source": return traceSource(t,false);
    case "block": return traceSource(t,true);
    case "roots":
      terrain("field",camera(1.23,.43,.58));
      if (t < 2.7) {
        const activity = ease(t/2.7);
        const view = camera(1.23,.43,.58);
        paintPlot(0,view,.32*activity,"#dbdaa1");
        actor(along([.26,.63],[.19,.72],activity),view,t,true,true,false,"plant");
        drawAmendments(view,t);
      } else earthSection(t-1.7,true);
      return plots[0].label;
    case "flood": return floodPlot(t);
    case "plant": return plantPlot(t);
    case "season": return growingYears(t);
    case "village":
    case "end":
      terrain("meeting",camera(1.035 + motion*.005,.54,.50));
      return [.20,.34];
  }
}

function drawAmendments(view,t) {
  const [x,y] = project([.21,.72],view);
  for (let i = 0; i < 34; i++) {
    const [sx,sy] = soilSpecks[i];
    ellipse(x + (sx-.5)*137,y + (sy-.5)*95 - 24*(1-ease(t/2)),2.2,1.4,i%2 ? "#f7f6d4" : "#2b2a1d");
  }
  tag("Vôi + biochar",x,y+29,"#eff4cc");
}

function equipmentContent(clip,t) {
  const action = (symbol,title,description) => `<div class="action-box">${icon(symbol)}<div><strong>${title}</strong><small>${description}</small></div></div>`;
  const readings = (title,rows) => `<div class="equipment-head">${icon("meter")}${title}</div><div class="lcd">${rows.map(([label,value]) => `<span>${label}</span><strong>${value}</strong>`).join("")}</div>`;
  switch (clip.id) {
    case "drill":
      return t < 4.2 ? action("survey","Khoan lõi đất","Điểm C1 · 0–20 cm")
        : t < 7.4 ? action("meter","Chuẩn bị mẫu","Lõi đất C1")
        : readings("MÁY ĐO · MẪU C1",[["Cd đất","4,83 mg/kg"],["pH","4,8"]]);
    case "samples": return action("survey",`${sampleFrame(t).count}/6 mẫu đất`,"Tô màu điểm theo hàm lượng Cd");
    case "block": return t < 3.2 ? action("drop","Đang khóa cống","Cô lập ruộng khỏi kênh tưới") : action("check","Đã đóng cống", t < 6.8 ? "Đang dẫn dòng rỉ vào mương lọc" : "Đã chặn thêm Cd vào ruộng");
    case "roots": return t < 2.7 ? action("sprout","Rải và cày vùi","Vôi + biochar từ trấu") : readings("VÙNG RỄ · Ô A",[["Độ pH",t < 5.4 ? "6,0" : "7,1"]]);
    case "flood": return readings("CỐNG CẤP NƯỚC SẠCH",[["Mực nước",`${Math.round(5*ease((t-.6)/4.6))} cm`],["Giai đoạn","Lúa trổ"]]);
    case "plant": return action("sprout",`${Math.floor(clamp((t-.6)/2.03,0,3))}/3 hàng vetiver`,"Ô C tạm ngưng gieo lúa");
    case "season": return action("clock",`Vụ ${Math.min(3,Math.floor(t/3.65) + 1)} / 3`,"Mốc Cd trong gạo xát: 0,40 mg/kg");
    case "village":
      return t < 3 ? action("check","Gia cố bãi thải","Và giám sát dòng rỉ")
        : t < 6 ? action("check","Hỗ trợ bà con","Vật liệu và sinh kế")
        : action("check","Công khai kết quả","Theo dõi đất và gạo định kỳ");
    case "end": return action("rotate","Tự phát lại",playing ? `Sau ${Math.ceil(clip.seconds-t)} giây` : "Đang tạm dừng");
    default: return "";
  }
}

let position = 0;
let playing = true;
let currentClip;
let currentLine;
let lastEquipment = "";
let lastTimestamp = -1;
let lastFrame = 0;
let needsRedraw = true;
let dprX = 1;
let dprY = 1;

function updateClip(clip) {
  const intro = clip.id === "intro";
  const end = clip.id === "end";
  ui.screen.dataset.view = clip.id;
  ui.location.textContent = clip.site;
  ui.objective.textContent = clip.task;
  ui.missionIcon.innerHTML = icon(chapters[clip.chapter][1]);
  ui.title.hidden = !intro && !end;
  if (intro || end) {
    ui.kicker.textContent = intro ? "ĐỒNG BẰNG SÔNG CỬU LONG" : "KẾT THÚC LƯỢT CHƠI";
    ui.titleText.textContent = intro ? "Đất Lành" : "Đất không quên";
    ui.titleNote.textContent = intro
      ? "Một lô gạo bị trả về. Minh và chị Ngọc xuống ấp Hạ Nguồn tìm nguyên nhân."
      : "Từ một lõi đất, Minh tìm ra nguồn ô nhiễm và cùng bà con lập kế hoạch phục hồi ruộng.";
  }
  chapterButtons.forEach((button,index) => {
    if (index === clip.chapter) button.setAttribute("aria-current","step");
    else button.removeAttribute("aria-current");
  });
  if (currentClip && !document.hidden && playing) cue(clip.chapter);
  currentClip = clip;
}

function draw() {
  const clip = clips.find(item => position < item.start + item.seconds) || clips.at(-1);
  const t = position - clip.start;
  if (clip !== currentClip) updateClip(clip);
  const line = [...clip.lines].reverse().find(entry => t >= entry[0]) || clip.lines[0];
  if (line !== currentLine) {
    ui.speaker.textContent = line[1];
    ui.caption.textContent = line[2];
    currentLine = line;
  }
  ctx.setTransform(dprX,0,0,dprY,0,0);
  const [x,y] = mainView(clip,t);
  ui.marker.style.left = (x*100) + "%";
  ui.marker.style.top = (y*100) + "%";
  const equipment = equipmentContent(clip,t);
  if (lastEquipment !== equipment) {
    ui.equipment.innerHTML = equipment;
    ui.equipment.hidden = !equipment;
    lastEquipment = equipment;
  }
  const fadeIn = clip.id === "intro" && position < .48 ? 0 : 1-ease(t/.48);
  const fadeOut = ease((t-(clip.seconds-.32))/.32);
  ui.fade.style.opacity = reduced.matches || !playing ? "0" : String(Math.max(fadeIn,fadeOut)*.89);
  ui.seek.value = position;
  ui.seek.style.setProperty("--position",`${position / total * 100}%`);
  if (lastTimestamp !== Math.floor(position)) {
    lastTimestamp = Math.floor(position);
    ui.elapsed.textContent = timeText(position);
    ui.seek.setAttribute("aria-valuetext",`${timeText(position)} trên ${timeText(total)}`);
  }
}

function resize() {
  const viewport = ui.screen.getBoundingClientRect();
  const density = Math.min(window.devicePixelRatio || 1,1.75);
  canvas.width = Math.max(1,Math.round(viewport.width*density));
  canvas.height = Math.max(1,Math.round(viewport.height*density));
  dprX = canvas.width / W;
  dprY = canvas.height / H;
  needsRedraw = true;
}

function step(time) {
  const dt = lastFrame ? Math.min(.07,(time-lastFrame)/1000) : 0;
  lastFrame = time;
  if (playing && !document.hidden) {
    position = (position + dt) % total;
    needsRedraw = true;
  }
  if (needsRedraw) {
    draw();
    needsRedraw = false;
  }
  requestAnimationFrame(step);
}

function seek(to) {
  position = clamp(to,0,total-.01);
  needsRedraw = true;
}

function setPlayback(value) {
  playing = value;
  needsRedraw = true;
  ui.mode.textContent = value ? "Đang tự phát" : "Đã tạm dừng";
  ui.viewer.classList.toggle("paused",!value);
  setIconButton(ui.play,value ? "pause" : "play",value ? "Tạm dừng" : "Tiếp tục");
  setAmbient();
}

function setIconButton(button,symbol,label) {
  button.innerHTML = icon(symbol);
  button.setAttribute("aria-label",label);
  button.title = label;
}

byId("restart").addEventListener("click",() => { seek(0); setPlayback(true); });
ui.seek.addEventListener("input",() => seek(Number(ui.seek.value)));
ui.play.addEventListener("click",() => setPlayback(!playing));
chapterButtons.forEach((button,index) => button.addEventListener("click",() => seek(chapterStarts[index])));
window.addEventListener("keydown",event => {
  if (event.key === "Escape" && ui.viewer.classList.contains("theater")) {
    if (!document.fullscreenElement) setTheater(false);
    return;
  }
  if (event.target.closest("button,input") || event.altKey || event.ctrlKey || event.metaKey) return;
  if (![" ","ArrowLeft","ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === " ") setPlayback(!playing);
  else seek(position + (event.key === "ArrowLeft" ? -5 : 5));
});
const observer = new ResizeObserver(resize);
observer.observe(ui.screen);
for (const image of Object.values(art)) image.addEventListener("load",() => { needsRedraw = true; });

function setTheater(expanded) {
  ui.viewer.classList.toggle("theater",expanded);
  setIconButton(ui.fullscreen,expanded ? "shrink" : "expand",expanded ? "Thoát toàn màn hình" : "Toàn màn hình");
  resize();
}

ui.fullscreen.addEventListener("click",async () => {
  const expanded = ui.viewer.classList.contains("theater");
  setTheater(!expanded);
  try {
    if (!expanded) await ui.viewer.requestFullscreen();
    else if (document.fullscreenElement) await document.exitFullscreen();
  } catch {
    // The viewer still fills the browser tab when native fullscreen is blocked.
  }
});
document.addEventListener("fullscreenchange",() => {
  setTheater(Boolean(document.fullscreenElement));
});

let audio;
let ambience;
let audioEnabled = false;

function setAmbient() {
  if (!audio || !ambience) return;
  ambience.gain.setTargetAtTime(audioEnabled && playing && !document.hidden ? .16 : 0,audio.currentTime,.12);
}

function cue(chapter) {
  if (!audioEnabled || !audio) return;
  [1,1.25,1.5].forEach((ratio,i) => {
    const time = audio.currentTime + i*.08;
    const oscillator = audio.createOscillator();
    const volume = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = [293,349,330,392,440][chapter] * ratio;
    volume.gain.setValueAtTime(.0001,time);
    volume.gain.linearRampToValueAtTime(.027,time+.045);
    volume.gain.exponentialRampToValueAtTime(.0001,time+.66);
    oscillator.connect(volume).connect(audio.destination);
    oscillator.start(time);
    oscillator.stop(time+.7);
  });
}

ui.sound.addEventListener("click",async () => {
  try {
    if (!audio) {
      audio = new AudioContext();
      const noise = audio.createBuffer(1,audio.sampleRate*4,audio.sampleRate);
      const samples = noise.getChannelData(0);
      let past = 0;
      for (let i = 0; i < samples.length; i++) {
        past = (past + .04*(Math.random()*2-1))/1.027;
        samples[i] = 2*past;
      }
      const source = audio.createBufferSource();
      source.buffer = noise;
      source.loop = true;
      const filter = audio.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 940;
      filter.Q.value = .65;
      ambience = audio.createGain();
      ambience.gain.value = 0;
      source.connect(filter).connect(ambience).connect(audio.destination);
      source.start();
    }
    await audio.resume();
    audioEnabled = !audioEnabled;
    setIconButton(ui.sound,audioEnabled ? "sound" : "mute",audioEnabled ? "Tắt âm thanh" : "Bật âm thanh");
    ui.sound.setAttribute("aria-pressed",String(audioEnabled));
    setAmbient();
    if (audioEnabled && playing) cue(currentClip?.chapter ?? 0);
  } catch {
    setIconButton(ui.sound,"mute","Âm thanh không khả dụng");
  }
});
document.addEventListener("visibilitychange",setAmbient);
resize();
requestAnimationFrame(step);

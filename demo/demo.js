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
    [0,"Chị Ngọc","“Đoạn kênh gần bãi thải đục màu bùn. Mình sẽ đo nước và lấy mẫu đất để tìm Cd.”"],
    [4.8,"Chú Sáu","“Thương lái trả cả lô gạo vụ trước. Hai đứa ra đồng với chú nghen.”"]
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
  {id:"samples", chapter:1, seconds:18, site:"Ba ô ruộng Hạ Nguồn", task:"Vẽ bản đồ từ sáu mẫu", lines:[
    [0,"Minh","“Mỗi mẫu đo xong sẽ hiện lên ngay tại vị trí khoan.”"],
    [9,"Minh","“Dùng cùng độ sâu 20 cm để so sánh các ô.”"],
    [15.5,"Chị Ngọc","“Hai điểm gần cống đều có Cd cao. Mình thử đi ngược dòng kênh.”"]
  ]},
  {id:"stream", chapter:2, seconds:15, site:"Kênh tưới Hạ Nguồn", task:"So sánh ba trạm nước", lines:[
    [0,"Minh","“Đo từ thượng lưu trước. Sau đó lấy mẫu ngay nơi có dòng rỉ và ở đoạn hạ lưu.”"],
    [9,"Chị Ngọc","“Cd tăng vọt tại N2. Lần theo dòng rỉ để xem nó chảy từ đâu.”"]
  ]},
  {id:"source", chapter:2, seconds:9, site:"Bờ bao bên kênh", task:"Kiểm tra chỗ bờ vỡ", lines:[
    [0,"Minh","“Vết nứt lan ra ngay bên cửa xả của bãi thải.”"],
    [3,"Minh","“Bờ vỡ rồi. Nước đục đang tràn thẳng vào kênh tưới.”"],
    [6.2,"Chị Ngọc","“Đóng cống lấy nước vào ruộng trước, rồi xử lý chỗ vỡ.”"]
  ]},
  {id:"block", chapter:2, seconds:7, site:"Cống lấy nước ruộng", task:"Đóng cống lấy nước", lines:[
    [0,"Minh","“Em đóng cống lấy nước trước. Bà con sẽ tạm dùng nguồn sạch.”"],
    [4.4,"Chị Ngọc","“Cửa cống đã hạ kín. Nước kênh dừng ở ngoài bờ ruộng.”"]
  ]},
  {id:"repair", chapter:2, seconds:11, site:"Bờ bao bãi thải", task:"Đắp lại chỗ bờ vỡ", lines:[
    [0,"Minh","“Đưa bao đất xuống chỗ hở để chặn dòng tràn.”"],
    [4,"Minh","“Xếp kín chân bờ rồi đắp đất lên. Em sẽ nện chặt lớp đắp.”"],
    [8.4,"Chị Ngọc","“Dòng tràn đã dừng. Mình còn phải thu gom phần nước đang rỉ.”"]
  ]},
  {id:"divert", chapter:2, seconds:8, site:"Mé bờ bao", task:"Đào rãnh dẫn nước rỉ", lines:[
    [0,"Minh","“Em đào rãnh đưa nước rỉ về khu xử lý bên bờ.”"],
    [4.5,"Chị Ngọc","“Rãnh giữ nước rỉ tách khỏi kênh tưới. Mình lắp hệ thống xử lý ở đầu rãnh.”"]
  ]},
  {id:"water-build", chapter:2, seconds:12, site:"Trạm xử lý nước", task:"Lắp ba bể và nối ống", lines:[
    [0,"Chị Ngọc","“Đưa ba bể về trạm. Theo chiều dòng nước là bể kết tủa, bể lắng rồi bể lọc.”"],
    [6,"Minh","“Em nối đường ống giữa các bể và nối đầu ra tới van đang khóa.”"]
  ]},
  {id:"water-run", chapter:2, seconds:14, site:"Trạm xử lý nước", task:"Kết tủa, lắng và lọc", lines:[
    [0,"Chị Ngọc","“Châm chất xử lý và theo dõi pH. Cd hòa tan tạo thành hạt rắn khi điều kiện phù hợp.”"],
    [2.75,"Chị Ngọc","“Khuấy chậm để các hạt tụ thành bông lớn hơn.”"],
    [4.8,"Chị Ngọc","“Cho bông cặn chìm xuống đáy bể lắng. Nước phía trên tràn sang bể lọc.”"],
    [9,"Chị Ngọc","“Nước đi qua lớp lọc và trong dần. Vẫn phải đo Cd và kiểm tra pH đầu ra.”"]
  ]},
  {id:"water-check", chapter:2, seconds:14, site:"Điểm kiểm tra đầu ra", task:"Gom bùn và đo nước sau lọc", lines:[
    [0,"Minh","“Em tháo bùn chứa Cd vào thùng kín để chuyển đi xử lý.”"],
    [4.6,"Chị Ngọc","“Lấy mẫu đầu ra, kiểm tra Cd và pH. Màu nước nhìn trong hơn chưa đủ để mở van.”"],
    [9.2,"Chị Ngọc","“Mẫu đạt tiêu chí của mô phỏng. Minh mở đường nước đã xử lý về ruộng.”"]
  ]},
  {id:"roots", chapter:3, seconds:17, site:"Ô A · Nhiễm nhẹ", task:"Rải vôi, rải biochar và trộn đất", lines:[
    [0,"Minh","“Em lấy bao vôi và rải lên ô A.”"],
    [4.2,"Minh","“Tiếp theo là biochar từ trấu. Em rải đều rồi dùng cuốc trộn cả hai vào đất.”"],
    [11,"Chị Ngọc","“Nhìn sát vùng rễ lúa. Các chấm cam đang bám ngay lên vách rễ.”"],
    [14,"Chị Ngọc","“Vôi giúp tăng pH, còn biochar giữ thêm Cd trong đất. Lượng Cd có thể đi vào cây giảm.”"]
  ]},
  {id:"plant", chapter:3, seconds:17, site:"Ô C · Nhiễm nặng", task:"Trồng từng cụm vetiver ở ô C", lines:[
    [0,"Minh","“Em lấy túi hom giống. Ô C dành riêng cho vetiver, còn lúa sẽ gieo ở A và B.”"],
    [5.5,"Minh","“Đặt mỗi hom vào một hố riêng để theo dõi từng cụm.”"],
    [11.8,"Chị Ngọc","“Tua thời gian để thấy cỏ bén rễ và lớn dần. Một phần Cd tích lũy ở rễ.”"]
  ]},
  ...[1,2,3].map((season,index) => ({
    id:"season", season:index, chapter:3, seconds:14, site:"Ô A và B · Ô C trồng vetiver", task:`Gieo, chăm sóc và thu hoạch vụ ${season}`, lines:[
      [0,"Minh",`“Vụ ${season} bắt đầu. Em gieo lúa thành từng hàng trong ô A và B.”`],
      [4,"Chị Ngọc","“Mạ đã lên. Khi lúa ô B trổ, Minh giữ lớp nước nông từ nguồn đã kiểm tra.”"],
      [10.1,"Chị Ngọc",season === 3
        ? "“Thu hoạch vụ ba và kiểm tra Cd trong gạo xát. Ô C vẫn dành cho vetiver.”"
        : "“Đo Cd trong gạo sau thu hoạch rồi chuẩn bị đất cho vụ tiếp theo.”"]
    ]
  })),
  {id:"vetiver-collect", chapter:3, seconds:16, site:"Ô C · Khu thu gom", task:"Đào vetiver và thu gom sinh khối", lines:[
    [0,"Chị Ngọc","“Một phần Cd nằm trong sinh khối vetiver, nhất là ở rễ. Đào cả cụm để thu gom.”"],
    [5.1,"Minh","“Em cho cỏ và rễ vào thùng chuyên dụng để chuyển đi xử lý.”"],
    [11.8,"Chị Ngọc","“Một chu kỳ chỉ lấy đi được một phần Cd. Ô C vẫn cần được theo dõi.”"]
  ]},
  {id:"village", chapter:4, seconds:9, site:"Nhà văn hóa ấp", task:"Báo cáo với bà con", lines:[
    [0,"Minh","“Công ty sẽ gia cố bãi thải và hỗ trợ bà con trong thời gian xử lý ruộng.”"],
    [4.2,"Chú Sáu","“Kết quả đất với gạo nhớ để bà con cùng xem, nghen.”"],
    [6.9,"Chị Ngọc","“Em sẽ ghi và công khai các lần đo.”"]
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
const toward = (from,to) => to[0] < from[0] ? -1 : 1;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const W = 1000;
const H = 560;
const canvas = byId("world");
const ctx = canvas.getContext("2d");
const textures = Object.fromEntries(Object.entries(SCENE_IMAGES).map(([name,url]) => {
  const image = new Image();
  image.src = url;
  return [name,image];
}));
const ui = {
  viewer:byId("viewer"), screen:byId("screen"), location:byId("location"), objective:byId("objective"),
  missionIcon:byId("mission-icon"), speaker:byId("speaker"), portrait:byId("portrait"),
  caption:byId("caption"), equipment:byId("equipment"), fade:byId("fade"),
  mode:byId("mode-label"), seek:byId("seek"), elapsed:byId("elapsed"), play:byId("play"),
  sound:byId("sound"), fullscreen:byId("fullscreen")
};

byId("chapters").innerHTML = chapters.map(([name,symbol],i) =>
  `<button class="chapter" type="button" data-chapter="${i}"><i>${icon(symbol)}</i><span><strong>${name}</strong><small>${timeText(chapterStarts[i])}</small></span></button>`
).join("");
const chapterButtons = [...document.querySelectorAll(".chapter")];
ui.seek.max = total;
byId("length").textContent = timeText(total);

const plots = [
  {id:"A", color:"#cdc987", shape:[[.04,.69],[.42,.70],[.34,.98],[.04,.98]], label:[.21,.82]},
  {id:"B", color:"#efc674", shape:[[.46,.716],[.70,.748],[.75,.82],[.422,.82]], label:[.59,.78]},
  {id:"C", color:"#f79579", shape:[[.725,.856],[.924,.856],[.898,.978],[.725,.978]], label:[.82,.9]}
];
const samples = [
  {id:"A1", p:[.18,.77], plot:0, cd:"1,26", ph:"6,0"},
  {id:"A2", p:[.29,.91], plot:0, cd:"1,04", ph:"6,1"},
  {id:"B1", p:[.52,.76], plot:1, cd:"2,45", ph:"5,4"},
  {id:"B2", p:[.68,.798], plot:1, cd:"2,09", ph:"5,6"},
  {id:"C1", p:[.77,.88], plot:2, cd:"4,83", ph:"4,8"},
  {id:"C2", p:[.87,.94], plot:2, cd:"4,41", ph:"5,0"}
];
const stations = [
  {id:"N1", p:[.20,.50], land:[.21,.57], cd:"1,6"},
  {id:"N2", p:[.80,.62], land:[.81,.77], cd:"28,4"},
  {id:"N3", p:[.94,.70], land:[.94,.81], cd:"13,8"}
];
const source = [.83,.50];
const runoff = [source,[.819,.53],[.808,.55],[.80,.593],[.83,.62],[.90,.655],[.96,.67]];
const intake = [.80,.758];
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
  const size = Math.max(font,Math.min(27,10000/ui.screen.clientWidth));
  const height = size + 5;
  ctx.font = `700 ${size}px "Segoe UI",system-ui,sans-serif`;
  const width = ctx.measureText(text).width + 11;
  const left = clamp(x - width / 2,7,W - width - 7);
  ctx.fillStyle = "#24272be8";
  ctx.fillRect(left,y-height/2,width,height);
  labelText(text,left + width/2,y,color,size);
}

function camera(zoom = 1,cx = .5,cy = .5) {
  return {zoom,cx:clamp(cx,.5 / zoom,1 - .5 / zoom),cy:clamp(cy,.5 / zoom,1 - .5 / zoom)};
}
const project = ([x,y],view) => [W * (.5 + (x - view.cx) * view.zoom), H * (.5 + (y - view.cy) * view.zoom)];
const canalUpper = [[0,.394],[.10,.411],[.22,.438],[.35,.467],[.5,.503],[.65,.538],[.78,.577],[.9,.614],[1,.649]];
const canalLower = [[0,.512],[.10,.529],[.22,.565],[.35,.606],[.5,.648],[.65,.696],[.78,.732],[.9,.771],[1,.797]];
const clearCanalAt = clips.find(clip => clip.id === "water-check").start + 11.7;

function canalTurbidity(view) {
  const opacity = 1-ease((position-clearCanalAt)/2.25);
  if (opacity === 0) return;
  const edge = [...canalUpper,...[...canalLower].reverse()].map(point => project(point,view));
  const [start] = project([.28,.5],view);
  const [end] = project([.90,.5],view);
  ctx.save();
  poly(edge,"#88715900");
  ctx.clip();
  const color = ctx.createLinearGradient(start,0,end,0);
  color.addColorStop(0,"#98724d00");
  color.addColorStop(.46,"#96734992");
  color.addColorStop(1,"#996a40f5");
  ctx.globalCompositeOperation = "color";
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.fillRect(0,0,W,H);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = opacity*.28;
  ctx.fillRect(0,0,W,H);
  ctx.restore();
}

function terrain(name,view,warm = 0) {
  const image = textures[name === "meeting" ? "meeting" : "field"];
  const [x,y] = project([0,0],view);
  ctx.fillStyle = "#283936";
  ctx.fillRect(0,0,W,H);
  if (image.naturalWidth) {
    ctx.filter = "saturate(.88)";
    ctx.drawImage(image,Math.floor(x),Math.floor(y),Math.ceil(W*view.zoom)+1,Math.ceil(H*view.zoom)+1);
    ctx.filter = "none";
  }
  if (name !== "meeting") {
    canalTurbidity(view);
    const phase = reduced.matches ? 0 : Math.floor(position*7);
    for (let i=0;i<22;i++) {
      const column = ((i*43+phase)%510)/520;
      const [rx,ry] = project([column,.43+column*.29+(i%7-3)*.013],view);
      ctx.fillStyle = i%4 === 0 ? "#f5cf8857" : "#b8e3d765";
      ctx.fillRect(Math.floor(rx),Math.floor(ry),4+2*(i%4),2);
    }
    for (let i=0;i<5;i++) {
      const age = ((phase+i*9)%45)/45;
      const [sx,sy] = project([.885+age*.115,.095-age*.10],view);
      const size = 13+age*24;
      ctx.globalAlpha = (1-age)*.85;
      ctx.drawImage(smokeSprites[(phase+i)%4],Math.floor(sx-size/2),Math.floor(sy-size*.64),size,size*.72);
    }
    ctx.globalAlpha = 1;
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
    circle(x,y,10 + phase * 13,null,color,2);
    ctx.globalAlpha = 1;
  }
  poly([[x,y-10],[x+10,y],[x,y+10],[x-10,y]],"#262b31",color,2);
  if (active) poly([[x,y-4],[x+4,y],[x,y+4],[x-4,y]],color);
  if (label) tag(label,x,y - 22,color,15);
}

function paintPlot(index,view,alpha = .37,color = plots[index].color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  poly(plots[index].shape.map(point => project(point,view)),color,color,2);
  ctx.restore();
}

function spriteFrame(frames,time,rate) {
  return frames[reduced.matches ? 0 : Math.floor(Math.max(time,0)*rate)%frames.length];
}

function paintProp(atlas,frame,x,y,width,height) {
  if (atlas === "plantAtlas" && cleanPlantTiles[frame]) {
    ctx.drawImage(cleanPlantTiles[frame],Math.round(x),Math.round(y),Math.round(width),Math.round(height));
    return true;
  }
  const image = textures[atlas];
  if (!image.naturalWidth) return false;
  const [sx,sy,sw,sh] = propFrames[atlas][frame];
  ctx.drawImage(image,sx,sy,sw,sh,Math.round(x),Math.round(y),Math.round(width),Math.round(height));
  return true;
}

function placeProp(atlas,frame,x,y,height,angle = 0) {
  const [,,sw,sh] = propFrames[atlas][frame];
  const width = height*sw/sh;
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y));
  ctx.rotate(angle);
  const drawn = paintProp(atlas,frame,-width/2,-height,width,height);
  ctx.restore();
  return drawn;
}

function boat(point,view,time) {
  const [x,y] = project(point,view);
  const pose = spriteFrame([0,1,2,3,2,1],time,6);
  const size = Math.round(110*view.zoom);
  const height = size*.59;
  const bob = reduced.matches ? 0 : Math.round(Math.sin(time*4)*1.2);
  for (let i=0;i<5;i++) {
    const phase = reduced.matches ? .5 : (time*.9+i*.21)%1;
    ctx.fillStyle = i%2 ? "#bae1cc7a" : "#e2ddab91";
    ctx.fillRect(Math.round(x-size*(.22+phase*.49)),Math.round(y+3+(i%3)*3),4+i*2,2);
  }
  if (!paintProp("boatAtlas",pose,x-size/2,y-height*.87+bob,size,height)) {
    ctx.drawImage(spriteFrame(boatSprites,time,9),Math.round(x-size/2),Math.round(y-size*.43),size,size/2);
  }
}

function atlasTool(mode,size,beat,frame) {
  const handX = size*(frame === 6 ? .21 : frame === 7 ? .20 : .28);
  const handY = -size*(frame === 6 ? .15 : frame === 5 ? .36 : frame === 7 ? .60 : .64);
  if (mode === "carry") {
    roundRect(handX-size*.10,handY-size*.11,size*.20,size*.13,2,"#c19a65","#63493a");
    return;
  }
  if (mode === "shovel") {
    const reach = frame === 6 ? .35 : frame === 5 ? .23 : .07;
    const tilt = [-.32,-.17,.16,.31][beat%4];
    if (placeProp("farmProps",6,handX+size*reach,handY+size*.36,size*.65,reduced.matches ? 0 : tilt)) return;
  }
  if (mode === "drill" || mode === "shovel") {
    const tip = size*(mode === "shovel" ? .38 : .24);
    poly([[handX,handY-size*.13],[tip,handY+size*.26]],null,mode === "shovel" ? "#ca9d68" : "#b9c6bc",3);
    if (mode === "drill") {
      for (let i=0;i<3;i++) poly([[tip-3,handY+size*.10+i*4],[tip+3,handY+size*.07+i*4+beat%2]],null,"#544e50",2);
    } else roundRect(tip-5,handY+size*.24,10,7,0,"#818b89","#3c3839");
  } else if (mode === "probe") {
    roundRect(handX,handY-4,10,13,1,"#405959","#d3b28b");
    ctx.fillStyle = "#b4d6a6";
    ctx.fillRect(handX+2,handY-2,6,4);
  } else if (mode === "plant") {
    if (!placeProp("plantAtlas",4,handX+3,handY+7,18)) {
      ctx.drawImage(spriteFrame(grassSprites,beat/5,5),handX-4,handY-size*.21,13,18);
    }
  }
}

function drawCharacterSprite(character,mode,size,time) {
  const art = atlasCharacters[character];
  const action = (character === "minh" && actionAnimations[mode])
    || (mode === "talk" && meetingAnimations[character]);
  const clock = Math.max(0,time);
  if (action && textures[action.texture].naturalWidth) {
    const beat = reduced.matches ? 0 : Math.floor(clock*action.rate);
    const cell = action.poses[action.once ? Math.min(beat,action.poses.length-1) : beat%action.poses.length];
    const [sx,sy,sw,sh,pivot] = action.frames[cell];
    const width = Math.round(size*sw/action.reference);
    const height = Math.round(size*sh/action.reference);
    ctx.drawImage(textures[action.texture],sx,sy,sw,sh,Math.round(-width*pivot),-height,width,height);
    return;
  }
  if (mode === "lift") mode = "drill";
  if (mode === "water") mode = "probe";
  if (mode === "spread") mode = "carry";
  const image = textures[art.texture];
  const rate = mode === "idle" ? 3 : mode === "walk" ? 8 : 6;
  const beat = reduced.matches ? 0 : Math.floor(time*rate);
  if (!image.naturalWidth) {
    const frame = spriteFrame(characterSprites[character][mode],time,rate);
    ctx.drawImage(frame,Math.round(-size*.43),Math.round(-size*.93),size,size*frame.height/frame.width);
    return;
  }
  const sequence = art.sequences[mode] || art.sequences.idle;
  const index = sequence[beat%sequence.length];
  const [sx,sy,sw,sh,pivot] = art.frames[index];
  const height = Math.round(size*sh/art.reference) - Number(mode === "idle" && beat%4 === 1);
  const width = Math.round(size*sw/art.reference);
  ctx.drawImage(image,sx,sy,sw,sh,Math.round(-width*pivot),-height,width,height);
  if (character === "minh") atlasTool(mode,size,beat,index);
}

function actor(point,view,time,moving,named = true,character = "minh",action = "",sceneScale = 1,facing = 1) {
  const [x,y] = project(point,view);
  const mode = moving && action !== "plant" && action !== "carry" ? "walk" : action || "idle";
  const size = Math.round(70*clamp(view.zoom,.9,1.55)*sceneScale);
  ellipse(x,y,size*.29,size*.075,"#39312858");
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y));
  ctx.scale(facing,1);
  drawCharacterSprite(character,mode,size,time);
  ctx.restore();
  if (named) {
    const marker = y-size-7;
    poly([[x-6,marker-8],[x+6,marker-8],[x,marker]],"#f0c587","#4c3b33",2);
  }
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
  roundRect(x,y,w,h,0,"#584438");
  ctx.clip();
  ctx.fillStyle = "#aebbb1";
  ctx.fillRect(x,y,w,83);
  const layers = [["#83885b",16],["#ab8359",48],["#876249",69],["#65483b",106]];
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
  if (roots) drawRootZone(x,y,w,time);
  else drillSection(x,y,w,time);
  ctx.restore();
  roundRect(x,y,w,h,0,null,"#e9d6b0");
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
  const roots = Array.from({length:11},(_,i) => {
    const spread = (i-5)*.13;
    const at = middle+(i-5)*4;
    return [[at,stemY],[at+spread*50,stemY+45],[at+spread*140,stemY+105],[at+spread*175,stemY+126+(i%4)*22]];
  });
  roots.forEach(([start,bend1,bend2,end],i) => {
    ctx.beginPath();
    ctx.moveTo(...start);
    ctx.bezierCurveTo(...bend1,...bend2,...end);
    ctx.strokeStyle = i % 3 ? "#d5b98e" : "#f2d7a3";
    ctx.lineWidth = i % 3 ? 3 : 5;
    ctx.stroke();
  });
  for (let i = 0; i < 8; i++) {
    const angle = (i-4)*.23;
    poly([[middle,stemY+2],[middle+angle*19,stemY-25],[middle+angle*49,stemY-41]],null,i % 2 ? "#699342" : "#486c2f",3);
  }
  const chips = [[x+100,y+185],[x+142,y+255],[x+w-112,y+174],[x+w-92,y+258]];
  chips.forEach(([px,py],i) => {
    poly([[px-13,py-7],[px+4,py-13],[px+14,py-1],[px+7,py+9],[px-12,py+7]],"#3b3034","#b68b69",2);
    ctx.fillStyle = "#756069";
    ctx.fillRect(px-4,py-5,4,3);
    const lock = ease((time-2.1-i*.24)/1.12);
    const chip = along([px+(i%2 ? -36 : 30),py-26],[px+8,py-4],lock);
    circle(...chip,5,"#f5ce86","#6e4b40",1);
  });
  const bonds = [[0,.52],[1,.78],[2,.7],[4,.8],[5,.37],[6,.77],[7,.54],[8,.88],[10,.67]];
  bonds.forEach(([root,at],i) => {
    const [a,b,c,d] = roots[root];
    const u = 1-at;
    const target = a.map((_,axis) => a[axis]*u**3+3*b[axis]*u*u*at+3*c[axis]*u*at*at+d[axis]*at**3);
    const side = i<4 ? -1 : 1;
    const surface = [target[0]+side*3,target[1]];
    const stick = i<3 ? 1 : ease((time-.65-i*.09)/1.02);
    const point = along([surface[0]+side*(27+i%3*8),surface[1]-14],surface,stick);
    circle(...point,i%3 === 0 ? 6 : 4,"#f38b64","#743f38",1);
  });
  tag("Cd bám vách rễ",middle,y+19,"#ffd0ae",17);
  if (time>3.35) tag("Cd giữ trên biochar",x+w-111,y+294,"#ffe2a3",15);
}

function walkSurvey(t) {
  const route = t < 3.6 ? along([.29,.68],[.55,.69],t/3.6) : along([.55,.69],C1,(t-3.6)/3);
  const view = camera(between(1.01,1.25,ease(t/7)),between(.49,.60,ease(t/7)),.66);
  terrain("field",view);
  shoreline(view,[[.29,.68],[.55,.69],C1],"#efdbc5b8",3,[5,9]);
  for (const sample of samples) {
    const highlighted = sample.id === "C1" && t > 3.7;
    ping(sample.p,view,sample.id,highlighted ? "#e8faa9" : "#d5e9d3",t,highlighted);
  }
  actor([route[0]-.04,route[1]-.018],view,t+.16,t<6.6,false,"ngoc");
  actor(route,view,t,t<6.6);
  return route;
}

const sampleOrder = [4,5,2,3,0,1];
const sampleInterval = 3.15;
function sampleFrame(t) {
  const step = Math.min(sampleOrder.length-1,Math.floor(t/sampleInterval)+1);
  const local = t-(step-1)*sampleInterval;
  const phase = local < .95 ? "walk" : local < 1.83 ? "drill" : local < 2.45 ? "probe" : "idle";
  return {step,local,phase,count:step + Number(local >= 2.45)};
}

function collectSamples(t) {
  const {step,local,phase,count} = sampleFrame(t);
  const index = sampleOrder[step];
  const previous = samples[sampleOrder[Math.max(0,step-1)]];
  const current = samples[index];
  const route = along(previous.p,current.p,local/.95);
  const view = camera(t > 15.5 ? 1 : 1.1,.51,.64);
  terrain("field",view);
  const measured = sampleOrder.slice(0,count);
  for (let i = 0; i < plots.length; i++) {
    if (measured.some(index => samples[index].plot === i)) paintPlot(i,view,.30);
  }
  samples.forEach((sample,i) => ping(
    sample.p,view,sample.id,
    measured.includes(i) ? plots[sample.plot].color : "#dee9de",t,i === index
  ));
  const feet = [route[0]-.026,route[1]-.005];
  actor(feet,view,phase === "drill" ? local-.95 : t,phase === "walk",true,"minh",phase,1,
    phase === "walk" ? toward(previous.p,current.p) : 1);
  if (phase === "drill") groundParticles(current.p,view,local-.95,"#deb080",1);
  return route;
}

const waterInterval = 4.25;
function waterFrame(t) {
  const step = Math.min(2,Math.floor(t/waterInterval));
  return {step,local:t-step*waterInterval};
}

function waterTrail(t) {
  const {step,local} = waterFrame(t);
  const previous = stations[Math.max(0,step-1)];
  const current = stations[step];
  const where = along(previous.land,current.land,local/1.9);
  const view = camera(1.02,.50,.50);
  terrain("field",view);
  shoreline(view,[[.06,.45],[.28,.51],[.50,.57],[.64,.61],[.78,.66],[.96,.72]],"#d0eadcc5",3,[8,10]);
  shoreline(view,[[.78,.66],[.784,.72],intake,[.806,.798]],"#92c5bdc5",3,[5,7]);
  if (t > 5.4) drawRunoff(view,t,.62);
  stations.forEach((station,i) => {
    const measured = i < step || (i === step && local >= 3.15);
    ping(station.p,view,station.id,
      measured && i === 1 ? "#ffc293" : "#b6f0f0",t,i === step);
  });
  if (local >= 2.17 && local < 2.84) {
    const [sx,sy] = project([current.land[0]-.021,current.land[1]-.024],view);
    const ripple = reduced.matches ? .4 : (local-1.9)%1;
    ellipse(sx,sy+4,7+ripple*12,3+ripple*3,"#bce3da66");
  }
  const collecting = local >= 1.9 && local < 3.15;
  const worker = collecting ? [where[0],where[1]-.022] : where;
  actor(worker,view,collecting ? local-1.9 : t,local < 1.9,true,"minh",collecting ? "water" : "idle",1,
    collecting ? -1 : toward(previous.land,current.land));
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
    ctx.fillStyle = i%2 ? "#ffcf8bad" : "#e6a45fc9";
    ctx.fillRect(Math.round(x),Math.round(y),5+i%3*2,3);
  }
  ctx.globalAlpha = 1;
}

const breachAt = 2.8;
const sealAt = 8.2;
const gateAt = 4.35;

function groundParticles(point,view,time,color,strength) {
  const [x,y] = project(point,view);
  const motion = reduced.matches ? 0 : time;
  for (let i=0;i<16;i++) {
    const age = (motion*.9+i*.177)%1;
    ctx.globalAlpha = (1-age)*.9*strength;
    ctx.fillStyle = i%3 ? color : "#f1c994";
    ctx.fillRect(x+(i%7-3)*age*12,y-age*(24+i%4*7)+age*age*38,3+i%3,3);
  }
  ctx.globalAlpha = 1;
}

function drawBreach(view,opening) {
  const [x,y] = project(source,view);
  const gap = opening*25;
  poly([[x-31,y-16],[x-11,y-19],[x-6-gap,y-9],[x-11-gap,y+7],[x-30,y+3]],"#977456","#483431",3);
  poly([[x+4,y-18],[x+32,y-20],[x+43,y-7],[x+37,y+6],[x+11+gap,y+5],[x+3+gap,y-5]],"#aa8059","#483431",3);
  poly([[x-26,y-12],[x-14,y-12],[x-9-gap,y-5]],null,"#d8aa70",3);
  poly([[x+12+gap,y-12],[x+31,y-14],[x+38,y-8]],null,"#d8aa70",3);
}

function traceSource(t) {
  const opening = ease((t-breachAt)/.75);
  const view = camera(between(1.39,1.95,ease(t/4.2)),.82,.49);
  terrain("field",view);
  drawBreach(view,opening);
  drawRunoff(view,t,.42+.58*opening);
  if (t >= breachAt && t < breachAt+1.35) {
    groundParticles(source,view,t-breachAt,"#b78750",1-ease((t-breachAt)/1.35));
  }
  ping(source,view,null,"#ffae7e",t,t < breachAt || t > 3.6);
  const where = t < breachAt ? along([.93,.55],[.863,.541],t/2.3) : along([.863,.541],[.897,.549],(t-breachAt)/.5);
  const retreating = t >= breachAt && t < breachAt+.5;
  actor(where,view,t,t < 2.3 || retreating,true,"minh","idle",1,retreating ? 1 : -1);
}

function closeGate(t) {
  const view = camera(1.78,.81,.73);
  const close = ease((t-1.9)/(gateAt-1.9));
  terrain("field",view);
  // The main canal keeps flowing. Only the intake on the bank closes.
  drawRunoff(view,t,1);
  const [x,y] = project(intake,view);
  if (close < 1) {
    shoreline(view,[[.8,.723],intake,[.806,.79],[.823,.81]],"#3f716e",12*(1-close)+1);
    for (let i=0;i<3;i++) {
      const ripple = reduced.matches ? .4 : (t*.8+i*.31)%1;
      ellipse(x+12*ripple,y+18*ripple,8,2,"#acd1ae99");
    }
  }
  for (const side of [-1,1]) {
    roundRect(x+side*25-4,y-36,8,44,0,"#6d5b51","#302a2b");
    ctx.fillStyle = "#b7a480";
    ctx.fillRect(x+side*25-3,y-35,3,41);
  }
  roundRect(x-28,y-37,56,5,0,"#a88b60","#302a2b");
  const door = y-28+close*22;
  roundRect(x-20,door,40,15,0,"#6f776e","#353b3c");
  for(let slat=0;slat<4;slat++) {
    ctx.fillStyle = slat%2 ? "#56625c" : "#a4a490";
    ctx.fillRect(x-19+slat*9,door+3,2,10);
  }
  const spin = reduced.matches ? 0 : Math.PI*6*close;
  circle(x+31,y-24,8,"#423938","#d5ae7b",2);
  poly([[x+31+8*Math.cos(spin),y-24+8*Math.sin(spin)],[x+31-8*Math.cos(spin),y-24-8*Math.sin(spin)]],null,"#dbb78b",2);
  const worker = along([.89,.79],[.839,.764],t/1.85);
  actor(worker,view,t,t < 1.85,true,"minh",t < gateAt ? "crank" : "idle",1,-1);
}

const repairBags = [[-23,4],[-4,7],[17,3],[-17,-5],[3,-1],[24,-7],[-7,-13],[13,-13]];

function repairBank(t,filtering = false) {
  const view = camera(filtering ? 1.83 : 1.95,.82,.5);
  const fill = filtering ? 1 : ease((t-4.4)/(sealAt-4.4));
  const placed = filtering ? repairBags.length : Math.min(repairBags.length,Math.floor((t+.05)/.82));
  terrain("field",view);
  drawBreach(view,1-fill);
  if (!filtering && fill < 1) drawRunoff(view,t,1-fill);
  const [x,y] = project(source,view);
  for (const [dx,dy] of repairBags.slice(0,placed)) {
    roundRect(x+dx-9,y+dy-3,20,8,2,"#be9a66","#5d4b40");
    ctx.fillStyle = "#dbc293";
    ctx.fillRect(x+dx-5,y+dy-2,10,2);
  }
  if (fill > 0) {
    poly([[x-27,y-12],[x-10,y-22*fill-5],[x+26,y-21*fill],[x+42,y-5],[x+22,y+5],[x-27,y+3]],"#997047","#584637",2);
    poly([[x-21,y-8],[x-9,y-16*fill-3],[x+24,y-16*fill],[x+34,y-6]],null,"#d0a374",3);
  }
  if (filtering) {
    const cut = ease((t-.6)/3.6);
    const dir = [[.836,.515],[.859,.53],[.893,.553],[.918,.552]];
    const channel = dir.map(point => along(dir[0],point,cut));
    shoreline(view,channel,"#594a3b",13);
    shoreline(view,channel,"#6fa295",4*cut);
    const [bx,by] = project(channel.at(-1),view);
    if (cut > .6) {
      roundRect(bx-13,by-6,34,17,0,"#537e72","#704c38");
      const pulse = reduced.matches ? 0 : (t*13)%18;
      ctx.fillStyle = "#adc7a2";
      ctx.fillRect(bx-10+pulse,by,7,2);
    }
    if (t < 4.4) groundParticles(channel.at(-1),view,t,"#b79870",.65);
    const worker = along([.85,.526],[.91,.544],cut);
    actor(worker,view,t,false,true,"minh",t < 4.4 ? "shovel" : "idle");
  } else {
    const walking = t < 4.4;
    const progress = (t%.82)/.82;
    const worker = walking ? along([.882,.548],[.863,.535],progress) : [.865,.545];
    if (t < sealAt) groundParticles(source,view,t,"#cfad7c",walking ? .35 : .85);
    actor(worker,view,t,walking,true,"minh",walking ? "carry" : t < sealAt ? "shovel" : "idle",1,-1);
  }
}

function mainView(clip,t) {
  const motion = reduced.matches ? 0 : t;
  switch (clip.id) {
    case "intro": {
      const view = camera(1.01 + motion*.006,.52,.515);
      terrain("intro",view);
      const x = .35 + motion*.034;
      drawRunoff(view,t,.54);
      boat([x,.43+x*.29],view,t);
      break;
    }
    case "survey": return walkSurvey(t);
    case "drill": {
      const view = camera(1.28,.67,.70);
      terrain("field",view);
      actor(C1,view,t<4.2 ? t : t-4.2,false,true,"minh",t<4.2 ? "drill" : t<6.25 ? "lift" : "probe");
      earthSection(t);
      return C1;
    }
    case "samples": return collectSamples(t);
    case "stream": return waterTrail(t);
    case "source": return traceSource(t);
    case "block": return closeGate(t);
    case "repair": return repairBank(t);
    case "divert": return repairBank(t,true);
    case "water-build":
    case "water-run": return treatmentStation(clip.id,t);
    case "water-check": return t >= 11.7 ? approvedReturn(t-11.7) : treatmentStation(clip.id,t);
    case "roots": return amendments(t);
    case "plant": return plantVetiver(t);
    case "season": return riceSeason(t,clip.season);
    case "vetiver-collect": return collectVetiver(t);
    case "village":
    case "end": {
      const view = camera(1.015 + motion*.005,.58,.54);
      terrain("meeting",view);
      const speaker = currentLine[1];
      actor([.49,.78],view,t,false,false,"minh",speaker === "Minh" ? "talk" : "idle",1.55,1);
      actor([.9,.79],view,t+.4,false,false,"ngoc",speaker === "Chị Ngọc" ? "talk" : "idle",1.55,-1);
      actor([.68,.89],view,t+.8,false,false,"sau",speaker === "Chú Sáu" ? "talk" : "idle",1.65,-1);
      break;
    }
  }
}

function equipmentContent(clip,t) {
  const action = (symbol,title,description) => `<div class="action-box">${icon(symbol)}<div><strong>${title}</strong><small>${description}</small></div></div>`;
  const readings = (title,rows) => `<div class="equipment-head">${icon("meter")}${title}</div><div class="lcd">${rows.map(([label,value]) => `<span>${label}</span><strong>${value}</strong>`).join("")}</div>`;
  switch (clip.id) {
    case "drill":
      return t < 4.2 ? action("survey","Khoan lõi đất","Điểm C1 · 0–20 cm")
        : t < 7.4 ? action("meter","Chuẩn bị mẫu","Lõi đất C1")
        : readings("MÁY ĐO · MẪU C1",[["Cd đất","4,83 mg/kg"],["pH","4,8"]]);
    case "samples": {
      const {step,count,phase} = sampleFrame(t);
      if (phase !== "idle") {
        const title = {walk:"Đến điểm",drill:"Khoan lõi",probe:"Đọc mẫu"}[phase];
        return action("survey",`${title} ${samples[sampleOrder[step]].id}`,`${count}/6 điểm đã ghi`);
      }
      const sample = samples[sampleOrder[count-1]];
      return readings(`MẪU ${sample.id} · ${count}/6`,[["Cd đất",`${sample.cd} mg/kg`],["pH",sample.ph]]);
    }
    case "stream": {
      const {step,local} = waterFrame(t);
      const id = stations[step].id;
      if (local < 1.9) return action("survey",`Đến trạm ${id}`,`${step}/3 trạm đã đo`);
      if (local < 3.15) return action("drop",`Thả đầu dò ${id}`,"Chờ máy đọc Cd trong nước");
      return readings("CD TRONG NƯỚC",stations.slice(0,step+1).map(station => [station.id,`${station.cd} µg/L`]));
    }
    case "source": return t < breachAt ? action("survey","Kiểm tra vết nứt","Mép bờ phía cửa xả")
      : action("drop","Bờ bao vỡ","Nước đục tràn vào kênh");
    case "block": return t < gateAt ? action("drop","Hạ cửa cống","Ngắt dòng vào ruộng")
      : action("check","Cống đã đóng","Nước kênh dừng ngoài cửa");
    case "repair":
      return t < 4.4 ? action("survey","Xếp bao đất","Chắn chân bờ")
        : t < sealAt ? action("survey","Đắp và nện bờ","Siết kín chỗ vỡ")
        : action("check","Bờ đã được đắp lại","Dòng tràn đã dừng");
    case "divert": return t < 4.4 ? action("drop","Đào rãnh dẫn nước rỉ","Dẫn về trạm xử lý")
      : action("check","Rãnh dẫn đã nối","Cống ruộng vẫn đóng");
    case "water-build": return t < 6.3
      ? action("drop",`Lắp bể ${waterTanks[Math.min(2,Math.floor(t/2.1))].name.toLowerCase()}`,`${Math.floor(t/2.1)}/3 bể đã lắp`)
      : action("drop","Nối các đường ống","Van ra ruộng vẫn đóng");
    case "water-run": return t < 2.75 ? action("drop","Điều chỉnh pH","Châm chất xử lý và khuấy nhanh")
      : t < 4.8 ? action("drop","Tạo bông","Khuấy chậm để kết tụ hạt")
      : t < 9 ? action("drop","Bể lắng","Cặn chứa Cd chìm xuống đáy")
      : action("drop","Bể lọc","Giữ lại cặn còn trong nước");
    case "water-check":
      if (t<4.6) return action("drop","Thu gom bùn chứa Cd",t<2.6 ? "Tháo bùn vào thùng" : "Đậy kín và chuyển đi");
      if (t<waterOutlet) return action("meter","Kiểm tra Cd và pH","Van cấp ruộng vẫn khóa");
      if (t<11.7) return readings(t<waterRelease ? "ĐẠT · VAN ĐANG KHÓA" : "ĐẠT · MỞ VAN CẤP RUỘNG",
        [["Cd đầu vào",fieldVials[0]],["Cd đầu ra",fieldVials[1]],["pH đầu ra","7,1"]]);
      return action("check","Đã cấp nước về ruộng","Dòng đã qua ba bể và kiểm tra");
    case "roots":
      if (t<4.5) return action("sprout",t<1.65 ? "Lấy bao vôi" : "Rải vôi lên ô A","Chỉnh pH lớp đất mặt");
      if (t<8.8) return action("sprout",t<6.15 ? "Lấy bao biochar" : "Rải biochar","Phân bố than sinh học");
      return t<11 ? action("sprout","Trộn vật liệu vào đất","Dùng cuốc trộn lớp mặt")
        : readings("MÔ PHỎNG VÙNG RỄ",[["Độ pH",t<13.2 ? "6,0" : "7,1"],["Chấm cam","Cd bám rễ"],["Chấm vàng","Cd trên biochar"]]);
    case "plant": return t<2 ? action("sprout","Lấy hom vetiver","Chỉ trồng ở ô C")
      : t<11.8 ? action("sprout",`Trồng từng hom · ${plantedVetiver(t)}/9`,"Mỗi cụm một vị trí")
      : action("sprout","Tua nhanh · Vetiver phát triển","Một phần Cd tích lũy ở rễ");
    case "season": {
      const season = clip.season+1;
      const stage = ricePhase(t);
      if (t>=riceResults) {
        const [a,b] = cropReadings[clip.season];
        return readings(`VỤ ${season} · CD TRONG GẠO XÁT`,[["Ô A",`${a} mg/kg`],["Ô B",`${b} mg/kg`],["Ô C","Vetiver"]]);
      }
      if (t>=riceHarvest) return action("sprout",`Vụ ${season} · Thu hoạch`,"Lấy mẫu gạo để đo Cd");
      if (stage === "flower") return readings(`VỤ ${season} · LÚA TRỔ`,[["Ô B · Mực nước",`${Math.round(5*ease((t-riceIrrigation)/.8))} cm`]]);
      return action("sprout",`Vụ ${season} · ${({seed:"Gieo hạt",sprout:"Mạ mọc",young:"Lúa lớn dần",ripe:"Lúa chín"})[stage]}`,"Chỉ gieo lúa ở ô A và B");
    }
    case "vetiver-collect": return t<10.55 ? action("sprout",`Đào cả cụm · ${dugVetiver(t)}/9`,"Thu cả thân và rễ")
      : t<14.2 ? action("drop","Đưa sinh khối vào thùng","Thu gom riêng để xử lý")
      : action("check","Đã đóng thùng sinh khối","Ô C cần theo dõi tiếp");
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
let previousEffectTime = null;
let needsRedraw = true;
let dprX = 1;
let dprY = 1;
let artworkReady = false;
Promise.allSettled(Object.values(textures).map(image => image.decode())).then(() => {
  loadPlantTiles(textures.plantAtlas);
  const headshots = [
    ["Minh",textures.minhAtlas,[175,22,113,119]],
    ["Chị Ngọc",textures.villageAtlas,[175,18,120,126]],
    ["Chú Sáu",textures.villageAtlas,[163,460,135,142]]
  ];
  for (const [name,image,region] of headshots) {
    if (!image.naturalWidth) continue;
    const thumbnail = pixelCanvas(48,48,pixel => pixel("#bc9e79",0,0,48,48));
    const pen = thumbnail.getContext("2d");
    pen.imageSmoothingEnabled = false;
    pen.drawImage(image,...region,2,2,44,46);
    portraits[name] = thumbnail.toDataURL();
  }
  artworkReady = true;
  currentLine = null;
  needsRedraw = true;
});

function updateClip(clip) {
  ui.screen.dataset.view = clip.id;
  ui.location.textContent = clip.site;
  ui.objective.textContent = clip.task;
  ui.missionIcon.innerHTML = icon(chapters[clip.chapter][1]);
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
  playSceneEffects(clip,t);
  const line = [...clip.lines].reverse().find(entry => t >= entry[0]) || clip.lines[0];
  if (line !== currentLine) {
    ui.speaker.textContent = line[1];
    ui.portrait.src = portraits[line[1]];
    ui.caption.textContent = line[2];
    currentLine = line;
  }
  ctx.setTransform(dprX,0,0,dprY,0,0);
  mainView(clip,t);
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
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = false;
  dprX = canvas.width / W;
  dprY = canvas.height / H;
  needsRedraw = true;
}

function step(time) {
  const dt = lastFrame ? Math.min(.07,(time-lastFrame)/1000) : 0;
  lastFrame = time;
  if (artworkReady && playing && !document.hidden) {
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

const effectTimes = {
  source: [[breachAt,"break"]],
  block: [[gateAt,"clank"]],
  repair: [[.82,"thud"],[1.64,"thud"],[2.46,"thud"],[3.28,"thud"],[4.10,"thud"],[5.9,"thud"],[7.35,"thud"]],
  drill: [[7.4,"meter"]],
  samples: Array.from({length:5},(_,index) => [index*sampleInterval+2.45,"meter"]),
  stream: Array.from({length:3},(_,index) => [index*waterInterval+3.15,"meter"]),
  "water-check": [[2.6,"clank"],[waterOutlet,"meter"],[waterRelease,"clank"]],
  season: [[riceResults,"meter"]]
};

function playSceneEffects(clip,t) {
  const previous = previousEffectTime;
  previousEffectTime = {clip,t};
  if (!audioEnabled || !audio || !playing || previous?.clip !== clip || t-previous.t > .12) return;
  for (const [at,type] of effectTimes[clip.id] || []) {
    if (previous.t < at && t >= at) playEffect(type);
  }
}

function playEffect(type) {
  const at = audio.currentTime;
  const volume = audio.createGain();
  volume.connect(audio.destination);
  if (type === "meter" || type === "clank") {
    const tone = audio.createOscillator();
    const meter = type === "meter";
    tone.type = meter ? "sine" : "triangle";
    tone.frequency.setValueAtTime(meter ? 900 : 148,at);
    tone.frequency.exponentialRampToValueAtTime(meter ? 1320 : 56,at+.15);
    volume.gain.setValueAtTime(meter ? .04 : .075,at);
    volume.gain.exponentialRampToValueAtTime(.0001,at+.25);
    tone.connect(volume);
    tone.start(at);
    tone.stop(at+.25);
    return;
  }
  const breaking = type === "break";
  const length = breaking ? .82 : .21;
  const buffer = audio.createBuffer(1,Math.floor(audio.sampleRate*length),audio.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i=0;i<samples.length;i++) samples[i] = Math.random()*2-1;
  const source = audio.createBufferSource();
  const low = audio.createBiquadFilter();
  low.type = "lowpass";
  low.frequency.setValueAtTime(breaking ? 1450 : 220,at);
  low.frequency.exponentialRampToValueAtTime(breaking ? 200 : 75,at+length);
  volume.gain.setValueAtTime(breaking ? .18 : .12,at);
  volume.gain.exponentialRampToValueAtTime(.0001,at+length);
  source.buffer = buffer;
  source.connect(low).connect(volume);
  source.start(at);
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

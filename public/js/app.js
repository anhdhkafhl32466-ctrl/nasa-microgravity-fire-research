/* ==========================================================
   ORBITAL TELEMETRY CLIENT - CONNECTED TO NODE.JS EXPRESS
   ========================================================== */

// 1. Cosmic Canvas Starfield Generator
(function initStars() {
  const canvas = document.getElementById("cosmic-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005
    }));
  }
  window.addEventListener("resize", resize);
  resize();
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${Math.max(0, Math.min(1, s.alpha))})`;
      ctx.shadowBlur = s.r > 1.2 ? 6 : 0;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// 2. State & UI Helpers
const $ = s => document.querySelector(s);
const ic = p => `<svg viewBox="0 0 24 24">${p}</svg>`;
const PAL = ["#00f2fe", "#818cf8", "#ff7828", "#c084fc"];

const NAV = [
  ["overview", "Overview", '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>'],
  ["explore", "Explore", '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/>'],
  ["compare", "Telemetry Compare", '<path d="M6 3v18M18 3v18M6 8h6M12 16h6"/>'],
  ["insights", "Cosmic Insights", '<path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/>'],
  ["about", "Mission Logistics", '<circle cx="12" cy="12" r="9"/><path d="M12 8v.01M12 11v5"/>']
];

// SVG Chart Renderers
function line(labels, ss, w = 640, h = 240) {
  const p = 40, mx = Math.max(...ss.flatMap(s => s.d)) * 1.1;
  const X = i => p + i * (w - p - 16) / (labels.length - 1);
  const Y = v => h - 30 - v / mx * (h - 50);

  let g = `<defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

  g += [0, .25, .5, .75, 1].map(f => {
    const y = Y(mx * f);
    return `<line x1="${p}" x2="${w-16}" y1="${y}" y2="${y}" stroke="rgba(56,189,248,0.12)" stroke-dasharray="3 3"/><text x="4" y="${y+4}" fill="#64748b">${Math.round(mx*f)}</text>`;
  }).join("");

  g += labels.map((l, i) => `<text x="${X(i)-10}" y="${h-8}" fill="#94a3b8">${l}</text>`).join("");

  g += ss.map(s => {
    const pts = s.d.map((v, i) => X(i) + "," + Y(v)).join(" ");
    return `<polyline fill="none" stroke="${s.c}" stroke-width="2.5" filter="url(#glow)" points="${pts}"/>` +
      s.d.map((v, i) => `<circle cx="${X(i)}" cy="${Y(v)}" r="3.5" fill="${s.c}" stroke="#030712" stroke-width="1.5"/>`).join("");
  }).join("");

  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img">${g}</svg>
  <div class="legend">${ss.map(s => `<span><i style="background:${s.c};color:${s.c}"></i>${s.n}</span>`).join("")}</div>`;
}

function bars(labels, vals, color, unit, w = 640, h = 220) {
  const p = 36, mx = Math.max(...vals) * 1.15, bw = (w - p) / labels.length;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%">${[0, .5, 1].map(f => `<line x1="${p}" x2="${w}" y1="${h-28-f*(h-52)}" y2="${h-28-f*(h-52)}" stroke="rgba(56,189,248,0.12)" stroke-dasharray="2 2"/><text x="2" y="${h-24-f*(h-52)}" fill="#64748b">${Math.round(mx*f)}</text>`).join("")}${vals.map((v, i) => {
    const bh = v / mx * (h - 52);
    const col = Array.isArray(color) ? color[i % color.length] : color;
    return `<rect x="${p + i * bw + bw * .2}" y="${h - 28 - bh}" width="${bw * .6}" height="${bh}" rx="4" fill="${col}" opacity="0.85"/><text x="${p + i * bw + bw * .25}" y="${h - 8}" fill="#94a3b8">${labels[i]}</text><text x="${p + i * bw + bw * .25}" y="${h - 34 - bh}" fill="#fff" font-weight="600">${v}</text>`;
  }).join("")}</svg><div class="legend"><span>${unit}</span></div>`;
}

const riskTag = r => `<span class="tag ${r==="High"?"fire":"blue"}">${r==="High"?"⚡ ":""}${r} Risk</span>`;
const chart = (t, sub, body) => `<div class="card"><div class="chead"><h3>${t}</h3><span class="tag mono blue">${sub}</span></div>${body}</div>`;
const safetyList = sList => sList.map(s => `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:13px"><span>${s.k}</span><b style="color:${s.c}">${s.lv}</b></div><div class="bar"><i style="width:${s.v}%;background:${s.c};color:${s.c}"></i></div></div>`).join("");
const aiInsightCard = (insight) => `<div class="card ai" id="ai-insight-box"><div class="chead"><h3>✦ ORBITAL AI COGNITION</h3><span class="tag blue">ISS Sync</span></div><div class="quote" id="ai-quote">“${insight.q}”</div><div class="mut" style="font-size:11px;letter-spacing:.12em;font-weight:700">MISSION TELEMETRY EVIDENCE</div><div id="ai-evidence">${insight.ev.map(e => `<div style="margin-top:4px">• <a href="#detail/${e.slice(-3)}" style="color:var(--cyan);text-decoration:none">${e}</a></div>`).join("")}</div><p style="margin-top:16px"><a class="btn ghost" href="#insights">Query Mission Knowledge Base →</a></p></div>`;
const expRow = e => `<a class="row" href="#detail/${e.id}" style="text-decoration:none;color:inherit"><div><b style="color:#fff">#${e.id} · ${e.title}</b><div class="mut" style="font-size:12px;margin-top:2px">${e.fuel} · ${e.gravity}</div></div>${riskTag(e.risk)}</a>`;

// 3. API Fetch Services
async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`/api${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

// 4. Page View Handlers
const Views = {
  overview: async () => {
    const data = await fetchAPI('/dashboard');
    if (!data) return `<div class="empty">Không thể kết nối đến máy chủ Express Node.js.</div>`;

    if (data.orbit) {
      if ($('#orbit-alt')) $('#orbit-alt').innerText = `ALTITUDE: ${data.orbit.altitudeKm} km`;
      if ($('#orbit-inc')) $('#orbit-inc').innerText = `INCLINATION: ${data.orbit.inclinationDeg}°`;
    }

    return `<div class="hero">
      <div class="eyebrow mono">Orbital Combustion Physics · ISS Module</div>
      <h1>Microgravity Fire Research</h1>
      <p>Hệ thống giám sát vi trọng lực thời gian thực chạy trên nền tảng Node.js & Express: phân tích ngọn lửa hình cầu tĩnh, động học khuếch tán oxy và an toàn phi hành đoàn.</p>
      <a class="btn" href="#explore">Khám phá thí nghiệm ISS →</a>
    </div>
    <div class="grid g3">${data.stats.map(s => `<div class="card stat"><div class="l">${s.l}</div><div class="n mono">${s.n}</div></div>`).join("")}</div>
    <div class="grid">${chart("Biến thiên nhiệt độ ngọn lửa theo thời gian (K)", "μg vs 1 g", line(data.telemetry.t, [{n:"Vi trọng lực (μg ISS)", c:PAL[0], d:data.telemetry.series.mu}, {n:"Trọng lực Trái đất (1 g)", c:PAL[2], d:data.telemetry.series.g1}]))}</div>
    <div class="grid g2"><div class="card"><div class="chead"><h3>Thí nghiệm gần đây</h3><a href="#explore" class="mut" style="font-size:12px;text-decoration:none">Xem tất cả →</a></div>${data.recentExperiments.map(expRow).join("")}</div>${aiInsightCard(data.insight)}</div>
    <div class="grid g2"><div class="card"><div class="chead"><h3>Chỉ số an toàn khoang tàu</h3><span class="tag fire">Telemetry Live</span></div>${safetyList(data.safety)}</div><div class="card"><h3>Trạng thái luồng dữ liệu Node.js API</h3><div class="skel" style="margin:16px 0;width:85%"></div><div class="skel" style="width:55%"></div></div></div>`;
  },

  explore: async (query = "") => {
    const res = await fetchAPI(`/experiments${query ? '?' + query : ''}`);
    const exps = res && res.data ? res.data : [];

    return `<div class="eyebrow mono">NASA Catalogue Database (Node.js API)</div><h1>Explore Research</h1>
    <div class="bar-f">
      <input id="search-input" placeholder="Tìm kiếm thí nghiệm, loại nhiên liệu, nguồn phát xạ…" aria-label="Search">
      <select id="gravity-filter">
        <option value="all">Tất cả trọng lực</option>
        <option value="microgravity">Microgravity (μg)</option>
        <option value="lunar">Mặt trăng (0.16 g)</option>
        <option value="earth">Trái đất (1 g)</option>
      </select>
    </div>
    <div class="card tw">
      <table>
        <thead><tr><th>ID</th><th>Tên thí nghiệm</th><th>Nhiên liệu</th><th>Môi trường</th><th>Nhiệt độ</th><th>Áp suất</th><th>Thời gian</th><th>Ngày</th><th>Thiết bị</th></tr></thead>
        <tbody>
          ${exps.length ? exps.map(e => `<tr onclick="location.hash='detail/${e.id}'"><td class="mono" style="color:var(--cyan)">#${e.id}</td><td><b style="color:#fff">${e.title}</b></td><td>${e.fuel}</td><td>${e.gravity}</td><td class="mono">${e.temp} K</td><td class="mono">${e.press} kPa</td><td class="mono">${e.dur}s</td><td class="mono">${e.date}</td><td class="mut">${e.src}</td></tr>`).join("") : `<tr><td colspan="9" style="text-align:center;padding:24px;color:var(--mut)">Không tìm thấy thí nghiệm nào phù hợp.</td></tr>`}
        </tbody>
      </table>
    </div>
    <div class="grid gc">
      ${exps.slice(0, 3).map(e => `<a class="card" href="#detail/${e.id}"><div class="chead"><span class="mono mut">#${e.id}</span>${riskTag(e.risk)}</div><h3 style="color:#fff">${e.title}</h3><p class="mut">${e.fuel} · ${e.gravity}</p><div class="kv"><div><small>Thời gian</small><b class="mono" style="color:var(--cyan)">${e.dur}s</b></div><div><small>Nhiệt độ</small><b class="mono" style="color:var(--fire)">${e.temp}K</b></div></div></a>`).join("")}
    </div>`;
  },

  detail: async (id) => {
    const res = await fetchAPI(`/experiments/${id || '024'}`);
    if (!res || !res.data) return `<div class="empty">Không tìm thấy mã thí nghiệm #${id}.</div>`;
    const e = res.data;
    const ts = res.telemetryTimeseries;

    return `<a href="#explore" class="mut" style="text-decoration:none;font-size:13px">← Quay lại danh mục</a>
    <div class="eyebrow mono" style="margin-top:14px">ISS Telemetry Record #${e.id}</div><h1>${e.title}</h1>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">${riskTag(e.risk)}<span class="tag">${e.date}</span><span class="tag blue">${e.src}</span></div>
    <div class="grid"><div class="card"><h3>Thông số môi trường buồng đốt CIR</h3><div class="kv" style="margin-top:14px"><div><small>Nhiên liệu</small><b>${e.fuel}</b></div><div><small>Chất oxy hoá</small><b>${e.oxidizer}</b></div><div><small>Gia tốc trọng trường</small><b>${e.gravity}</b></div><div><small>Nhiệt độ đỉnh</small><b class="mono" style="color:var(--fire)">${e.temp} K</b></div><div><small>Áp suất khoang</small><b class="mono" style="color:var(--cyan)">${e.press} kPa</b></div><div><small>Thời gian duy trì</small><b class="mono">${e.dur} s</b></div></div></div></div>
    <div class="grid g2"><div class="card"><h3>Quan sát hành vi ngọn lửa</h3><p class="mut">Hành vi ghi nhận: ${e.flame || "Ngọn lửa hình cầu tĩnh"}. Trong điều kiện vi trọng lực, dòng đối lưu tự nhiên bị triệt tiêu, quá trình khuếch tán oxy là yếu tố chủ đạo điều khiển phản ứng.</p><ul class="mut" style="padding-left:20px"><li>Tốc độ tạo muội than: <b style="color:#fff">${e.soot}</b></li><li>Tự dập tắt khi lớp vỏ tro khí CO₂ bao quanh làm giảm nồng độ oxy.</li></ul></div>${chart("Độ lan toả bán kính ngọn lửa (mm)", "Optics", bars(["0-10s", "10-20s", "20-30s", "30-40s"], [8, 14, 11, 6], "#00f2fe", "Bán kính ngọn lửa (mm)", 320, 200))}</div>
    <div class="grid">${chart("Lịch sử nhiệt độ thời gian thực", "Kelvin", line(ts.t, [{n:"Thí nghiệm #" + e.id, c:PAL[0], d:ts.series.mu}]))}</div>`;
  },

  compare: async () => {
    const res = await fetchAPI('/compare');
    const E = res && res.data ? res.data : [];
    const rows = [["Nhiên liệu", e => e.fuel], ["Môi trường", e => e.gravity], ["Nhiệt độ đỉnh", e => e.temp + " K"], ["Áp suất buồng", e => e.press + " kPa"], ["Thời gian cháy", e => e.dur + " s"], ["Mức độ tạo muội", e => e.soot]];

    return `<div class="eyebrow mono">Side-by-side Analysis (API Sync)</div><h1>So sánh Telemetry</h1>
    <div class="card tw"><table><thead><tr><th></th>${E.map((e, i) => `<th style="color:${PAL[i]}">Probe ${"ABC"[i]} · #${e.id}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr style="cursor:default"><td class="mut">${r[0]}</td>${E.map(e => `<td>${r[1](e)}</td>`).join("")}</tr>`).join("")}<tr style="cursor:default"><td class="mut">Chênh lệch vs A</td><td>—</td><td class="dn mono">+16 s ▲</td><td class="up mono">+138 s ▲</td></tr></tbody></table></div>
    <div class="grid g2">${chart("Thời gian duy trì ngọn lửa", "Giây (s)", bars(E.map(e => "#" + e.id), E.map(e => e.dur), PAL, "Seconds"))}${chart("Nhiệt độ đốt tối đa", "Kelvin (K)", bars(E.map(e => "#" + e.id), E.map(e => e.temp), PAL, "Kelvin"))}</div>`;
  },

  insights: async () => {
    const data = await fetchAPI('/dashboard');
    return `<div class="eyebrow mono">AI Deep Space Cognition (Node.js API Endpoint)</div><h1>Cosmic Insights</h1>
    <div class="card ai">
      <h3>✦ HỎI ĐÁP VẬT LÝ BUỒNG ĐỐT VI TRỌNG LỰC</h3>
      <div class="bar-f">
        <input id="ai-input" placeholder="Đặt câu hỏi về hành vi ngọn lửa trên Trạm ISS hoặc Sao Hoả…">
        <button class="btn" id="ai-btn" onclick="askAICognition()">Phân tích AI</button>
      </div>
      <div id="ai-response-area" style="display:none;margin-top:16px;padding:14px;background:rgba(0,0,0,0.4);border-radius:10px;border-left:3px solid var(--cyan)">
        <div id="ai-response-text" style="color:#e2e8f0;font-size:14px"></div>
        <div id="ai-response-ev" style="margin-top:8px;font-size:12px;color:var(--cyan)"></div>
      </div>
      <div class="mut" style="font-size:12px;margin-top:8px">Được xử lý bởi endpoint: <code style="color:var(--cyan)">POST /api/insights/ask</code></div>
    </div>
    <div class="grid g2">
      ${aiInsightCard(data.insight)}
      <div class="card"><div class="chead"><h3>Đánh giá rủi ro khoang sinh hoạt</h3><span class="tag fire">Cảnh báo Artemis</span></div>${safetyList(data.safety)}<div class="quote" style="border-color:var(--fire)"><b style="color:var(--fire)">Khuyến nghị an toàn</b><br>Khi không có luồng gió nhân tạo, ngọn lửa vi trọng lực không dễ phát hiện qua cảm biến khói quang thông thường. Cần bố trí hệ thống cảm biến quang phổ hồng ngoại đa góc.</div></div>
    </div>
    <div class="grid g2">${chart("Nồng độ O₂ vs Thời gian cháy", "% O₂", line(data.telemetry.o2curve.labels, [{n:"Thời gian ngọn lửa tồn tại (s)", c:PAL[0], d:data.telemetry.o2curve.dur}]))}${chart("Phân loại trạng thái ngọn lửa", "Catalog", bars(["Hình cầu", "Dẹp", "Nhiều muội", "Tự tắt"], [14, 9, 7, 5], PAL, "Số lượng kiểm nghiệm"))}</div>`;
  },

  about: () => {
    return `<div class="eyebrow mono">NASA Glenn Research Center · Node.js Backend</div><h1>About Research</h1>
    <div class="card"><p class="mut" style="max-width:760px;font-size:15px">Hệ thống Dashboard được xây dựng trên kiến trúc máy chủ Node.js & Express, cung cấp các API endpoint tiêu chuẩn cho luồng Telemetry vi trọng lực từ buồng đốt CIR (Destiny Laboratory, ISS).</p></div>
    <div class="grid g3">
      <div class="card"><h3 style="color:var(--cyan)">RESTful API</h3><p class="mut">Hỗ trợ lọc, so sánh và trích xuất dữ liệu thí nghiệm.</p></div>
      <div class="card"><h3 style="color:var(--plasma)">Node.js Runtime</h3><p class="mut">Hiệu năng cao, khả năng mở rộng kết nối WebSocket thời gian thực.</p></div>
      <div class="card"><h3 style="color:var(--fire)">Cosmic HUD</h3><p class="mut">Giao diện đồ hoạ tối ưu cho phòng điều khiển mặt đất.</p></div>
    </div>`;
  }
};

// 5. Global Action Helpers (Live Search & AI Ask)
window.askAICognition = async function() {
  const input = $('#ai-input');
  const btn = $('#ai-btn');
  const resArea = $('#ai-response-area');
  const resText = $('#ai-response-text');
  const resEv = $('#ai-response-ev');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  btn.disabled = true;
  btn.innerText = "Đang xử lý...";

  try {
    const res = await fetch('/api/insights/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: query })
    });
    const data = await res.json();
    if (data.status === "success") {
      resArea.style.display = "block";
      resText.innerHTML = `<b>Phản hồi AI:</b> ${data.response}`;
      resEv.innerHTML = `Bằng chứng: ${data.evidence.map(e => `<a href="#detail/${e.slice(-3)}" style="color:var(--cyan);margin-right:8px;text-decoration:none">● ${e}</a>`).join("")}`;
    }
  } catch (e) {
    console.error(e);
  } finally {
    btn.disabled = false;
    btn.innerText = "Phân tích AI";
  }
};

// 6. Router & Event Binding
async function render() {
  const [r, a] = (location.hash.slice(1) || "overview").split("/");
  const k = Views[r] ? r : "overview";

  $("#nav").innerHTML = NAV.map(n => `<a href="#${n[0]}" class="${n[0]===k||(k==="detail"&&n[0]==="explore")?"on":""}">${ic(n[2])}${n[1]}</a>`).join("");

  // Loading skeleton
  $("#view").innerHTML = `<div class="loading-state"><div class="skel" style="height:32px;width:300px;margin-bottom:20px"></div><div class="skel" style="height:140px;width:100%;margin-bottom:20px"></div><div class="skel" style="height:260px;width:100%"></div></div>`;

  const html = await Views[k](a);
  $("#view").innerHTML = html + `<div class="note mono">NASA MICROGRAVITY TELEMETRY DASHBOARD · NODE.JS EXPRESS BACKEND · PORT 3000</div>`;

  // Attach search events if on explore
  if (k === "explore") {
    const searchInp = $('#search-input');
    const gravFilter = $('#gravity-filter');
    const triggerSearch = async () => {
      const q = new URLSearchParams();
      if (searchInp.value) q.set('search', searchInp.value);
      if (gravFilter.value && gravFilter.value !== 'all') q.set('gravity', gravFilter.value);
      const resHtml = await Views.explore(q.toString());
      $('#view').innerHTML = resHtml + `<div class="note mono">NASA MICROGRAVITY TELEMETRY DASHBOARD · NODE.JS EXPRESS BACKEND · PORT 3000</div>`;
    };
    if (searchInp) searchInp.addEventListener('input', triggerSearch);
    if (gravFilter) gravFilter.addEventListener('change', triggerSearch);
  }

  $("#side").classList.remove("open");
  scrollTo(0, 0);
}

addEventListener("hashchange", render);
render();

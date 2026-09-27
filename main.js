(function () {
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var toggle = document.querySelector('.theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  function syncTheme() {
    var dark = root.dataset.theme !== 'light';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (meta) meta.setAttribute('content', dark ? '#0A0A0A' : '#F2F2F0');
  }
  toggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  /* ---------- Daily UI ---------- */
  var DAY = 24 * 60 * 60 * 1000;
  var parts = (window.DAILY_UI_START || '2026-09-28').split('-').map(Number);
  var start = new Date(parts[0], parts[1] - 1, parts[2]); // local midnight
  var now = new Date();

  function dateFor(day) { return new Date(start.getTime() + (day - 1) * DAY + 3 * 60 * 60 * 1000); }
  function pad(n) { return String(n).padStart(3, '0'); }
  function fmt(d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }

  var live = (window.DAILY_UI || [])
    .filter(function (s) { return new Date(start.getTime() + (s.day - 1) * DAY) <= now; })
    .sort(function (a, b) { return b.day - a.day; });

  var list = document.getElementById('shots');
  live.forEach(function (s) {
    var li = document.createElement('li');
    li.className = 'shot';

    var frame = document.createElement(s.link ? 'a' : 'div');
    frame.className = 'shot__frame';
    if (s.link) { frame.href = s.link; frame.target = '_blank'; frame.rel = 'noopener'; }

    var img = new Image();
    img.src = s.image;
    img.alt = 'Daily UI ' + pad(s.day) + ': ' + s.title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.onerror = function () {
      frame.classList.add('shot__frame--empty');
      frame.textContent = 'Day ' + pad(s.day);
    };
    frame.appendChild(img);

    var meta = document.createElement('div');
    meta.className = 'shot__meta';
    meta.innerHTML = '<span class="muted">Day ' + pad(s.day) + ' · ' + fmt(dateFor(s.day)) + '</span>';
    var t = document.createElement('span');
    t.textContent = s.title;
    meta.appendChild(t);

    li.appendChild(frame);
    li.appendChild(meta);
    list.appendChild(li);
  });

  document.getElementById('shots-empty').hidden = live.length > 0;
  var count = document.getElementById('now-count');
  if (live.length) count.textContent = 'Day ' + pad(live[0].day) + ' / 100 — Daily UI';

  document.getElementById('year').textContent = new Date().getFullYear();
})();

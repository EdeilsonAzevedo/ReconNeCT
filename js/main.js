/* ════════════════════════════════════════
   ReconNeCT — Global JS (Light Theme)
   ════════════════════════════════════════ */

(function () {

  /* ─── 1. STATUS BANNER ─── */
  const bannerHTML = `
  <div id="status-banner">
    <span class="status-dot"></span>
    <span class="status-text">
      <strong>Project status:</strong> Current funding cycle concluding — legacy active, open to new collaborations and funding opportunities.
    </span>
    <a href="results.html" class="status-cta">See Key Results →</a>
  </div>`;

  /* ─── 2. NAV ─── */
  const navHTML = `
  <nav>
    <a href="index.html" class="nav-logo">Recon<span>Ne</span>CT</a>
    <ul class="nav-links" id="navLinks">
      <li><a href="about.html">About</a></li>
      <li><a href="results.html">Results</a></li>
      <li><a href="publications.html">Publications</a></li>
      <li><a href="people.html">People</a></li>
      <li><a href="activities.html">Activities</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="https://www.cemeai.icmc.usp.br/ModCovid19" target="_blank">ModCovid19 ↗</a></li>
    </ul>
    <button class="nav-burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a href="contact.html" class="nav-cta">Collaborate</a>
  </nav>`;

  /* ─── 3. FOOTER ─── */
  const footerHTML = `
  <footer>
    <div class="footer-logo">Recon<span>Ne</span>CT</div>
    <ul class="footer-links">
      <li><a href="about.html">About</a></li>
      <li><a href="results.html">Results</a></li>
      <li><a href="publications.html">Publications</a></li>
      <li><a href="people.html">People</a></li>
      <li><a href="activities.html">Activities</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <span class="footer-copy">© ${new Date().getFullYear()} ReconNeCT · USP / ICMC</span>
  </footer>`;

  /* ─── 4. CANVAS ─── */
  const canvasHTML = `<canvas id="bg-canvas"></canvas>`;

  document.body.insertAdjacentHTML('afterbegin', canvasHTML);
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('afterbegin', bannerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ─── 5. ACTIVE LINK ─── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ─── 6. BURGER ─── */
  document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  /* ─── 7. CANVAS — light, discrete, gray/blue ─── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes, mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initNodes() {
    nodes = Array.from({ length: 45 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r:  Math.random() * 2.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // edges — light gray/blue, very subtle
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(100,120,200,${(1 - d / 150) * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // nodes — small, muted blue-gray
    nodes.forEach(n => {
      const dx   = n.x - mouse.x;
      const dy   = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const near = dist < 100 ? 1 - dist / 100 : 0;

      // subtle glow ring on hover
      if (near > 0.1) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(67,86,224,${near * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + near * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = near > 0
        ? `rgba(67,86,224,${0.25 + near * 0.35})`
        : `rgba(160,170,200,0.35)`;
      ctx.fill();
    });
  }

  function loop() {
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize',    () => { resize(); initNodes(); });
  window.addEventListener('mousemove', e  => { mouse.x = e.clientX; mouse.y = e.clientY; });

  resize(); initNodes(); loop();

  /* ─── 8. SCROLL REVEAL ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

})();
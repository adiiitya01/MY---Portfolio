
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');
  document.addEventListener('mousemove', e => {
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; cursor.style.background = 'rgba(0,255,65,0.15)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursor.style.background = 'transparent'; });
  });

  
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
  const fontSize = 14;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);
  function drawMatrix() {
    ctx.fillStyle = 'rgba(10,10,10,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px Share Tech Mono';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(drawMatrix, 50);

  const lines = [
    'Scanning for vulnerabilities...',
    'Identifying attack vectors...',
    'Running penetration test...',
    'Securing the perimeter...',
    'Access granted. Welcome.'
  ];
  let lineIndex = 0, charIndex = 0, isDeleting = false;
  const typedEl = document.getElementById('typed-text');
  function type() {
    const current = lines[lineIndex];
    if (!isDeleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { isDeleting = true; setTimeout(type, 2000); return; }
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) { isDeleting = false; lineIndex = (lineIndex + 1) % lines.length; }
    }
    setTimeout(type, isDeleting ? 50 : 80);
  }
  setTimeout(type, 1500);

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

  function handleSubmit(btn) {
    btn.textContent = '// ENCRYPTING...';
    setTimeout(() => { btn.textContent = '✓ MESSAGE SENT'; btn.style.color = '#00ff41'; btn.style.borderColor = '#00ff41'; }, 1500);
    setTimeout(() => { btn.textContent = './send --encrypt'; btn.style.color = ''; btn.style.borderColor = ''; }, 4000);
  }

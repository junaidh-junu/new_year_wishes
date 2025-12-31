// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=*&^%$#@!';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = charArray[Math.floor(Math.random() * charArray.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = `rgba(0, ${150 + Math.random() * 105}, ${50 + Math.random() * 50}, ${0.8 + Math.random() * 0.2})`;
    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Terminal Animation
const sequences = [
  { 
    type: 'type', 
    target: 'cmd1', 
    text: './celebrate_2026.sh --with-style',
    cursor: 'cursor1',
    delay: 50 
  },
  { 
    type: 'show', 
    target: 'output1', 
    html: `<span class="info">[INFO]</span> Initializing New Year sequence...<div class="progress-bar"><div class="progress-fill" id="progress"></div></div>`,
    progressTo: 100
  },
  { 
    type: 'show', 
    target: 'output2', 
    html: `<span class="success">[SUCCESS]</span> Year 2025 archived successfully ✓<br><span class="success">[SUCCESS]</span> Loading new beginnings...<br><span class="success">[SUCCESS]</span> Compiling hopes and dreams...<br><span class="warning">[WARN]</span> Expectations set to: <span class="highlight">MAXIMUM</span>`
  },
  { 
    type: 'show', 
    target: 'output3', 
    html: `<br><span class="year">✦ 2026 ✦</span><br><br><span style="color: #e6edf3;">Wishing you a year filled with</span><br><span class="success">► successful deployments</span><br><span class="info">► zero merge conflicts</span><br><span class="warning">► infinite coffee</span><br><span class="highlight">► code that works on the first try</span>`
  },
  { 
    type: 'show', 
    target: 'output4', 
    html: `<br><span class="info">$ echo "Happy New Year!"</span><br><span style="color: #e6edf3; font-size: 18px;">🎆 May your code compile and your bugs be few! 🎆</span>`
  },
  { 
    type: 'show', 
    target: 'signature', 
    html: `<span>Crafted with ♥ by</span> <a href="https://junaidh.me" target="_blank" rel="noopener noreferrer">Junaidh</a> <span>// ${new Date().getFullYear()}</span>`
  }
];

async function typeText(elementId, text, cursorId, delay) {
  const element = document.getElementById(elementId);
  const cursor = document.getElementById(cursorId);
  
  if (!element || !cursor) return;
  
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await sleep(delay + Math.random() * 30);
  }
  cursor.style.display = 'none';
}

async function showElement(elementId, html, progressTo) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.innerHTML = html;
  element.classList.add('visible');
  
  if (progressTo) {
    await sleep(300);
    const progress = document.getElementById('progress');
    if (progress) {
      progress.style.width = progressTo + '%';
      await sleep(800);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createConfetti() {
  const colors = ['#00ff41', '#00d4ff', '#ff7b72', '#d29922', '#b400ff'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(confetti);

      const animation = confetti.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      animation.onfinish = () => confetti.remove();
    }, i * 30);
  }
}

async function runSequence() {
  await sleep(800);
  
  for (const seq of sequences) {
    if (seq.type === 'type') {
      await typeText(seq.target, seq.text, seq.cursor, seq.delay);
      await sleep(400);
    } else if (seq.type === 'show') {
      await showElement(seq.target, seq.html, seq.progressTo);
      await sleep(600);
    }
  }
  
  await sleep(500);
  createConfetti();
}

// Initialize on load
window.addEventListener('load', () => {
  runSequence();
});
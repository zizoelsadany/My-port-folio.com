// script.js

const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const NUM_PARTICLES = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around the screen
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;

    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * (1 - distance / 150)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".navbar ul");

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
init();
animate();
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const blackHoleElement = document.getElementById('black-hole-cursor');
let particlesArray;
const button = document.getElementById('btnTema')
let isDarkMode = true;

button.addEventListener('click', () =>{
    document.body.classList.toggle('light-mode')
    isDarkMode = !isDarkMode;
    if(isDarkMode){
        button.innerHTML = `<i class='bx bx-moon-stars'></i>`
    }else{
        button.innerHTML = `<i class='bx bx-sun'></i>`
    }

});

const mouse = {
    x: null,
    y: null,
    radius: 200
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    blackHoleElement.style.left = e.x + 'px';
    blackHoleElement.style.top = e.y + 'px';
});


const setupLinks = () => {
    
    const interactivos = document.querySelectorAll('a, button, .clickable, h1, h2, p, span, i');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => {
            blackHoleElement.classList.add('active'); 
        });
        el.addEventListener('mouseleave', () => {
            blackHoleElement.classList.remove('active'); 
        });
    });
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(isStatic) {
        this.isStatic = isStatic;
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.1;
        this.speedX = this.isStatic ? 0 : (Math.random() * 2) + 1; 
        this.speedY = this.isStatic ? 0 : (Math.random() * 0.4) - 0.2;
        this.opacity = Math.random();
        this.baseSize = this.size;
    }

    draw() {
        // COLORES OPTIMIZADOS
        // Modo Oscuro: Estrellas blancas/azuladas, Estelas Cian
        // Modo Claro: Estrellas Azul Petróleo, Estelas Púrpura Profundo
        const starColor = isDarkMode ? '226, 232, 240' : '26, 32, 44'; 
        const trailColor = isDarkMode ? '0, 212, 255' : '93, 0, 214';

        if (!this.isStatic) {
            let trailGradient = ctx.createLinearGradient(this.x, this.y, this.x - (this.speedX * 12), this.y);
            
            // La estela en modo claro tiene un poco menos de opacidad para que sea elegante
            const trailOpacity = isDarkMode ? this.opacity : this.opacity * 0.6;
            
            trailGradient.addColorStop(0, `rgba(${trailColor}, ${trailOpacity})`);
            trailGradient.addColorStop(1, `rgba(${trailColor}, 0)`);
            
            ctx.strokeStyle = trailGradient;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - (this.speedX * 10), this.y);
            ctx.stroke();
        }

        // Dibujar el punto de la estrella
        ctx.fillStyle = `rgba(${starColor}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x += dx * force * 0.08;
            this.y += dy * force * 0.08;
            
            if (distance < 20) {
                this.x = -50; 
                this.y = Math.random() * canvas.height;
            }
            this.size = this.baseSize + (force * 2);
        } else {
            this.size = this.baseSize;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = -10;
        this.draw();
    }
}

function animate() {
    ctx.fillStyle = isDarkMode ? '#0B0E14' : '#F0F4F8'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < 150; i++) particlesArray.push(new Particle(true));
    for (let i = 0; i < 70; i++) particlesArray.push(new Particle(false));
    setupLinks(); 
}

function animate() {
    ctx.fillStyle = isDarkMode ? '#0B0E14' : '#F0F4F8'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();
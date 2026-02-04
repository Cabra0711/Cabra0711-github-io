const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
const blackHoleElement = document.getElementById('black-hole-cursor');
const button = document.getElementById('btnTema');
const gridProyectos = document.getElementById('proyectos-grid');
const botonesFiltro = document.querySelectorAll('.filter-btn');

let particlesArray = [];
let isDarkMode = true;

const proyectosRepo = {
    robin: [
        {
            id: 1,
            titulo: "Python Actividades 1",
            desc: "Ejercicios iniciales de lógica y sintaxis en Python.",
            link: "https://github.com/Cabra0711/M1_python_actividades_1"
        },
        {
            id: 2,
            titulo: "Python Actividad 5",
            desc: "Resolución de problemas intermedios de programación.",
            link: "https://github.com/Cabra0711/M1_python_actividad_5"
        },
        {
            id: 3,
            titulo: "Mi Hoja de Vida",
            desc: "Repositorio principal de mi curriculum vitae.",
            link: "https://github.com/Cabra0711/Cabra-Hoja-de-vida/tree/main"
        },
        {
            id: 4,
            titulo: "Python Semanas 2",
            desc: "Actividades avanzadas de la segunda semana de Python.",
            link: "https://github.com/Cabra0711/python_activities_week_2"
        },
        {
            id: 5,
            titulo: "Moodle HTML/CSS W1",
            desc: "Página estática realizada para la semana 1 de Riwi.",
            link: "https://cabra0711.github.io/M2_HTML-Y-CSS_MOODLE_week_1/"
        },
        {
            id: 6,
            titulo: "Login HTML/CSS",
            desc: "Interfaz de inicio de sesión con validaciones visuales.",
            link: "https://cabra0711.github.io/M2_HTML-Y-CSS_login_week_1/"
        },
        {
            id: 7,
            titulo: "Proyecto Eventos",
            desc: "Gestión de eventos desarrollada en Git.",
            link: "https://github.com/Cabra0711/proyecto-eventos"
        },
        {
            id: 8,
            titulo: "Java Projects",
            desc: "Repositorio de prácticas de programación en Java.",
            link: "https://github.com/Cabra0711/java"
        },
        {
            id: 9,
            titulo: "JavaScript Actividad",
            desc: "Lógica de programación y manipulación del DOM.",
            link: "https://github.com/Cabra0711/actividad_js"
        },
        {
            id: 10,
            titulo: "Simulacro Riwi",
            desc: "Preparación técnica para evaluaciones de Riwi.",
            link: "https://github.com/Cabra0711/simulacrio_riwi"
        }
    ],
    moodle: [
        {
            id: 1,
            titulo: "Python Moodle W1",
            desc: "Entregables de la primera semana de Python.",
            link: "https://github.com/Cabra0711/M1_python_moodle_week_1"
        },
        {
            id: 2,
            titulo: "Python Moodle W2",
            desc: "Ejercicios técnicos de la segunda semana.",
            link: "https://github.com/Cabra0711/M1_python_moodle_week_2"
        },
        {
            id: 3,
            titulo: "Python Moodle 3",
            desc: "Consolidación de conocimientos en Python.",
            link: "https://github.com/Cabra0711/M1_python_moodle_3"
        },
        {
            id: 4,
            titulo: "HTML/CSS Moodle W1",
            desc: "Despliegue de actividades de maquetación web.",
            link: "https://cabra0711.github.io/M2_HTML-Y-CSS_MOODLE_week_1/"
        }
    ]
};


const setupLinks = () => {
    const interactivos = document.querySelectorAll('a, button, .clickable, h1, h2, p, span, i, .skill-card, .proyecto-card');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => blackHoleElement.classList.add('active'));
        el.addEventListener('mouseleave', () => blackHoleElement.classList.remove('active'));
    });
};

function mostrarProyectos(categoria) {
    if(!gridProyectos) return;
    gridProyectos.innerHTML = '';
    
    proyectosRepo[categoria].forEach(proy => {
        const card = document.createElement('article');
        card.className = 'proyecto-card';
        card.innerHTML = `
            <div class="proyecto-img">
                <i class='bx bx-code-alt'></i>
            </div>
            <div class="proyecto-info">
                <span class="proyecto-tag">${categoria}</span>
                <h3>${proy.titulo}</h3>
                <p>${proy.desc}</p>
                <a href="${proy.link}" target="_blank" class="btn-proyecto">
                    Ver Proyecto <i class='bx bx-right-arrow-alt'></i>
                </a>
            </div>
        `;
        gridProyectos.appendChild(card);
    });
    setupLinks(); 
}


const mouse = { x: null, y: null, radius: 200 };

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
        const starColor = isDarkMode ? '226, 232, 240' : '26, 32, 44'; 
        const trailColor = isDarkMode ? '0, 212, 255' : '93, 0, 214';

        if (!this.isStatic) {
            let trailGradient = ctx.createLinearGradient(this.x, this.y, this.x - (this.speedX * 12), this.y);
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
            if (distance < 20) { this.x = -50; this.y = Math.random() * canvas.height; }
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


function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    
    let numberOfParticles = window.innerWidth < 768 ? 80 : 220;
    

    let staticCount = Math.floor(numberOfParticles * 0.68);
    let dynamicCount = Math.floor(numberOfParticles * 0.32);

    for (let i = 0; i < staticCount; i++) particlesArray.push(new Particle(true));
    for (let i = 0; i < dynamicCount; i++) particlesArray.push(new Particle(false));
    
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


window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    blackHoleElement.style.left = e.x + 'px';
    blackHoleElement.style.top = e.y + 'px';
});

button.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    isDarkMode = !isDarkMode;
    button.innerHTML = isDarkMode ? `<i class='bx bx-moon-stars'></i>` : `<i class='bx bx-sun'></i>`;
});

botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mostrarProyectos(btn.getAttribute('data-category'));
    });
});

window.addEventListener('resize', init);


init();
animate();
mostrarProyectos('moodle');

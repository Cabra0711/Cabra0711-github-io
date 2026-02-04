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
        { id: 1, titulo: "Python Actividades 1", desc: "Lógica inicial en Python.", link: "https://github.com/Cabra0711/M1_python_actividades_1" },
        { id: 2, titulo: "Python Actividad 5", desc: "Problemas intermedios.", link: "https://github.com/Cabra0711/M1_python_actividad_5" },
        { id: 3, titulo: "Hoja de Vida", desc: "Estructura de CV en HTML.", link: "https://github.com/Cabra0711/Cabra-Hoja-de-vida/tree/main" },
        { id: 4, titulo: "Python Semana 2", desc: "Actividades avanzadas.", link: "https://github.com/Cabra0711/python_activities_week_2" },
        { id: 5, titulo: "Moodle HTML/CSS W1", desc: "Maquetación Riwi.", link: "https://cabra0711.github.io/M2_HTML-Y-CSS_MOODLE_week_1/" },
        { id: 6, titulo: "Login HTML/CSS", desc: "Interfaz de acceso.", link: "https://cabra0711.github.io/M2_HTML-Y-CSS_login_week_1/" },
        { id: 7, titulo: "Proyecto Eventos", desc: "Gestión con Git.", link: "https://github.com/Cabra0711/proyecto-eventos" },
        { id: 8, titulo: "Java", desc: "Prácticas de Java.", link: "https://github.com/Cabra0711/java" },
        { id: 9, titulo: "JS Actividad", desc: "DOM y eventos.", link: "https://github.com/Cabra0711/actividad_js" },
        { id: 10, titulo: "Simulacro Riwi", desc: "Entrenamiento técnico.", link: "https://github.com/Cabra0711/simulacrio_riwi" }
    ],
    moodle: [
        { id: 1, titulo: "Python Moodle W1", desc: "Sintaxis básica.", link: "https://github.com/Cabra0711/M1_python_moodle_week_1" },
        { id: 2, titulo: "Python Moodle W2", desc: "Estructuras de datos.", link: "https://github.com/Cabra0711/M1_python_moodle_week_2" },
        { id: 3, titulo: "Python Moodle 3", desc: "Consolidación Python.", link: "https://github.com/Cabra0711/M1_python_moodle_3" },
        { id: 4, titulo: "HTML/CSS Moodle WEEK 1,2,3", desc: "Despliegue GitHub Pages.", link: "https://cabra0711.github.io/M2_HTML-Y-CSS_MOODLE_week_1/" }
    ]
};

const setupLinks = () => {
    const interactivos = document.querySelectorAll('a, button, .skill-card, .proyecto-card');
    interactivos.forEach(el => {
        el.addEventListener('mouseenter', () => blackHoleElement?.classList.add('active'));
        el.addEventListener('mouseleave', () => blackHoleElement?.classList.remove('active'));
    });
};

function mostrarProyectos(categoria) {
    if (!gridProyectos || !proyectosRepo[categoria]) return;
    gridProyectos.innerHTML = '';
    
    proyectosRepo[categoria].forEach(proy => {
        const card = document.createElement('article');
        card.className = 'proyecto-card';
        card.innerHTML = `
            <div class="proyecto-img"><i class='bx bx-code-alt'></i></div>
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

// Lógica de partículas
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
    let num = window.innerWidth < 768 ? 80 : 200;
    for (let i = 0; i < num; i++) particlesArray.push(new Particle(i < num * 0.6));
}

function animate() {
    ctx.fillStyle = isDarkMode ? '#0B0E14' : '#F0F4F8'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}


window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if(blackHoleElement) {
        blackHoleElement.style.left = e.x + 'px';
        blackHoleElement.style.top = e.y + 'px';
    }
});

button?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    isDarkMode = !isDarkMode;
    button.innerHTML = isDarkMode ? `<i class='bx bx-moon'></i>` : `<i class='bx bx-sun'></i>`;
});

botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mostrarProyectos(btn.getAttribute('data-category'));
    });
});

window.addEventListener('resize', init);


document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
    mostrarProyectos('moodle');
});

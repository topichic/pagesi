function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Переключить на светлую тему';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.title = 'Переключить на светлую тему';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.title = 'Переключить на темную тему';
            }
        });
    }
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (event) => {
            if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Счетчик посещений
function initVisitCounter() {
    const visitCountElement = document.getElementById('visitCount');
    if (!visitCountElement) return;
    
    let visits = localStorage.getItem('siteVisits');
    
    if (visits) {
        visits = parseInt(visits) + 1;
    } else {
        visits = 1;
    }
    
    localStorage.setItem('siteVisits', visits);
    visitCountElement.textContent = visits.toLocaleString('ru-RU');
}

// Анимация элементов при скролле
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за всеми карточками
    document.querySelectorAll('.card, .project-card, .feature-card, .info-card').forEach(card => {
        observer.observe(card);
    });
}

// Обновление текущего года в футере
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear, .current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Определение активной страницы
function setActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Плавная прокрутка для якорей
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен! Инициализация функций...');
    
    initTheme();
    initMobileMenu();
    initVisitCounter();
    initScrollAnimations();
    updateCurrentYear();
    setActivePage();
    initSmoothScroll();
    
    // Добавление атрибутов доступности
    document.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('aria-label')) {
            const text = button.textContent.trim() || button.title;
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
    
    console.log('Все функции инициализированы!');
});

// Обработка ошибок изображений
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Изображение не найдено:', e.target.src);
    }
}, true);
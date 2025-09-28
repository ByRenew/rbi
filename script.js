// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();

    // Navigation and page management
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navMenu = document.getElementById('nav-links');
    const burger = document.getElementById('burger-menu');

    // Burger Menu Toggle
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        if (link.getAttribute('target') === '_blank') return;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPageId = link.getAttribute('data-page');
            showPage(targetPageId);
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Copy Script Button
    const copyBtn = document.getElementById('copyBtn');
    const scriptCode = document.getElementById('script').innerText;
    
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(scriptCode).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied!';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // Floating Script Effect
    const scriptElement = document.getElementById('script');
    const floatingScript = document.getElementById('floatingScript');

    scriptElement.addEventListener('mouseenter', function() {
        floatingScript.textContent = this.textContent.trim();
        floatingScript.style.opacity = '1';
    });

    scriptElement.addEventListener('mouseleave', function() {
        floatingScript.style.opacity = '0';
    });

    document.addEventListener('mousemove', function(e) {
        floatingScript.style.left = (e.pageX + 15) + 'px';
        floatingScript.style.top = (e.pageY + 15) + 'px';
    });

    // Settings System
    initSettingsSystem();

    // Load saved settings
    loadSettings();
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
}

function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#1a73e8" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#1a73e8", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });
}

function initSettingsSystem() {
    const saveBtn = document.getElementById('saveSettings');
    const resetBtn = document.getElementById('resetSettings');
    
    saveBtn.addEventListener('click', saveSettings);
    resetBtn.addEventListener('click', resetSettings);
    
    // Add change listeners to update settings in real-time
    document.querySelectorAll('.switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            if (this.id === 'darkModeToggle') {
                document.body.classList.toggle('dark-mode', this.checked);
            }
            if (this.id === 'particlesToggle') {
                const particles = document.getElementById('particles-js');
                particles.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
}

function saveSettings() {
    const settings = {
        darkMode: document.getElementById('darkModeToggle').checked,
        particles: document.getElementById('particlesToggle').checked,
        emailNotifications: document.getElementById('emailNotifications').checked,
        discordNotifications: document.getElementById('discordNotifications').checked,
        saveReviews: document.getElementById('saveReviews').checked,
        anonymousReviews: document.getElementById('anonymousReviews').checked
    };
    
    localStorage.setItem('luaHubSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('luaHubSettings') || '{}');
    
    // Apply settings
    document.getElementById('darkModeToggle').checked = settings.darkMode || false;
    document.getElementById('particlesToggle').checked = settings.particles !== false; // Default true
    document.getElementById('emailNotifications').checked = settings.emailNotifications || false;
    document.getElementById('discordNotifications').checked = settings.discordNotifications !== false; // Default true
    document.getElementById('saveReviews').checked = settings.saveReviews !== false; // Default true
    document.getElementById('anonymousReviews').checked = settings.anonymousReviews || false;
    
    // Apply visual changes
    document.body.classList.toggle('dark-mode', settings.darkMode);
    document.getElementById('particles-js').style.display = settings.particles !== false ? 'block' : 'none';
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        localStorage.removeItem('luaHubSettings');
        location.reload();
    }
}

// Sticky Navbar
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}

// Dark Mode
let darkmode = document.querySelector('#darkmode');

// Check for saved 'darkMode' in localStorage
let isDarkMode = localStorage.getItem('darkMode'); 

const enableDarkMode = () => {
    document.body.classList.add('active');
    darkmode.classList.replace('bx-moon', 'bx-sun');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('active');
    darkmode.classList.replace('bx-sun', 'bx-moon');
    localStorage.setItem('darkMode', null);
}

if (isDarkMode === 'enabled') {
    enableDarkMode();
}

darkmode.onclick = () => {
    isDarkMode = localStorage.getItem('darkMode'); 
    if (isDarkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        const homeImg = document.querySelector('.home .home-img');
        if (homeImg.getBoundingClientRect().top < window.innerHeight) {
            homeImg.style.animation = 'fadeIn 2s ease-in-out';
        }
    });
});

window.addEventListener('scroll', revealSections);

function revealSections() {
    const sections = document.querySelectorAll('.about');

    for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight / 5 * 4; // Adjust this for triggering point

        if (sectionTop < triggerBottom) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const revealItem = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(revealItem, {
        root: null,
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        observer.observe(item);
    });
});

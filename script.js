document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // 1. Sidebar Navigation Active State
    // ===================================
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    const sections = document.querySelectorAll('.main-content section');

    // Function to set the active nav item based on scroll position
    const setActiveNav = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Use a slight offset (e.g., 100px) so the nav highlights before the section is exactly at the top
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.href.includes(current)) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveNav);
    // Set active item on initial load
    setActiveNav(); 


    // ===================================
    // 2. Typing Effect for Role Title
    // ===================================
    const typingTextElement = document.getElementById('typing-text');
    const roles = ["Python Full Stack Developer", "Backend Developer","Web Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 80;
    const delayBetweenRoles = 1500;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            // Text is fully typed, start the delay before deleting
            speed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Text is fully deleted, move to the next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, speed);
    }

    // Start the typing effect
    type();


    // ===================================
    // 3. Theme Toggle (Light/Dark Mode)
    // ===================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const THEME_KEY = 'bhaskar-theme';

    // Function to apply the saved theme on load
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        } else {
            body.classList.remove('dark-theme');
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    };

    // Load theme preference from local storage
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        
        if (isDark) {
            // Set to Dark Mode
            localStorage.setItem(THEME_KEY, 'dark');
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        } else {
            // Set to Light Mode
            localStorage.setItem(THEME_KEY, 'light');
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    });

    // Optional: Add a simple log for CV download for tracking
    document.getElementById('download-cv').addEventListener('click', (e) => {
        // e.preventDefault(); // Uncomment this line if you want to prevent the actual download for testing
        console.log('CV Download clicked!');
        // In a real application, you'd trigger a file download here.
    });
});
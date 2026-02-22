document.addEventListener('DOMContentLoaded', function() {
    // Navigation (unchanged)
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Password management
    const DEFAULT_PASSWORD = 'blwn875142';
    let adminPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;

    // Default data with hero background and portfolio images
    const defaultData = {
        heroBackground: '',
        name: "Balawan Sutong",
        profileImage: "https://ui-avatars.com/api/?name=Balawan+Sutong&size=220",
        about: "I'm a class 12 NIOS student, music producer, and game developer with a passion for technology. I create beats using FL Studio Mobile and develop simple, fun games. Always eager to learn new skills and explore the latest in tech.",
        skills: [
            { title: "Music Production", desc: "beats & tracks with FL Studio", icon: "fa-music" },
            { title: "FL Studio Mobile", desc: "portable music creation", icon: "fa-mobile-alt" },
            { title: "Simple Game Dev", desc: "fun mobile games", icon: "fa-gamepad" },
            { title: "Tech Enthusiast", desc: "exploring new tools & apps", icon: "fa-microchip" }
        ],
        portfolio: [
            { category: "MUSIC", title: "FL Studio Mobile", desc: "Original beat \"Night Drive\" made on phone.", icon: "fa-headphones", image: "https://via.placeholder.com/300x200?text=Music+Project" },
            { category: "MUSIC", title: "Lo-fi Beats", desc: "Relaxing beats for study & chill.", icon: "fa-sliders-h", image: "https://via.placeholder.com/300x200?text=Lo-fi" },
            { category: "GAME", title: "Space Dodger", desc: "Simple mobile game built with beginner skills.", icon: "fa-dice-d6", image: "https://via.placeholder.com/300x200?text=Space+Dodger" },
            { category: "GAME", title: "Platformer Jump", desc: "2D test game – work in progress.", icon: "fa-robot", image: "https://via.placeholder.com/300x200?text=Platformer" }
        ],
        contact: {
            email: "balawansutong492@gmail.com",
            phone: "6002920884",
            instagram: "https://www.instagram.com/michelsutong?igsh=dnkxeGVraWVwbDFx",
            facebook: "https://www.facebook.com/share/1DYxEippif/",
            youtube: "https://youtube.com/@regionalremix_blwn?si=GAO_QjiJRVSCk82V"
        }
    };

    let siteData = JSON.parse(localStorage.getItem('portfolioData')) || defaultData;

    // Render site
    function renderSite() {
        // Hero background
        const heroBg = document.getElementById('hero-bg');
        heroBg.style.backgroundImage = siteData.heroBackground ? `url('${siteData.heroBackground}')` : 'none';
        // Name
        document.getElementById('hero-name').textContent = siteData.name;
        // Profile image
        document.getElementById('profile-img').src = siteData.profileImage;
        // About text
        document.getElementById('about-text').textContent = siteData.about;

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = '';
        siteData.skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
                <div class="skill-icon"><i class="fas ${skill.icon}"></i></div>
                <h3>${skill.title}</h3>
                <p>${skill.desc}</p>
            `;
            skillsContainer.appendChild(card);
        });

        // Portfolio with images
        const portfolioContainer = document.getElementById('portfolio-container');
        portfolioContainer.innerHTML = '';
        siteData.portfolio.forEach(item => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-img" style="background-image: url('${item.image || ''}'); background-size: cover; background-position: center;">
                    ${!item.image ? `<i class="fas ${item.icon}"></i>` : ''}
                </div>
                <div class="project-info">
                    <span class="category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            portfolioContainer.appendChild(card);
        });

        // Contact info
        document.getElementById('contact-email').textContent = siteData.contact.email;
        document.getElementById('contact-phone').textContent = siteData.contact.phone;
        const socialLinks = document.getElementById('social-links');
        socialLinks.innerHTML = `
            <a href="${siteData.contact.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${siteData.contact.facebook}" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="${siteData.contact.youtube}" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        `;
        const footerSocial = document.getElementById('footer-social');
        footerSocial.innerHTML = `
            <a href="${siteData.contact.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="${siteData.contact.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="${siteData.contact.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>
        `;
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // Populate admin form
    function populateAdmin() {
        document.getElementById('admin-hero-bg').value = siteData.heroBackground || '';
        document.getElementById('admin-img').value = siteData.profileImage;
        document.getElementById('admin-about').value = siteData.about;
        document.getElementById('admin-email').value = siteData.contact.email;
        document.getElementById('admin-phone').value = siteData.contact.phone;
        document.getElementById('admin-insta').value = siteData.contact.instagram;
        document.getElementById('admin-fb').value = siteData.contact.facebook;
        document.getElementById('admin-yt').value = siteData.contact.youtube;

        // Skills admin
        const skillsAdmin = document.getElementById('skills-admin');
        skillsAdmin.innerHTML = '';
        siteData.skills.forEach((skill, index) => {
            const div = document.createElement('div');
            div.className = 'skill-item';
            div.innerHTML = `
                <label>Title</label>
                <input type="text" class="skill-title" data-index="${index}" value="${skill.title}">
                <label>Description</label>
                <input type="text" class="skill-desc" data-index="${index}" value="${skill.desc}">
                <label>Icon (e.g., fa-music)</label>
                <input type="text" class="skill-icon" data-index="${index}" value="${skill.icon}">
                <button type="button" class="remove-btn" data-type="skill" data-index="${index}">Remove</button>
            `;
            skillsAdmin.appendChild(div);
        });

        // Portfolio admin
        const portfolioAdmin = document.getElementById('portfolio-admin');
        portfolioAdmin.innerHTML = '';
        siteData.portfolio.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.innerHTML = `
                <label>Category</label>
                <input type="text" class="port-cat" data-index="${index}" value="${item.category}">
                <label>Title</label>
                <input type="text" class="port-title" data-index="${index}" value="${item.title}">
                <label>Description</label>
                <input type="text" class="port-desc" data-index="${index}" value="${item.desc}">
                <label>Icon (e.g., fa-headphones)</label>
                <input type="text" class="port-icon" data-index="${index}" value="${item.icon}">
                <label>Image URL</label>
                <input type="url" class="port-image" data-index="${index}" value="${item.image || ''}">
                <button type="button" class="remove-btn" data-type="portfolio" data-index="${index}">Remove</button>
            `;
            portfolioAdmin.appendChild(div);
        });
    }

    // Save admin changes
    function saveAdmin() {
        siteData.heroBackground = document.getElementById('admin-hero-bg').value;
        siteData.profileImage = document.getElementById('admin-img').value;
        siteData.about = document.getElementById('admin-about').value;
        siteData.contact.email = document.getElementById('admin-email').value;
        siteData.contact.phone = document.getElementById('admin-phone').value;
        siteData.contact.instagram = document.getElementById('admin-insta').value;
        siteData.contact.facebook = document.getElementById('admin-fb').value;
        siteData.contact.youtube = document.getElementById('admin-yt').value;

        // Update skills
        document.querySelectorAll('.skill-item').forEach((item, idx) => {
            if (siteData.skills[idx]) {
                siteData.skills[idx].title = item.querySelector('.skill-title').value;
                siteData.skills[idx].desc = item.querySelector('.skill-desc').value;
                siteData.skills[idx].icon = item.querySelector('.skill-icon').value;
            }
        });

        // Update portfolio
        document.querySelectorAll('.portfolio-item').forEach((item, idx) => {
            if (siteData.portfolio[idx]) {
                siteData.portfolio[idx].category = item.querySelector('.port-cat').value;
                siteData.portfolio[idx].title = item.querySelector('.port-title').value;
                siteData.portfolio[idx].desc = item.querySelector('.port-desc').value;
                siteData.portfolio[idx].icon = item.querySelector('.port-icon').value;
                siteData.portfolio[idx].image = item.querySelector('.port-image').value;
            }
        });

        // Change password if provided
        const newPass = document.getElementById('admin-new-password').value;
        const confirmPass = document.getElementById('admin-confirm-password').value;
        if (newPass || confirmPass) {
            if (newPass === confirmPass) {
                adminPassword = newPass;
                localStorage.setItem('adminPassword', newPass);
                alert('Password changed successfully');
                document.getElementById('admin-new-password').value = '';
                document.getElementById('admin-confirm-password').value = '';
            } else {
                alert('Passwords do not match. Password not changed.');
            }
        }

        localStorage.setItem('portfolioData', JSON.stringify(siteData));
        renderSite();
        closeAdmin();
    }

    // Add skill
    document.getElementById('add-skill').addEventListener('click', () => {
        siteData.skills.push({ title: "New Skill", desc: "Description", icon: "fa-code" });
        populateAdmin();
    });

    // Add portfolio
    document.getElementById('add-portfolio').addEventListener('click', () => {
        siteData.portfolio.push({ category: "NEW", title: "New Project", desc: "Description", icon: "fa-folder", image: "" });
        populateAdmin();
    });

    // Remove item (delegation)
    document.getElementById('skills-admin').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') && e.target.dataset.type === 'skill') {
            const index = e.target.dataset.index;
            siteData.skills.splice(index, 1);
            populateAdmin();
        }
    });
    document.getElementById('portfolio-admin').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') && e.target.dataset.type === 'portfolio') {
            const index = e.target.dataset.index;
            siteData.portfolio.splice(index, 1);
            populateAdmin();
        }
    });

    // Admin panel with password protection
    const adminToggle = document.getElementById('admin-toggle');
    const loginOverlay = document.getElementById('admin-login-overlay');
    const adminOverlay = document.getElementById('admin-overlay');
    const closeAdminBtn = document.getElementById('close-admin');
    const saveBtn = document.getElementById('save-admin');
    const loginSubmit = document.getElementById('login-submit');
    const loginPassword = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');

    function openLogin() {
        loginOverlay.classList.add('active');
        loginPassword.value = '';
        loginError.textContent = '';
    }
    function closeLogin() {
        loginOverlay.classList.remove('active');
    }
    function openAdmin() {
        populateAdmin();
        adminOverlay.classList.add('active');
    }
    function closeAdmin() {
        adminOverlay.classList.remove('active');
    }

    adminToggle.addEventListener('click', openLogin);

    loginSubmit.addEventListener('click', () => {
        if (loginPassword.value === adminPassword) {
            closeLogin();
            openAdmin();
        } else {
            loginError.textContent = 'Incorrect password';
        }
    });

    closeAdminBtn.addEventListener('click', closeAdmin);
    saveBtn.addEventListener('click', saveAdmin);

    loginOverlay.addEventListener('click', (e) => {
        if (e.target === loginOverlay) closeLogin();
    });
    adminOverlay.addEventListener('click', (e) => {
        if (e.target === adminOverlay) closeAdmin();
    });

    // Initial render
    renderSite();
});